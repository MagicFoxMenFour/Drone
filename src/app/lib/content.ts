import { blogPosts as staticBlog } from "../data/blogPosts";
import { cases as staticCases } from "../data/cases";
import { services as staticServices } from "../data/services";
import { defaultAboutPageInsert, defaultEmployeesSeed } from "../data/aboutDefaults";
import type { BlogPost } from "../data/blogPosts";
import type { Case } from "../data/cases";
import type { Service } from "../data/services";
import type { AboutPageRow, EmployeeRow } from "./api/types";
import { blogRowToPost, caseRowToCase, serviceRowToService } from "./mapRow";
type PublicContentResponse = {
  services: ServiceRow[];
  cases: CaseRow[];
  blog_posts: BlogPostRow[];
  about_page: AboutPageRow | null;
  employees: EmployeeRow[];
};

type ServiceRow = Parameters<typeof serviceRowToService>[0];
type CaseRow = Parameters<typeof caseRowToCase>[0];
type BlogPostRow = Parameters<typeof blogRowToPost>[0];

async function fetchPublicContent(): Promise<PublicContentResponse | null> {
  try {
    const res = await fetch("/api/content");
    if (!res.ok) return null;
    return (await res.json()) as PublicContentResponse;
  } catch {
    return null;
  }
}

export async function getServicesList(): Promise<Service[]> {
  const content = await fetchPublicContent();
  if (!content) return staticServices;
  const rows = content.services ?? [];
  if (rows.length === 0) return staticServices;
  return rows.map(serviceRowToService);
}

export async function getServiceForSlug(slug: string): Promise<Service | undefined> {
  const content = await fetchPublicContent();
  const row = content?.services?.find((x) => x.slug === slug);
  if (row) return serviceRowToService(row);
  return staticServices.find((s) => s.slug === slug);
}

export async function getCasesList(): Promise<Case[]> {
  const content = await fetchPublicContent();
  if (!content) return staticCases;
  const rows = content.cases ?? [];
  if (rows.length === 0) return staticCases;
  return rows.map(caseRowToCase);
}

export async function getCaseForSlug(slug: string): Promise<Case | undefined> {
  const content = await fetchPublicContent();
  const row = content?.cases?.find((x) => x.slug === slug);
  if (row) return caseRowToCase(row);
  return staticCases.find((c) => c.slug === slug);
}

export async function getBlogList(): Promise<BlogPost[]> {
  const content = await fetchPublicContent();
  if (!content) return staticBlog;
  const rows = content.blog_posts ?? [];
  if (rows.length === 0) return staticBlog;
  return rows.map(blogRowToPost);
}

export async function getBlogPostForSlug(slug: string): Promise<BlogPost | undefined> {
  const content = await fetchPublicContent();
  const row = content?.blog_posts?.find((x) => x.slug === slug);
  if (row) return blogRowToPost(row);
  return staticBlog.find((p) => p.slug === slug);
}

export type AboutPrinciple = { t: string; d: string };
export type AboutPartner = { name: string; desc: string };
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  initials: string;
  color: string;
};

function splitBlocks(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function heroTitleLines(heroTitle: string): [string, string] {
  const t = heroTitle.trim();
  const space = t.indexOf(" ");
  if (space <= 0) return [t, ""];
  return [t.slice(0, space), t.slice(space + 1).trim()];
}

function principlesFromRow(row: AboutPageRow | null): AboutPrinciple[] {
  const raw =
    row?.principles != null && Array.isArray(row.principles) && row.principles.length > 0
      ? row.principles
      : defaultAboutPageInsert.principles;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((x) => {
      if (!x || typeof x !== "object") return null;
      const o = x as { t?: unknown; d?: unknown };
      return { t: String(o.t ?? ""), d: String(o.d ?? "") };
    })
    .filter((p): p is AboutPrinciple => Boolean(p?.t));

}

function partnersFromRow(row: AboutPageRow | null): AboutPartner[] {
  const raw =
    row?.partners != null && Array.isArray(row.partners) && row.partners.length > 0
      ? row.partners
      : defaultAboutPageInsert.partners;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((x) => {
      if (!x || typeof x !== "object") return null;
      const o = x as { name?: unknown; desc?: unknown };
      return { name: String(o.name ?? ""), desc: String(o.desc ?? "") };
    })
    .filter((p): p is AboutPartner => Boolean(p?.name));

}

function licensesFromRow(row: AboutPageRow | null): string[] {
  const raw = row?.licenses ?? defaultAboutPageInsert.licenses;
  if (!Array.isArray(raw)) return [...defaultAboutPageInsert.licenses];
  const list = raw.map((x) => String(x)).filter(Boolean);
  return list.length ? list : [...defaultAboutPageInsert.licenses];

}

function teamFromEmployees(rows: EmployeeRow[]): TeamMember[] {
  if (rows.length === 0) {
    return defaultEmployeesSeed.map((e) => ({
      name: e.name,
      role: e.role,
      bio: e.bio,
      initials: e.initials,
      color: e.color,
    }));
  }
  const seen = new Set<string>();
  const normalized = rows.filter((r) => {
    const name = r.name?.trim() ?? "";
    const key = name.toLowerCase();
    if (!name || seen.has(key)) return false;
    const hasProfile = Boolean((r.role || "").trim() || (r.bio || "").trim() || (r.image || "").trim());
    if (!hasProfile) return false;
    if (name.toLowerCase() === "новый сотрудник") return false;
    seen.add(key);
    return true;
  });

  if (normalized.length === 0) {
    return defaultEmployeesSeed.map((e) => ({
      name: e.name,
      role: e.role,
      bio: e.bio,
      initials: e.initials,
      color: e.color,
    }));
  }

  return normalized.map((r) => ({
    name: r.name,
    role: r.role,
    bio: r.bio,
    image: r.image || undefined,
    initials: r.initials,
    color: r.color,
  }));

}

export async function getAboutPageContent(): Promise<{
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroParagraphs: string[];
  missionTitle: string;
  missionParagraphs: string[];
  principles: AboutPrinciple[];
  partners: AboutPartner[];
  licenses: string[];
  team: TeamMember[];
}> {
  const defaults = defaultAboutPageInsert;
  const content = await fetchPublicContent();
  if (!content) {
    const [heroTitleLine1, heroTitleLine2] = heroTitleLines(defaults.hero_title);
    return {
      heroTitleLine1,
      heroTitleLine2,
      heroParagraphs: splitBlocks(defaults.hero_text),
      missionTitle: defaults.mission_title,
      missionParagraphs: splitBlocks(defaults.mission_text),
      principles: principlesFromRow(null),
      partners: partnersFromRow(null),
      licenses: licensesFromRow(null),
      team: teamFromEmployees([]),
    };
  }
  const row = content.about_page;
  const heroTitle = row?.hero_title?.trim() || defaults.hero_title;
  const [heroTitleLine1, heroTitleLine2] = heroTitleLines(heroTitle);
  const heroText = row?.hero_text?.trim() || defaults.hero_text;
  const missionTitle = row?.mission_title?.trim() || defaults.mission_title;
  const missionText = row?.mission_text?.trim() || defaults.mission_text;
  const employees = content.employees ?? [];
  return {
    heroTitleLine1,
    heroTitleLine2,
    heroParagraphs: splitBlocks(heroText),
    missionTitle,
    missionParagraphs: splitBlocks(missionText),
    principles: principlesFromRow(row),
    partners: partnersFromRow(row),
    licenses: licensesFromRow(row),
    team: teamFromEmployees(employees),
  };
}
