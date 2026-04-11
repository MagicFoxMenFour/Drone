import { motion } from "motion/react";

// SVG icons for each project type
const CityIcon = () => (
  <svg viewBox="0 0 80 80" className="w-20 h-20 opacity-50" fill="none">
    <rect x="10" y="30" width="12" height="40" fill="#93c5fd"/>
    <rect x="26" y="20" width="14" height="50" fill="#60a5fa"/>
    <rect x="44" y="35" width="10" height="35" fill="#93c5fd"/>
    <rect x="58" y="25" width="12" height="45" fill="#3b82f6"/>
    <line x1="5" y1="70" x2="75" y2="70" stroke="#60a5fa" strokeWidth="2"/>
  </svg>
);
const OceanIcon = () => (
  <svg viewBox="0 0 80 60" className="w-20 h-16 opacity-50" fill="none">
    <path d="M0,30 C13,20 27,40 40,30 C53,20 67,40 80,30" stroke="#22d3ee" strokeWidth="3"/>
    <path d="M0,45 C13,35 27,55 40,45 C53,35 67,55 80,45" stroke="#06b6d4" strokeWidth="2"/>
    <path d="M0,15 C13,5 27,25 40,15 C53,5 67,25 80,15" stroke="#67e8f9" strokeWidth="2"/>
  </svg>
);
const SolarIcon = () => (
  <svg viewBox="0 0 80 80" className="w-20 h-20 opacity-50" fill="none">
    <circle cx="40" cy="40" r="14" stroke="#fbbf24" strokeWidth="2.5"/>
    {[0,45,90,135,180,225,270,315].map((a, i) => (
      <line key={i} x1={40 + 18*Math.cos(a*Math.PI/180)} y1={40 + 18*Math.sin(a*Math.PI/180)}
        x2={40 + 26*Math.cos(a*Math.PI/180)} y2={40 + 26*Math.sin(a*Math.PI/180)}
        stroke="#fcd34d" strokeWidth="2" strokeLinecap="round"/>
    ))}
  </svg>
);
const AgroIcon = () => (
  <svg viewBox="0 0 80 80" className="w-20 h-20 opacity-50" fill="none">
    <path d="M10,70 C10,50 20,30 40,20 C60,30 70,50 70,70" stroke="#4ade80" strokeWidth="2"/>
    <line x1="40" y1="20" x2="40" y2="70" stroke="#86efac" strokeWidth="1.5"/>
    <path d="M40,35 C30,28 20,32 15,28" stroke="#4ade80" strokeWidth="1.5"/>
    <path d="M40,45 C50,38 60,42 65,38" stroke="#4ade80" strokeWidth="1.5"/>
  </svg>
);

const projects = [
  {
    title: "Ставрополь 3D", category: "Картография",
    desc: "Цифровой двойник промзоны Ставрополя площадью 280 км². Данные использованы для проектирования двух транспортных развязок в рамках нацпроекта.",
    stats: [{ v: "280 км²", l: "площадь" }, { v: "1 см", l: "точность" }, { v: "36 ч", l: "срок" }],
    gradient: "from-slate-900 via-blue-950 to-slate-900",
    accent: "bg-blue-500/20", icon: <CityIcon />,
    gridColor: "rgba(59,130,246,0.3)"
  },
  {
    title: "Каспий Патруль", category: "Мониторинг",
    desc: "Патрулирование 180 км побережья Каспийского моря в Дагестане. Время обнаружения загрязнений сокращено с 5 часов до 22 минут.",
    stats: [{ v: "180 км", l: "маршрут" }, { v: "22 мин", l: "реакция" }, { v: "24/7", l: "режим" }],
    gradient: "from-slate-900 via-cyan-950 to-slate-900",
    accent: "bg-cyan-500/20", icon: <OceanIcon />,
    gridColor: "rgba(6,182,212,0.3)"
  },
  {
    title: "ГЭС Инспект", category: "Энергетика",
    desc: "Тепловизионная инспекция ЛЭП и оборудования Баксанской ГЭС в КБР. Выявлено 284 дефекта, недоступных при визуальном осмотре.",
    stats: [{ v: "284", l: "дефекта" }, { v: "420 км", l: "ЛЭП" }, { v: "−45%", l: "стоимость" }],
    gradient: "from-slate-900 via-amber-950 to-slate-900",
    accent: "bg-amber-500/20", icon: <SolarIcon />,
    gridColor: "rgba(245,158,11,0.3)"
  },
  {
    title: "Степь Агро", category: "Агро",
    desc: "Мультиспектральный анализ посевов пшеницы на полях Ставропольского края. Точечное орошение снизило расход воды на 33% и повысило урожай на 21%.",
    stats: [{ v: "9 400 га", l: "площадь" }, { v: "−33%", l: "вода" }, { v: "+21%", l: "урожай" }],
    gradient: "from-slate-900 via-green-950 to-slate-900",
    accent: "bg-green-500/20", icon: <AgroIcon />,
    gridColor: "rgba(34,197,94,0.3)"
  },
];

export function Cases() {
  return (
    <section id="cases" className="py-32 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8">
        <h2 className="text-8xl lg:text-[10rem] font-medium tracking-tighter text-slate-950 mb-24">Проекты</h2>
        
        <div className="flex gap-6 overflow-x-auto pb-12 no-scrollbar">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12 }}
              className="min-w-[260px] max-w-[260px] bg-white p-3 shadow-xl border border-slate-100 flex-shrink-0"
              style={{ transform: 'rotateY(-8deg) rotateX(3deg)', transformStyle: 'preserve-3d' }}
            >
              <div className={`aspect-[4/3] overflow-hidden mb-4 relative bg-gradient-to-br ${project.gradient}`}>
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `linear-gradient(${project.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${project.gridColor} 1px, transparent 1px)`,
                  backgroundSize: '32px 32px'
                }} />
                {/* Glow */}
                <div className={`absolute inset-0 flex items-center justify-center`}>
                  <div className={`w-32 h-32 ${project.accent} rounded-full blur-2xl`} />
                </div>
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.icon}
                </div>
              </div>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{project.category}</p>
              <h3 className="text-lg font-bold text-slate-950 tracking-tight mb-2">{project.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">{project.desc}</p>
              <div className="flex gap-3 border-t border-slate-100 pt-3">
                {project.stats.map((s, j) => (
                  <div key={j}>
                    <div className="text-sm font-bold text-slate-950 tracking-tight">{s.v}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}