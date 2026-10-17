import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { formatBrief, parseBrief, validateBrief } from "./project-brief";

type Dependencies = { env?: NodeJS.ProcessEnv; fetcher?: typeof fetch; now?: () => number };
const MAX_BYTES = 64000;
const requiredEnvironment = ["BRIEF_EMAILJS_SERVICE_ID", "BRIEF_EMAILJS_TEMPLATE_ID", "BRIEF_EMAILJS_PUBLIC_KEY", "BRIEF_EMAILJS_PRIVATE_KEY", "BRIEF_TOKEN_SECRET", "BRIEF_SITE_ORIGIN"];

function reply(status: number, body: object, extra: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", ...extra } });
}


export function createBriefHandlers(dependencies: Dependencies = {}) {
  const env = dependencies.env ?? process.env;
  const fetcher = dependencies.fetcher ?? fetch;
  const now = dependencies.now ?? Date.now;

  function configured() {
    if (requiredEnvironment.some((key) => !env[key]) || (env.BRIEF_TOKEN_SECRET?.length ?? 0) < 32) return false;
    try { return ["http:", "https:"].includes(new URL(env.BRIEF_SITE_ORIGIN!).protocol); } catch { return false; }
  }

  function allowedOrigin(request: Request) {
    const origin = request.headers.get("origin");
    if (!origin) return false;
    if (origin === env.BRIEF_SITE_ORIGIN) return true;
    if (env.NODE_ENV !== "production") {
      try { const url = new URL(origin); return ["localhost", "127.0.0.1"].includes(url.hostname) && url.origin === new URL(request.url).origin; } catch { return false; }
    }
    return false;
  }

  function signature(value: string) { return createHmac("sha256", env.BRIEF_TOKEN_SECRET!).update(value).digest("base64url"); }
  function validToken(value: unknown) {
    if (typeof value !== "string" || value.length > 2048) return "invalid";
    try {
      const [payload, mac, extra] = value.split(".");
      if (!payload || !mac || extra) return "invalid";
      const expected = Buffer.from(signature(payload)); const received = Buffer.from(mac);
      if (expected.length !== received.length || !timingSafeEqual(expected, received)) return "invalid";
      const parsed = JSON.parse(Buffer.from(payload, "base64url").toString());
      const age = now() - parsed.issued;
      if (!Number.isFinite(age) || age < 0 || age > 24 * 60 * 60 * 1000) return "expired";
      return age < 1500 ? "early" : "valid";
    } catch { return "invalid"; }
  }

  async function GET(request: Request) {
    if (request.headers.get("sec-fetch-site") === "cross-site") return reply(403, { message: "Open the brief on the website to continue." });
    if (!configured()) return reply(503, { message: "Project brief delivery is not configured yet. Your draft can still be completed and saved on this browser." });
    const payload = Buffer.from(JSON.stringify({ issued: now(), nonce: randomUUID() })).toString("base64url");
    return reply(200, { token: `${payload}.${signature(payload)}` });
  }

  async function POST(request: Request) {
    if (!allowedOrigin(request) || request.headers.get("sec-fetch-site") === "cross-site") return reply(403, { message: "Please submit this form from the website." });
    if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, { message: "Invalid submission format." });
    if (!configured()) return reply(503, { message: "Project brief delivery is not configured yet. Your answers are saved on this browser; please contact Hasnain before retrying." });
    if (Number(request.headers.get("content-length") || 0) > MAX_BYTES) return reply(413, { message: "Your brief is too long. Please shorten some answers." });

    let body: Record<string, unknown>;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply(400, { message: "No form data was received." });
      const chunks: Uint8Array[] = []; let size = 0;
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        size += value.byteLength;
        if (size > MAX_BYTES) { await reader.cancel(); return reply(413, { message: "Your brief is too long. Please shorten some answers." }); }
        chunks.push(value);
      }
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
    } catch { return reply(400, { message: "The form data could not be read. Please retry." }); }

    if (body.websiteConfirmation !== "") return reply(422, { message: "The submission could not be verified. Please reload the page and try again." });
    const tokenStatus = validToken(body.token);
    if (tokenStatus === "expired" || tokenStatus === "invalid") return reply(400, { code: "TOKEN_EXPIRED", message: "Your submission session needs refreshing. Your answers are safe; please retry." });
    if (tokenStatus === "early") return reply(429, { message: "Please wait a moment, then send your brief again." }, { "Retry-After": "2" });
    if (typeof body.submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)) return reply(400, { message: "Invalid submission identifier. Please reset the draft if this continues." });

    const parsed = parseBrief(body.data);
    const errors = { ...validateBrief(parsed.data), ...parsed.errors };
    if (Object.keys(errors).length) return reply(422, { message: "Please review the highlighted answers.", errors });
    const data = parsed.data;
    const id = body.submissionId;
    const formatted = formatBrief(data, id);

    try {
      let providerResponse: Response;
      try {
        providerResponse = await fetcher("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(15000),
          body: JSON.stringify({ service_id: env.BRIEF_EMAILJS_SERVICE_ID, template_id: env.BRIEF_EMAILJS_TEMPLATE_ID, user_id: env.BRIEF_EMAILJS_PUBLIC_KEY, accessToken: env.BRIEF_EMAILJS_PRIVATE_KEY, template_params: { subject: `Website Project Brief — ${data.businessName}`, client_name: data.name, business_name: data.businessName, reply_to: data.email, email: data.email, submission_id: id, brief_text: formatted } }),
        });
      } catch {
        // A timeout may occur after the provider accepted the email; do not claim receipt.
        return reply(502, { message: "Delivery could not be confirmed. Your answers remain saved in this browser. Please contact Hasnain before retrying, as the email may already have arrived." });
      }

      if (!providerResponse.ok) {
        return reply(502, { message: "The email service did not confirm receipt. Your answers remain saved in this browser. Contact Hasnain before retrying if delivery is uncertain." });
      }

      return reply(200, { received: true, submissionId: id });
    } catch {
      // Never include answers, credentials or provider response bodies in public errors or logs.
      return reply(503, { message: "We couldn’t confirm your submission. Your answers are saved. Please contact Hasnain before retrying if delivery is uncertain." });
    }
  }

  return { GET, POST };
}
