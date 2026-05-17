import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Service } from "../data/services";
import { getServicesList } from "../lib/content";

const colorMap: Record<string, string> = {
  cyan: "bg-cyan-50 border-cyan-100 hover:border-cyan-300",
  orange: "bg-orange-50 border-orange-100 hover:border-orange-300",
};

const accentMap: Record<string, string> = {
  cyan: "text-cyan-600",
  orange: "text-orange-600",
};

function cardColors(color: string) {
  return {
    bg: colorMap[color] ?? "bg-slate-50 border-slate-100 hover:border-slate-300",
    accent: accentMap[color] ?? "text-blue-600",
  };
}

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    let cancel = false;
    void getServicesList().then((list) => {
      if (!cancel) setServices(list);
    });
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">Что мы делаем</p>
          <h1 className="text-7xl lg:text-[9rem] font-medium tracking-tighter text-slate-950 leading-[0.85] mb-10">
            Услуги
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            Разработка ПО для робототехнических систем и контрактное производство электроники — мелкосерийный SMT-монтаж с обязательным тестированием плат.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => {
              const { bg, accent } = cardColors(s.color);
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className={`group border p-8 transition-all ${bg}`}
                >
                  <div className="text-5xl mb-8">{s.icon}</div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${accent}`}>
                    {s.price}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-950 tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">{s.shortDesc}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-3 mb-6">
                    {s.results.map((r, i) => (
                      <div key={i} className="border-l-2 border-slate-200 pl-3 min-w-0 max-w-full">
                        <div className="text-lg font-bold text-slate-950 break-words">{r.v}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest break-words">{r.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.industries.slice(0, 3).map((ind) => (
                      <span key={ind} className="text-xs font-bold bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-500">
                        {ind}
                      </span>
                    ))}
                  </div>
                  <div className={`mt-6 text-sm font-bold ${accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Подробнее →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-32 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-6xl lg:text-8xl font-medium tracking-tighter text-slate-950 mb-20">Почему мы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { t: "Инженерная глубина", d: "От ТЗ и архитектуры до интеграции на железе: C++, Python, ROS 2, встраиваемые системы." },
              { t: "Контроль серии", d: "Профили пайки фиксируем регистратором; каждая плата проходит функциональный тест перед отгрузкой." },
              { t: "Гибкий тираж", d: "Опытные партии и мелкая серия — от единичных образцов до сотен плат в месяц." },
              { t: "Документация", d: "Передаём код, схемы, отчёты по тестам и технические описания под ваш внутренний контур качества." },
            ].map((item, i) => (
              <div key={i} className="border-t-2 border-blue-600 pt-8">
                <h3 className="text-xl font-bold text-slate-950 mb-4">{item.t}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">Не нашли нужную услугу?</h2>
            <p className="text-slate-400 text-lg font-medium">Мы разрабатываем индивидуальные решения под любую задачу.</p>
          </div>
          <Link
            to="/contacts"
            className="flex-shrink-0 px-10 py-5 bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-500 transition-colors"
          >
            Обсудить проект
          </Link>
        </div>
      </section>
    </>
  );
}
