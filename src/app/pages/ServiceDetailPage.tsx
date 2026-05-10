import { useParams, Link } from "react-router";
import { getService } from "../data/services";
import { NotFoundPage } from "./NotFoundPage";

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getService(slug ?? "");

  if (!service) return <NotFoundPage />;

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-8">
          <Link to="/services" className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-8 inline-block hover:text-slate-950 transition-colors">
            ← Все услуги
          </Link>
          <div className="flex flex-col lg:flex-row gap-20 mt-6">
            <div className="lg:w-2/3">
              <div className="text-6xl mb-8">{service.icon}</div>
              <h1 className="text-6xl lg:text-8xl font-medium tracking-tighter text-slate-950 leading-[0.85] mb-8">
                {service.title}
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                {service.fullDesc}
              </p>
            </div>
            <div className="lg:w-1/3 flex flex-col gap-8">
              {/* Price & results */}
              <div className="bg-slate-50 border border-slate-200 p-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Стоимость</p>
                <p className="text-3xl font-bold text-blue-600 mb-8">{service.price}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-6 border-t border-slate-200 pt-8">
                  {service.results.map((r, i) => (
                    <div key={i} className="min-w-0">
                      <div className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight break-words">{r.v}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 break-words">{r.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/contacts"
                className="block w-full py-5 bg-slate-950 text-white font-bold rounded-full text-center hover:bg-blue-600 transition-colors"
              >
                Оставить заявку
              </Link>
              <a
                href="tel:+79887635927"
                className="block w-full py-5 border-2 border-slate-950 text-slate-950 font-bold rounded-full text-center hover:bg-slate-950 hover:text-white transition-all"
              >
                +7 (988) 763-59-27
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-12">Сферы применения</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.useCases.map((uc, i) => (
              <div key={i} className="flex items-start gap-4 bg-white border border-slate-100 p-6">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 12 12" className="w-3 h-3 fill-white">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-slate-700 font-medium">{uc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-24 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-16">Как мы работаем</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            {service.process.map((p, i) => (
              <div key={i} className="border-l-2 border-blue-600 pl-8 pb-12 relative">
                <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <p className="text-5xl font-bold text-slate-100 tracking-tighter mb-4">{p.step}</p>
                <h3 className="text-xl font-bold text-slate-950 mb-3">{p.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-12">Отрасли</h2>
          <div className="flex flex-wrap gap-4">
            {service.industries.map((ind) => (
              <span key={ind} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-full text-sm">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Готовы начать?
            </h2>
            <p className="text-slate-400 text-lg font-medium">
              Оставьте заявку — свяжемся в течение 2 часов и обсудим детали.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contacts"
              className="px-10 py-5 bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-500 transition-colors text-center"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
