import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import type { BlogPost, Section } from "../data/blogPosts";
import { getBlogList, getBlogPostForSlug } from "../lib/content";
import { NotFoundPage } from "./NotFoundPage";

function renderSection(s: Section, i: number) {
  switch (s.type) {
    case "h2":
      return <h2 key={i} className="text-3xl font-bold text-slate-950 tracking-tight mt-12 mb-5">{s.text}</h2>;
    case "h3":
      return <h3 key={i} className="text-2xl font-bold text-slate-950 tracking-tight mt-8 mb-4">{s.text}</h3>;
    case "p":
      return <p key={i} className="text-lg text-slate-600 font-medium leading-relaxed mb-5">{s.text}</p>;
    case "ul":
      return (
        <ul key={i} className="mb-6 space-y-3">
          {s.items?.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-2.5" />
              <span className="text-lg text-slate-600 font-medium leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="mb-6 space-y-3 counter-reset-none">
          {s.items?.map((item, j) => (
            <li key={j} className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {j + 1}
              </span>
              <span className="text-lg text-slate-600 font-medium leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div key={i} className="my-8 bg-blue-50 border-l-4 border-blue-600 px-6 py-5">
          <p className="text-blue-900 font-medium leading-relaxed">{s.text}</p>
        </div>
      );
    case "table":
      return (
        <div key={i} className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-950 text-white">
                {s.header?.map((h, j) => (
                  <th key={j} className="text-left px-4 py-3 font-bold text-xs uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows?.map((row, j) => (
                <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  {row.map((cell, k) => (
                    <td key={k} className="px-4 py-3 border-b border-slate-100 text-slate-700 font-medium">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | undefined | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    let cancel = false;
    setPost(null);
    void (async () => {
      const [one, all] = await Promise.all([getBlogPostForSlug(slug ?? ""), getBlogList()]);
      if (cancel) return;
      setPost(one);
      setRelated(all.filter((p) => p.slug !== slug).slice(0, 3));
    })();
    return () => {
      cancel = true;
    };
  }, [slug]);

  if (post === null) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 font-medium">
        Загрузка…
      </div>
    );
  }

  if (!post) return <NotFoundPage />;

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-0 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 pb-12">
          <Link to="/blog" className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-8 inline-block hover:text-slate-950 transition-colors">
            ← Все статьи
          </Link>
          <div className="flex flex-wrap gap-3 mt-6 mb-8">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-full uppercase tracking-widest">
              {post.category}
            </span>
            {post.tags.map((t) => (
              <span key={t} className="px-4 py-1.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-full">{t}</span>
            ))}
          </div>
          <h1 className="text-5xl lg:text-7xl font-medium tracking-tighter text-slate-950 leading-[0.9] mb-8 max-w-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-slate-400 font-bold">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} чтения</span>
            <span>·</span>
            <span>Команда Citrix</span>
          </div>
        </div>

        {/* Cover */}
        <div className={`w-full h-64 lg:h-80 ${post.accent} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Lead */}
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-blue-600 pl-6">
                {post.excerpt}
              </p>
              {/* Sections */}
              {post.content.map((section, i) => renderSection(section, i))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* CTA */}
              <div className="bg-slate-950 p-8 sticky top-32">
                <h3 className="text-xl font-bold text-white mb-3">Нужна консультация?</h3>
                <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                  Обсудим вашу задачу и подберём оптимальное решение.
                </p>
                <Link
                  to="/contacts"
                  className="block w-full py-4 bg-blue-600 text-white font-bold rounded-full text-center hover:bg-blue-500 transition-colors"
                >
                  Связаться
                </Link>
                <a
                  href="tel:+79887635927"
                  className="block w-full py-4 border border-white/20 text-white font-bold rounded-full text-center hover:bg-white/10 transition-colors mt-3"
                >
                  +7 (988) 763-59-27
                </a>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Теги</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span key={t} className="px-3 py-1.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related posts */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl font-bold text-slate-950 tracking-tight mb-12">Другие статьи</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <Link
                key={i}
                to={`/blog/${p.slug}`}
                className="group bg-white border border-slate-100 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className={`${p.accent} h-40 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }} />
                </div>
                <div className="p-6">
                  <div className="flex gap-3 mb-3">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{p.category}</span>
                    <span className="text-xs text-slate-400">{p.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-950 leading-snug group-hover:text-blue-600 transition-colors">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
