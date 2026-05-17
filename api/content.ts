import type { VercelRequest, VercelResponse } from "@vercel/node";
import { listRows } from "./_lib/contentStore";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const [services, cases, blog, about, employees] = await Promise.all([
      listRows("services"),
      listRows("cases"),
      listRows("blog_posts"),
      listRows("about_page"),
      listRows("employees"),
    ]);
    return res.status(200).json({
      services: services.filter((x) => x.published),
      cases: cases.filter((x) => x.published),
      blog_posts: blog.filter((x) => x.published),
      about_page: about[0] ?? null,
      employees: employees.filter((x) => x.active).sort((a, b) => a.sort - b.sort),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load content" });
  }
}
