export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <h2 className="text-7xl lg:text-9xl font-medium tracking-tighter mb-20 text-slate-950">Пакеты</h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Первая карточка */}
          <div className="relative p-1 bg-gradient-to-br from-blue-700 to-sky-400 overflow-hidden min-h-[600px] flex items-center justify-center">
             <div className="bg-white p-12 w-full max-w-md shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Базовый полёт</p>
                <h3 className="text-6xl font-bold text-slate-950 mb-8 tracking-tighter">49 900 ₽</h3>
                <div className="border-t border-slate-100 pt-8 mb-10 text-slate-500 font-medium">
                   Включает 2 часа съёмки, базовый монтаж и передачу всех RAW исходников. Работаем по всему СКФО.
                </div>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-4 bg-slate-950 text-white font-bold rounded-full hover:bg-blue-600 transition-colors"
                >
                  Оставить заявку
                </button>
             </div>
          </div>

          {/* Вторая карточка */}
          <div className="relative p-1 bg-gradient-to-br from-sky-400 to-blue-600 overflow-hidden min-h-[600px] flex items-center justify-center">
             <div className="bg-white p-12 w-full max-w-md shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Промышленный пакет</p>
                <h3 className="text-6xl font-bold text-slate-950 mb-8 tracking-tighter">149 900 ₽</h3>
                <div className="border-t border-slate-100 pt-8 mb-10 text-slate-500 font-medium">
                   3D-картография, тепловизионная съёмка и полный аналитический отчёт. Идеально для агро, энергетики и строительства.
                </div>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-4 bg-slate-950 text-white font-bold rounded-full hover:bg-blue-600 transition-colors"
                >
                  Оставить заявку
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}