export function About() {
  return (
    <section id="about" className="py-40 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-7xl lg:text-8xl font-medium tracking-tighter text-slate-950 leading-[0.9] mb-12">Видим <br />больше</h2>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
              Мы работаем на Северном Кавказе с 2021 года — от Ставрополья до Дагестана. Дроны там, где человек не может или не должен быть.
            </p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-12 border-l border-slate-100 pl-8 lg:pl-20">
            {[ {l:"Опыт", v:"5+ лет"}, {l:"Проектов", v:"200+"}, {l:"Точность", v:"1 см"}, {l:"Флот", v:"15 ед."} ].map((s, i) => (
              <div key={i}>
                <div className="text-5xl font-bold text-blue-600 tracking-tighter">{s.v}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Topographic / aerial map visualization */}
        <div className="mt-32 rounded-sm overflow-hidden h-[500px] relative bg-slate-950">
          {/* Grid */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: 'linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
          {/* Topographic contour lines */}
          <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,350 C150,320 250,380 400,300 C550,220 650,260 800,200 C950,140 1050,180 1200,150" stroke="#60a5fa" strokeWidth="1.5"/>
            <path d="M0,380 C150,350 250,410 400,330 C550,250 650,290 800,230 C950,170 1050,210 1200,180" stroke="#60a5fa" strokeWidth="1"/>
            <path d="M0,410 C150,380 250,440 400,360 C550,280 650,320 800,260 C950,200 1050,240 1200,210" stroke="#60a5fa" strokeWidth="1"/>
            <path d="M0,440 C150,410 250,470 400,390 C550,310 650,350 800,290 C950,230 1050,270 1200,240" stroke="#60a5fa" strokeWidth="0.8"/>
            <path d="M0,300 C200,270 350,320 500,240 C650,160 780,210 950,160 C1050,130 1130,150 1200,130" stroke="#93c5fd" strokeWidth="1.5"/>
            <path d="M0,270 C200,240 350,290 500,210 C650,130 780,180 950,130 C1050,100 1130,120 1200,100" stroke="#93c5fd" strokeWidth="1"/>
          </svg>
          {/* Blue gradient overlay from left */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-transparent to-transparent" />
          {/* Stats overlay text */}
          <div className="absolute bottom-10 left-10 font-mono text-xs text-blue-300/60 space-y-1">
            <div>РЕГИОН: СКФО / ЮФО</div>
            <div>ТОЧНОСТЬ: 1 СМ/ПКС</div>
            <div>ПОКРЫТИЕ: 99.7%</div>
          </div>
          {/* Right side subtle glow */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-900/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}