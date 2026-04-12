import { Link } from "react-router";
import { blogPosts } from "../data/blogPosts";

export function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">Экспертиза</p>
          <h1 className="text-7xl lg:text-[9rem] font-medium tracking-tighter text-slate-950 leading-[0.85] mb-10">
            Блог
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            Практические статьи о БПЛА-технологиях, картографии, агромониторинге и инспекции от команды Citrix.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Featured */}
          <div className="mb-8">
            <Link
              to={`/blog/${featured.slug}`}
              className="block bg-white border border-slate-100 overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="grid lg:grid-cols-2">
                <div className={`${featured.accent} h-64 lg:h-auto relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }} />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Рекомендуем</span>
                  </div>
                </div>
                <div className="p-10 lg:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{featured.category}</span>
                    <span className="text-xs text-slate-400 font-medium">{featured.date}</span>
                    <span className="text-xs text-slate-400 font-medium">{featured.readTime} чтения</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight mb-5 group-hover:text-blue-600 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.tags.map((t) => (
                      <span key={t} className="text-xs font-bold bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-slate-500">{t}</span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-blue-600 group-hover:underline">Читать статью →</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Link
                key={i}
                to={`/blog/${post.slug}`}
                className="group bg-white border border-slate-100 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className={`${post.accent} h-48 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }} />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{post.category}</span>
                    <span className="text-xs text-slate-400 font-medium">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((t) => (
                      <span key={t} className="text-xs font-bold bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full text-slate-400">{t}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                    <span className="text-xs font-bold text-blue-600 group-hover:underline">Читать →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
