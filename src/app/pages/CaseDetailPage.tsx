import { useParams, Link } from "react-router";
import { getCase, cases } from "../data/cases";
import { NotFoundPage } from "./NotFoundPage";

export function CaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const caseItem = getCase(slug ?? "");

  if (!caseItem) return <NotFoundPage />;

  const related = cases.filter((c) => c.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-0 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 pb-16">
          <Link to="/cases" className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-8 inline-block hover:text-slate-950 transition-colors">
            ← Все проекты
          </Link>
          <div className="flex flex-wrap gap-3 mb-8 mt-6">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-full uppercase tracking-widest">
              {caseItem.category}
            </span>
            {caseItem.tags.map((t) => (
              <span key={t} className="px-4 py-1.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-full">
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-6xl lg:text-8xl font-medium tracking-tighter text-slate-950 leading-[0.85] mb-8">
            {caseItem.title}
          </h1>
          <div className="flex flex-wrap gap-10 text-sm text-slate-400 font-bold mb-10">
            <span>{caseItem.client}</span>
            <span>{caseItem.location}</span>
            <span>{caseItem.year}</span>
          </div>
        </div>

        {/* Full-width visual */}
        <div className={`w-full h-80 lg:h-[500px] bg-gradient-to-br ${caseItem.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-950 py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {caseItem.results.map((r, i) => (
              <div key={i} className="min-w-0">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-400 tracking-tighter break-words">{r.v}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 break-words">{r.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h2 className="text-3xl font-bold text-slate-950 tracking-tight mb-6">Задача</h2>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">{caseItem.challenge}</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-950 tracking-tight mb-6">Решение</h2>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">{caseItem.solution}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-slate-50 border border-slate-200 p-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Детали проекта</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-widest">Клиент</dt>
                    <dd className="text-slate-950 font-bold mt-1">{caseItem.client}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-widest">Локация</dt>
                    <dd className="text-slate-950 font-bold mt-1">{caseItem.location}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-widest">Год</dt>
                    <dd className="text-slate-950 font-bold mt-1">{caseItem.year}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-widest">Категория</dt>
                    <dd className="text-slate-950 font-bold mt-1">{caseItem.category}</dd>
                  </div>
                </dl>
              </div>
              <Link
                to="/contacts"
                className="block w-full py-5 bg-blue-600 text-white font-bold rounded-full text-center hover:bg-blue-500 transition-colors"
              >
                Похожий проект?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200 py-24">
          <div className="max-w-[1440px] mx-auto px-8">
            <h2 className="text-4xl font-bold text-slate-950 tracking-tight mb-12">Другие проекты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  to={`/cases/${c.slug}`}
                  className="group bg-white border border-slate-100 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className={`aspect-video bg-gradient-to-br ${c.gradient} relative`}>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">{c.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-950 mb-2 group-hover:text-blue-600 transition-colors">{c.title}</h3>
                    <p className="text-slate-500 text-sm font-medium">{c.shortDesc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
