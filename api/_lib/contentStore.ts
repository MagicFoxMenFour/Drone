import { randomUUID } from "node:crypto";
import { defaultAboutPageInsert, defaultEmployeesSeed } from "../../src/app/data/aboutDefaults";
import type {
  AboutPageRow,
  BlogPostRow,
  CaseRow,
  EmployeeRow,
  LeadRow,
  ServiceRow,
} from "../../src/app/lib/api/types";
import { readJsonFile, writeJsonFile } from "./githubContent";

type ContentMap = {
  services: ServiceRow[];
  cases: CaseRow[];
  blog_posts: BlogPostRow[];
  about_page: AboutPageRow[];
  employees: EmployeeRow[];
  leads: LeadRow[];
};

const paths: Record<keyof ContentMap, string> = {
  services: "content/services.json",
  cases: "content/cases.json",
  blog_posts: "content/blog_posts.json",
  about_page: "content/about_page.json",
  employees: "content/employees.json",
  leads: "content/leads.json",
};

const defaults: ContentMap = {
  services: [],
  cases: [],
  blog_posts: [],
  about_page: [
    {
      id: "about-default",
      updated_at: new Date(0).toISOString(),
      ...defaultAboutPageInsert,
    },
  ],
  employees: defaultEmployeesSeed.map((e, i) => ({
    id: `emp-default-${i}`,
    updated_at: new Date(0).toISOString(),
    active: true,
    ...e,
  })),
  leads: [],
};

function withTimestamp<T extends { updated_at?: string }>(row: T): T & { updated_at: string } {
  return { ...row, updated_at: new Date().toISOString() };
}

export async function readCollection<K extends keyof ContentMap>(kind: K): Promise<ContentMap[K]> {
  const { data } = await readJsonFile(paths[kind], defaults[kind]);
  return Array.isArray(data) ? (data as ContentMap[K]) : defaults[kind];
}

export async function writeCollection<K extends keyof ContentMap>(
  kind: K,
  rows: ContentMap[K],
  message: string
): Promise<void> {
  await writeJsonFile(paths[kind], rows, message);
}

export async function listRows<K extends keyof ContentMap>(kind: K): Promise<ContentMap[K]> {
  const rows = await readCollection(kind);
  return [...rows].sort((a, b) => {
    const aTime = "updated_at" in a && a.updated_at ? Date.parse(a.updated_at) : 0;
    const bTime = "updated_at" in b && b.updated_at ? Date.parse(b.updated_at) : 0;
    return bTime - aTime;
  }) as ContentMap[K];
}

export async function getRow<K extends keyof ContentMap>(
  kind: K,
  id: string
): Promise<ContentMap[K][number] | null> {
  const rows = await readCollection(kind);
  return (rows.find((r) => r.id === id) as ContentMap[K][number] | undefined) ?? null;
}

export async function createRow<K extends keyof ContentMap>(
  kind: K,
  payload: Omit<ContentMap[K][number], "id" | "updated_at" | "created_at"> & Partial<ContentMap[K][number]>
): Promise<ContentMap[K][number]> {
  const rows = await readCollection(kind);
  const next = {
    ...payload,
    id: randomUUID(),
    ...(kind === "leads" ? { created_at: new Date().toISOString() } : null),
  } as ContentMap[K][number];
  const stamped = withTimestamp(next as { updated_at?: string }) as ContentMap[K][number];
  await writeCollection(kind, [stamped, ...rows] as ContentMap[K], `admin: create ${kind}`);
  return stamped;
}

export async function updateRow<K extends keyof ContentMap>(
  kind: K,
  id: string,
  patch: Partial<ContentMap[K][number]>
): Promise<ContentMap[K][number] | null> {
  const rows = await readCollection(kind);
  let found: ContentMap[K][number] | null = null;
  const next = rows.map((r) => {
    if (r.id !== id) return r;
    found = withTimestamp({ ...r, ...patch }) as ContentMap[K][number];
    return found;
  }) as ContentMap[K];
  if (!found) return null;
  await writeCollection(kind, next, `admin: update ${kind}/${id}`);
  return found;
}

export async function deleteRow<K extends keyof ContentMap>(kind: K, id: string): Promise<boolean> {
  const rows = await readCollection(kind);
  const next = rows.filter((r) => r.id !== id) as ContentMap[K];
  if (next.length === rows.length) return false;
  await writeCollection(kind, next, `admin: delete ${kind}/${id}`);
  return true;
}

export async function countNewLeads(): Promise<number> {
  const leads = await readCollection("leads");
  return leads.filter((x) => x.status === "new").length;
}
