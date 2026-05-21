import type { BlogPost, Section } from "../data/blogPosts";
import type { Case } from "../data/cases";
import type { Service } from "../data/services";
import type { BlogPostRow, CaseRow, ServiceRow } from "./api/types";
import { makeSlug } from "./slug";

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => {
    if (typeof x === "string") return x;
    if (x && typeof x === "object" && "text" in x) return String((x as { text?: unknown }).text ?? "");
    return String(x);
  }).filter(Boolean);
}

function asResultPairs(v: unknown): { v: string; l: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => {
      if (!x || typeof x !== "object") return null;
      const o = x as { v?: unknown; l?: unknown };
      return { v: String(o.v ?? ""), l: String(o.l ?? "") };
    })
    .filter(Boolean) as { v: string; l: string }[];
}

function asProcess(v: unknown): { step: string; title: string; desc: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => {
      if (!x || typeof x !== "object") return null;
      const o = x as { step?: unknown; title?: unknown; desc?: unknown };
      return {
        step: String(o.step ?? ""),
        title: String(o.title ?? ""),
        desc: String(o.desc ?? ""),
      };
    })
    .filter(Boolean) as { step: string; title: string; desc: string }[];
}

function asSections(v: unknown): Section[] {
  if (!Array.isArray(v)) return [];
  const out: Section[] = [];
  for (const x of v) {
    if (!x || typeof x !== "object") continue;
    const s = x as Section;
    if (!s.type) continue;
    out.push(s);
  }
  return out;
}

export function serviceRowToService(row: ServiceRow): Service {
  const fallbackTitle = row.title || (row as ServiceRow & { name?: string }).name || "";
  return {
    slug: row.slug || makeSlug(fallbackTitle, "service"),
    title: row.title || fallbackTitle,
    shortDesc: row.short_desc || ((row as ServiceRow & { description?: string }).description ?? ""),
    fullDesc: row.full_desc || ((row as ServiceRow & { description?: string }).description ?? ""),
    icon: row.icon || "📦",
    color: row.color || "cyan",
    useCases: asStringArray(row.use_cases),
    process: asProcess(row.process),
    results: asResultPairs(row.results),
    industries: Array.isArray(row.industries) ? row.industries.map(String) : [],
    price: row.price || "",
  };
}

export function caseRowToCase(row: CaseRow): Case {
  const fallbackTitle = row.title || "";
  return {
    slug: row.slug || makeSlug(fallbackTitle, "case"),
    category: row.category || "",
    title: fallbackTitle,
    client: row.client || "",
    location: row.location || "",
    year: row.year || "",
    shortDesc: row.short_desc || ((row as CaseRow & { description?: string }).description ?? ""),
    challenge: row.challenge || "",
    solution: row.solution || "",
    results: asResultPairs(row.results),
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    gradient: row.gradient || "from-slate-900 via-blue-950 to-slate-900",
    accentColor: row.accent_color || "blue",
  };
}

export function blogRowToPost(row: BlogPostRow): BlogPost {
  const fallbackTitle = row.title || "";
  return {
    slug: row.slug || makeSlug(fallbackTitle, "post"),
    category: row.category || "Раздел",
    date: row.date || "",
    readTime: row.read_time || "5 мин",
    title: fallbackTitle,
    excerpt: row.excerpt || "",
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    accent: row.accent || "bg-blue-600",
    content: asSections(row.content),
  };
}
