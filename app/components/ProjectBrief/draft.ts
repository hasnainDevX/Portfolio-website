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
    const parsed = parseBrief(saved.data);
    if (Object.keys(parsed.errors).length) return null;
    return { version: 1, data: parsed.data, step: saved.step, review: saved.review && saved.step === 4, submissionId: saved.submissionId };
  } catch { return null; }
}
