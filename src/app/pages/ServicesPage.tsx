import { Link } from "react-router";
import { services } from "../data/services";

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 border-blue-100 hover:border-blue-300",
  indigo: "bg-indigo-50 border-indigo-100 hover:border-indigo-300",
  amber: "bg-amber-50 border-amber-100 hover:border-amber-300",
  green: "bg-green-50 border-green-100 hover:border-green-300",
  red: "bg-red-50 border-red-100 hover:border-red-300",
  slate: "bg-slate-50 border-slate-200 hover:border-slate-400",
};

const accentMap: Record<string, string> = {
  blue: "text-blue-600",
  indigo: "text-indigo-600",
  amber: "text-amber-600",
  green: "text-green-600",
  red: "text-red-600",
  slate: "text-slate-600",
};

export function ServicesPage() {
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
            Полный спектр БПЛА-сервисов для бизнеса и государственных структур Северного Кавказа.
            Работаем во всех регионах СКФО и ЮФО с 2021 года.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className={`group border p-8 transition-all ${colorMap[s.color]}`}
              >
                <div className="text-5xl mb-8">{s.icon}</div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${accentMap[s.color]}`}>
                  {s.price}
                </p>
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">{s.shortDesc}</p>
                <div className="flex gap-4 mb-6">
                  {s.results.map((r, i) => (
                    <div key={i} className="border-l-2 border-slate-200 pl-3">
                      <div className="text-lg font-bold text-slate-950">{r.v}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.l}</div>
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
                <div className={`mt-6 text-sm font-bold ${accentMap[s.color]} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Подробнее →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-32 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-6xl lg:text-8xl font-medium tracking-tighter text-slate-950 mb-20">Почему мы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { t: "Лицензия Росавиации", d: "Все полеты согласованы. Вам не нужно самостоятельно оформлять разрешения." },
              { t: "Точность RTK", d: "Оборудование с RTK-коррекцией обеспечивает точность до 1 см без наземных меток." },
              { t: "Кавказский опыт", d: "5 лет работы в горном рельефе, при ветре и на высотах до 4000 м над уровнем моря." },
              { t: "Полный цикл", d: "От съемки до готового продукта: отчёт, 3D-модель, видео, карты предписаний." },
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
