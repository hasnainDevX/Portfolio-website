import { createBriefHandlers } from "../../lib/project-brief-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const handlers = createBriefHandlers();
export const GET = handlers.GET;
export const POST = handlers.POST;
