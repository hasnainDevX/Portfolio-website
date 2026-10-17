import { createBriefHandlers } from "../../lib/project-brief-server";
import { BRIEF_REFERENCES } from "../../lib/project-brief-references";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const handlers = createBriefHandlers(BRIEF_REFERENCES);
export const GET = handlers.GET;
export const POST = handlers.POST;
