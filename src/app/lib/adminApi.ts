import type {
  AboutPageRow,
  BlogPostRow,
  CaseRow,
  EmployeeRow,
  LeadRow,
  ServiceRow,
} from "./api/types";

type Kind = "services" | "cases" | "blog_posts" | "about_page" | "employees" | "leads";
type RowByKind = {
  services: ServiceRow;
  cases: CaseRow;
  blog_posts: BlogPostRow;
  about_page: AboutPageRow;
  employees: EmployeeRow;
  leads: LeadRow;
};

const base = "/api/admin";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include",
  });
  const json = (await res.json().catch(() => ({}))) as { error?: string } & T;
  if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
  return json;
}

export async function adminLogin(login: string, password: string): Promise<void> {
  await request("/login", { method: "POST", body: JSON.stringify({ login, password }) });
}

export async function adminLogout(): Promise<void> {
  await request("/logout", { method: "POST" });
}

export async function getAdminMe(): Promise<{ login: string; isAdmin: boolean } | null> {
  const res = await request<{ user: { login: string; isAdmin: boolean } | null }>("/me");
  return res.user;
}

export async function getDashboardMeta(): Promise<{ newLeads: number }> {
  return request("/dashboard");
}

export async function listAdminRows<K extends Kind>(kind: K): Promise<RowByKind[K][]> {
  const res = await request<{ rows: RowByKind[K][] }>(`/${kind}`);
  return res.rows;
}

export async function getAdminRow<K extends Kind>(kind: K, id: string): Promise<RowByKind[K]> {
  const res = await request<{ row: RowByKind[K] }>(`/${kind}/${id}`);
  return res.row;
}

export async function createAdminRow<K extends Kind>(
  kind: K,
  payload: Partial<RowByKind[K]>
): Promise<RowByKind[K]> {
  const res = await request<{ row: RowByKind[K] }>(`/${kind}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.row;
}

export async function patchAdminRow<K extends Kind>(
  kind: K,
  id: string,
  payload: Partial<RowByKind[K]>
): Promise<RowByKind[K]> {
  const res = await request<{ row: RowByKind[K] }>(`/${kind}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.row;
}

export async function deleteAdminRow<K extends Kind>(kind: K, id: string): Promise<void> {
  await request(`/${kind}/${id}`, { method: "DELETE" });
}
