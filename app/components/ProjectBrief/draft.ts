import { emptyBrief, parseBrief, type BriefData } from "../../lib/project-brief";

export const DRAFT_KEY = "hasnain-project-brief-v1";
export type BriefDraft = { version: 1; data: BriefData; step: number; review: boolean; submissionId: string };

export function newDraft(): BriefDraft {
  return { version: 1, data: emptyBrief(), step: 0, review: false, submissionId: "" };
}

export function readDraft(raw: string): BriefDraft | null {
  try {
    const saved = JSON.parse(raw);
    if (!saved || saved.version !== 1 || !Number.isInteger(saved.step) || saved.step < 0 || saved.step > 4 || typeof saved.review !== "boolean" || typeof saved.submissionId !== "string" || !/^[0-9a-f-]{36}$/i.test(saved.submissionId)) return null;
    if (saved.data && Array.isArray(saved.data.ownReferences)) saved.data.ownReferences = saved.data.ownReferences.slice(0, 2).map((reference: { url: unknown; likes: unknown }) => ({ url: reference.url, likes: Array.isArray(reference.likes) ? reference.likes : [] }));
    const parsed = parseBrief(saved.data);
    if (Object.keys(parsed.errors).length) return null;
    return { version: 1, data: parsed.data, step: Math.min(saved.step, 3), review: saved.review && saved.step >= 3, submissionId: saved.submissionId };
  } catch { return null; }
}
