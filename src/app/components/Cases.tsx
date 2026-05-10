import { motion } from "motion/react";
import { Link } from "react-router";

const PcbIcon = () => (
  <svg viewBox="0 0 80 80" className="w-20 h-20 opacity-50" fill="none">
    <rect x="12" y="18" width="56" height="44" rx="4" stroke="#f97316" strokeWidth="2" />
    <circle cx="28" cy="32" r="3" fill="#fb923c" />
    <circle cx="52" cy="32" r="3" fill="#fb923c" />
    <circle cx="40" cy="48" r="3" fill="#fb923c" />
    <path d="M20 58h40" stroke="#fdba74" strokeWidth="1.5" />
  </svg>
);

const WebRtcIcon = () => (
  <svg viewBox="0 0 80 80" className="w-20 h-20 opacity-50" fill="none">
    <circle cx="40" cy="40" r="22" stroke="#3b82f6" strokeWidth="2" />
    <path d="M28 40h24M40 28v24" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
    <circle cx="40" cy="40" r="6" fill="#3b82f6" opacity="0.6" />
  </svg>
);

const projects = [
  {
    slug: "smt-montazh",
    title: "SMT-монтаж платы: 300 шт. за 15 дней",
    category: "Производство",
    desc: "Партия плат управления с шагом 0.4 мм, полный цикл и тест каждой платы.",
    stats: [{ v: "300", l: "плат" }, { v: "15 дн.", l: "срок" }, { v: "0", l: "дефектов" }],
    gradient: "from-slate-900 via-red-950 to-slate-900",
    accent: "bg-red-500/20",
    icon: <PcbIcon />,
    gridColor: "rgba(239,68,68,0.3)",
  },
  {
    slug: "bpla-webrtc",
    title: "Система управления БПЛА через WebRTC",
    category: "Разработка",
    desc: "Управление и видео по 4G/5G за пределами прямой видимости, поддержка нескольких полётных контроллеров.",
    stats: [{ v: "3.5 мес.", l: "срок" }, { v: "4G/5G", l: "связь" }, { v: "WebRTC", l: "видео" }],
    gradient: "from-slate-900 via-blue-950 to-slate-900",
    accent: "bg-blue-500/20",
    icon: <WebRtcIcon />,
    gridColor: "rgba(59,130,246,0.3)",
  },
];

export function Cases() {
  return (
    <section id="cases" className="py-32 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8">
        <h2 className="text-8xl lg:text-[10rem] font-medium tracking-tighter text-slate-950 mb-24">Проекты</h2>

        <div className="flex gap-6 overflow-x-auto pb-12 no-scrollbar">
          {projects.map((project, i) => (
            <Link key={i} to={`/cases/${project.slug}`} className="block flex-shrink-0">
              <motion.div
                whileHover={{ y: -12 }}
                className="min-w-[260px] max-w-[260px] bg-white p-3 shadow-xl border border-slate-100"
                style={{ transform: "rotateY(-8deg) rotateX(3deg)", transformStyle: "preserve-3d" }}
              >
                <div className={`aspect-[4/3] overflow-hidden mb-4 relative bg-gradient-to-br ${project.gradient}`}>
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `linear-gradient(${project.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${project.gridColor} 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-32 h-32 ${project.accent} rounded-full blur-2xl`} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">{project.icon}</div>
                </div>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{project.category}</p>
                <h3 className="text-lg font-bold text-slate-950 tracking-tight mb-2">{project.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">{project.desc}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-2 border-t border-slate-100 pt-3">
                  {project.stats.map((s, j) => (
                    <div key={j} className="min-w-0">
                      <div className="text-sm font-bold text-slate-950 tracking-tight break-words">{s.v}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest break-words">{s.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
