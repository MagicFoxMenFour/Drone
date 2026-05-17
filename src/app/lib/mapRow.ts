import type { BlogPost, Section } from "../data/blogPosts";
import type { Case } from "../data/cases";
import type { Service } from "../data/services";
import type { BlogPostRow, CaseRow, ServiceRow } from "./api/types";

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
  return {
    slug: row.slug,
    title: row.title,
    shortDesc: row.short_desc,
    fullDesc: row.full_desc,
    icon: row.icon,
    color: row.color,
    useCases: asStringArray(row.use_cases),
    process: asProcess(row.process),
    results: asResultPairs(row.results),
    industries: Array.isArray(row.industries) ? row.industries.map(String) : [],
    price: row.price,
  };
}

export function caseRowToCase(row: CaseRow): Case {
  return {
    slug: row.slug,
    category: row.category,
    title: row.title,
    client: row.client,
    location: row.location,
    year: row.year,
    shortDesc: row.short_desc,
    challenge: row.challenge,
    solution: row.solution,
    results: asResultPairs(row.results),
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    gradient: row.gradient,
    accentColor: row.accent_color,
  };
}

export function blogRowToPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    category: row.category,
    date: row.date,
    readTime: row.read_time,
    title: row.title,
    excerpt: row.excerpt,
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    accent: row.accent,
    content: asSections(row.content),
  };
}
