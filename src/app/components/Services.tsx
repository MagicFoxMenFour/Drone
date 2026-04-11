export function Services() {
  return (
    <section id="services" className="bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-8 lg:p-16 lg:border-r border-slate-200">
          <h2 className="text-7xl lg:text-8xl font-medium tracking-tighter text-slate-950 mb-24">Наши услуги</h2>
          <div className="space-y-20">
            {[
              { t: "Аэрофотосъемка", d: "Съемка горного рельефа, полей и объектов в 8K для застройщиков и туроператоров Кавказа." },
              { t: "3D-Картография", d: "Цифровые модели рельефа для проектирования дорог, ГЭС и агрологистики в СКФО." },
              { t: "Инспекция", d: "Поиск дефектов на ЛЭП, газопроводах и горных сооружениях без подъема людей на высоту." }
            ].map((s, i) => (
              <div key={i} className="max-w-md border-t border-slate-100 pt-8">
                <h3 className="text-3xl font-bold text-slate-950 mb-4 tracking-tight">{s.t}</h3>
                <p className="text-lg text-slate-500 font-medium">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 bg-[#050510] p-8 lg:p-20 flex flex-col justify-center">
          {/* Mission control telemetry display */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-[#020817] border border-blue-900/40">
            {/* Grid */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 border border-blue-500/40 rounded-full" />
              <div className="absolute w-48 h-48 border border-blue-500/20 rounded-full" />
              <div className="absolute w-[1px] h-full bg-blue-500/20" />
              <div className="absolute w-full h-[1px] bg-blue-500/20" />
            </div>
            {/* Blinking dot — drone position */}
            <div className="absolute top-[38%] left-[52%]">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75" />
              <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full" />
            </div>
            {/* HUD data overlay */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-blue-400/70 space-y-1">
              <div>ALT: 120 m</div>
              <div>SPD: 14.2 m/s</div>
              <div>BAT: 87%</div>
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-blue-400/70 space-y-1 text-right">
              <div>55°45'21"N</div>
              <div>37°37'04"E</div>
              <div className="text-green-400/80">● LIVE</div>
            </div>
            {/* Path trace */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 225" fill="none">
              <polyline points="60,160 110,120 160,135 210,90 260,80 300,95" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 3"/>
              <circle cx="300" cy="95" r="4" fill="#60a5fa"/>
            </svg>
          </div>
          <p className="text-white/40 text-xs mt-10 font-mono tracking-widest uppercase text-center">Статус системы: В полете // СКФО 2026</p>
        </div>
      </div>
    </section>
  );
}