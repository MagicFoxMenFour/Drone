import { supabase } from "../supabaseClient";
import type { AboutPageRow, BlogPostRow, CaseRow, EmployeeRow, ServiceRow } from "./types";

export async function fetchPublishedServices(): Promise<ServiceRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("updated_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []) as ServiceRow[];
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return (data ?? null) as ServiceRow | null;
}

export async function fetchPublishedCases(): Promise<CaseRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("published", true)
    .order("updated_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []) as CaseRow[];
}

export async function fetchCaseBySlug(slug: string): Promise<CaseRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return (data ?? null) as CaseRow | null;
}

export async function fetchPublishedBlogPosts(): Promise<BlogPostRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("updated_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []) as BlogPostRow[];
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return (data ?? null) as BlogPostRow | null;
}

export async function fetchAboutPage(): Promise<AboutPageRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("about_page")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return (data ?? null) as AboutPageRow | null;
}

export async function fetchActiveEmployees(): Promise<EmployeeRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("active", true)
    .order("sort", { ascending: true })
    .order("updated_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []) as EmployeeRow[];
}
