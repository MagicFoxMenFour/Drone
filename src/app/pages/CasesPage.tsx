import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import type { Case } from "../data/cases";
import { getCasesList } from "../lib/content";

export function CasesPage() {
  const [list, setList] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Все");

  useEffect(() => {
    let cancel = false;
    void getCasesList()
      .then((rows) => {
        if (!cancel) setList(rows);
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const categories = useMemo(() => {
    const uniq = [...new Set(list.map((c) => c.category).filter(Boolean))].sort();
    return ["Все", ...uniq];
  }, [list]);

  const filtered = active === "Все" ? list : list.filter((c) => c.category === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">Наши работы</p>
          <h1 className="text-7xl lg:text-[9rem] font-medium tracking-tighter text-slate-950 leading-[0.85] mb-10">
            Проекты
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            Производство электроники и разработка программного обеспечения для робототехники и БПЛА.
          </p>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  active === cat
                    ? "bg-slate-950 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-slate-500 font-medium col-span-full md:col-span-2 lg:col-span-3">Загрузка проектов…</p>
            ) : list.length === 0 ? (
              <p className="text-slate-500 font-medium col-span-full md:col-span-2 lg:col-span-3">Пока нет опубликованных проектов.</p>
            ) : filtered.length === 0 ? (
              <p className="text-slate-500 font-medium col-span-full md:col-span-2 lg:col-span-3">В этой категории пока нет проектов.</p>
            ) : (
            filtered.map((c) => (
              <Link
                key={c.slug}
                to={`/cases/${c.slug}`}
                className="group bg-white border border-slate-100 hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Visual */}
                <div className={`aspect-video bg-gradient-to-br ${c.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }} />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">{c.category}</span>
                    <span className="text-xs font-bold text-white/40">{c.year}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{c.location}</p>
                  <h2 className="text-2xl font-bold text-slate-950 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-5">{c.shortDesc}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-100 pt-5">
                    {c.results.slice(0, 3).map((r, i) => (
                      <div key={i} className="min-w-0 max-w-[45%] sm:max-w-none">
                        <div className="text-base font-bold text-slate-950 break-words">{r.v}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest break-words">{r.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">Станьте нашим следующим кейсом</h2>
            <p className="text-slate-400 text-lg font-medium">Обсудим вашу задачу и предложим решение.</p>
          </div>
          <Link to="/contacts" className="flex-shrink-0 px-10 py-5 bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-500 transition-colors">
            Оставить заявку
          </Link>
        </div>
      </section>
    </>
  );
}
