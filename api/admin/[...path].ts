import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import {
  clearAdminCookie,
  createSessionToken,
  readSessionFromRequest,
  setAdminCookie,
} from "../_lib/adminAuth";
import {
  countNewLeads,
  createRow,
  deleteRow,
  getRow,
  listRows,
  updateRow,
} from "../_lib/contentStore";

const kinds = ["services", "cases", "blog_posts", "about_page", "employees", "leads"] as const;
const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

function parsePath(req: VercelRequest): string[] {
  const p = req.query.path;
  if (Array.isArray(p)) return p;
  if (typeof p === "string") return [p];
  return [];
}

function coerceBody(raw: unknown): unknown {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return raw;
}

function json(res: VercelResponse, code: number, data: unknown) {
  return res.status(code).json(data);
}

function ensureAdmin(req: VercelRequest, res: VercelResponse): boolean {
  const session = readSessionFromRequest(req);
  if (!session) {
    void json(res, 401, { error: "Unauthorized" });
    return false;
  }
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = parsePath(req);

  if (req.method === "POST" && path[0] === "login") {
    const parsed = loginSchema.safeParse(coerceBody(req.body));
    if (!parsed.success) return json(res, 400, { error: "Invalid payload" });
    const expectedLogin = process.env.ADMIN_LOGIN;
    const expectedPassword = process.env.ADMIN_PASSWORD;
    if (!expectedLogin || !expectedPassword) {
      return json(res, 500, { error: "Admin credentials are not configured" });
    }
    if (parsed.data.login !== expectedLogin || parsed.data.password !== expectedPassword) {
      return json(res, 401, { error: "Неверный логин или пароль" });
    }
    setAdminCookie(res, createSessionToken(parsed.data.login));
    return json(res, 200, { ok: true });
  }

  if (req.method === "POST" && path[0] === "logout") {
    clearAdminCookie(res);
    return json(res, 200, { ok: true });
  }

  if (req.method === "GET" && path[0] === "me") {
    const session = readSessionFromRequest(req);
    if (!session) return json(res, 200, { user: null });
    return json(res, 200, { user: { login: session.login, isAdmin: true } });
  }

  if (!ensureAdmin(req, res)) return;

  if (req.method === "GET" && path[0] === "dashboard") {
    return json(res, 200, { newLeads: await countNewLeads() });
  }

  const kind = path[0];
  if (!kind || !kinds.includes(kind as (typeof kinds)[number])) {
    return json(res, 404, { error: "Unknown endpoint" });
  }
  const typedKind = kind as (typeof kinds)[number];
  const id = path[1];

  if (req.method === "GET" && !id) {
    return json(res, 200, { rows: await listRows(typedKind) });
  }
  if (req.method === "POST" && !id) {
    const created = await createRow(typedKind, (coerceBody(req.body) as object) ?? {});
    return json(res, 200, { row: created });
  }
  if (req.method === "GET" && id) {
    const row = await getRow(typedKind, id);
    return row ? json(res, 200, { row }) : json(res, 404, { error: "Not found" });
  }
  if (req.method === "PATCH" && id) {
    const row = await updateRow(typedKind, id, (coerceBody(req.body) as object) ?? {});
    return row ? json(res, 200, { row }) : json(res, 404, { error: "Not found" });
  }
  if (req.method === "DELETE" && id) {
    const ok = await deleteRow(typedKind, id);
    return ok ? json(res, 200, { ok: true }) : json(res, 404, { error: "Not found" });
  }

  return json(res, 405, { error: "Method not allowed" });
}
