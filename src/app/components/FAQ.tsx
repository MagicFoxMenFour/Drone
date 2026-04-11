import { useState } from "react";

const faqs = [
  { q: "Как заказать съёмку?", a: "Оставьте заявку на сайте или позвоните нам. Менеджер свяжется в течение 2 часов, уточнит задачу и согласует дату вылета." },
  { q: "Работаете ли вы в горных районах?", a: "Да. Мы выполняем полёты в горах Кавказа — КБР, КЧР, Северная Осетия. Используем специализированные БПЛА для сложного рельефа и высот до 4 000 м." },
  { q: "Нужны ли разрешения на полёты?", a: "Мы самостоятельно согласовываем все полёты с органами власти и Росавиацией. Клиенту ничего оформлять не нужно." },
  { q: "Как быстро получу результат?", a: "Аэрофотосъёмка — готово за 24 часа. 3D-модели и аналитические отчёты — от 3 до 5 рабочих дней." },
  { q: "Безопасно ли это?", a: "Все дроны оснащены резервными системами. Каждый полёт застрахован. Пилоты имеют свидетельства ФАВТ РФ и опыт работы на Кавказе от 3 лет." }
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row gap-20">

        {/* Left column: title + visual */}
        <div className="lg:w-1/3 flex flex-col gap-12">
          <h2 className="text-8xl font-medium tracking-tighter">Вопросы</h2>

          {/* Visual: drone altitude card */}
          <div className="rounded-2xl overflow-hidden bg-slate-950 relative h-64 flex flex-col justify-end p-6">
            {/* Grid */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }} />
            {/* Glow */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-500/25 rounded-full blur-2xl" />
            {/* Drone SVG */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <svg viewBox="0 0 120 72" className="w-32 opacity-70" fill="none">
                <line x1="60" y1="36" x2="18" y2="18" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="60" y1="36" x2="102" y2="18" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="60" y1="36" x2="18" y2="54" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="60" y1="36" x2="102" y2="54" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                <ellipse cx="18" cy="18" rx="12" ry="4" stroke="#60a5fa" strokeWidth="1.5"/>
                <ellipse cx="102" cy="18" rx="12" ry="4" stroke="#60a5fa" strokeWidth="1.5"/>
                <ellipse cx="18" cy="54" rx="12" ry="4" stroke="#60a5fa" strokeWidth="1.5"/>
                <ellipse cx="102" cy="54" rx="12" ry="4" stroke="#60a5fa" strokeWidth="1.5"/>
                <rect x="50" y="29" width="20" height="14" rx="3" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
                <circle cx="60" cy="43" r="4" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.2"/>
                <circle cx="60" cy="43" r="1.8" fill="#3b82f6"/>
                <circle cx="18" cy="18" r="3" fill="#3b82f6"/>
                <circle cx="102" cy="18" r="3" fill="#3b82f6"/>
                <circle cx="18" cy="54" r="3" fill="#3b82f6"/>
                <circle cx="102" cy="54" r="3" fill="#3b82f6"/>
              </svg>
            </div>
            {/* Stats */}
            <div className="relative z-10 flex justify-between font-mono text-[11px]">
              <div className="text-blue-400/80">
                <div className="text-white/40 mb-0.5">ВЫСОТА</div>
                <div className="text-lg font-bold text-blue-400">120 м</div>
              </div>
              <div className="text-blue-400/80 text-right">
                <div className="text-white/40 mb-0.5">СТАТУС</div>
                <div className="text-green-400 font-bold">● В ПОЛЁТЕ</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 border-t border-slate-200">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-slate-200 overflow-hidden cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
              <div className="py-10 flex justify-between items-center group">
                <span className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">{f.q}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all ${open === i ? 'bg-blue-600 text-white rotate-45' : 'bg-slate-100'}`}>+</div>
              </div>
              <div className={`transition-all duration-300 ${open === i ? 'max-h-96 pb-10' : 'max-h-0'}`}>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}