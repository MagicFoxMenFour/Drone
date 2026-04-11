import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-white pt-32 overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[70%] h-[60%] lg:w-[60%] lg:h-[80%] z-0">
        <motion.div
          initial={{ skewY: -12, y: 100, opacity: 0 }}
          animate={{ skewY: -12, y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full relative shadow-2xl origin-right overflow-hidden"
          style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)' }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-black" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }} />
          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-3xl" />
          </div>
          {/* Drone SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 120" className="w-[55%] opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Arms */}
              <line x1="100" y1="60" x2="35" y2="30" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
              <line x1="100" y1="60" x2="165" y2="30" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
              <line x1="100" y1="60" x2="35" y2="90" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
              <line x1="100" y1="60" x2="165" y2="90" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
              {/* Propellers */}
              <ellipse cx="35" cy="30" rx="18" ry="6" stroke="#60a5fa" strokeWidth="2" opacity="0.8"/>
              <ellipse cx="165" cy="30" rx="18" ry="6" stroke="#60a5fa" strokeWidth="2" opacity="0.8"/>
              <ellipse cx="35" cy="90" rx="18" ry="6" stroke="#60a5fa" strokeWidth="2" opacity="0.8"/>
              <ellipse cx="165" cy="90" rx="18" ry="6" stroke="#60a5fa" strokeWidth="2" opacity="0.8"/>
              {/* Body */}
              <rect x="86" y="50" width="28" height="20" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
              {/* Camera */}
              <circle cx="100" cy="72" r="5" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5"/>
              <circle cx="100" cy="72" r="2.5" fill="#3b82f6" opacity="0.8"/>
              {/* Motor dots */}
              <circle cx="35" cy="30" r="4" fill="#3b82f6"/>
              <circle cx="165" cy="30" r="4" fill="#3b82f6"/>
              <circle cx="35" cy="90" r="4" fill="#3b82f6"/>
              <circle cx="165" cy="90" r="4" fill="#3b82f6"/>
            </svg>
          </div>
          {/* Scan line animation */}
          <motion.div
            animate={{ y: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
          />
          <div className="absolute inset-0 bg-blue-600/20" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[12vw] lg:text-[10rem] font-medium leading-[0.8] text-slate-950 tracking-tighter mb-20"
        >
          Небо <br /> Кавказа
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-12 mt-24 items-end">
          <div className="space-y-6">
            <p className="text-xl lg:text-2xl text-slate-900 font-medium max-w-sm leading-snug">
              Профессиональные БПЛА-сервисы для агробизнеса, энергетики и строительства на Северном Кавказе.
            </p>
            <div className="flex gap-12 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              <div>Работаем по СКФО и ЮФО</div>
              <div>Лицензия РФ</div>
            </div>
          </div>
          
          <div className="flex justify-start lg:justify-end pb-10">
             <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
                className="px-12 py-5 bg-slate-950 text-white rounded-full text-xl font-bold hover:bg-blue-600 transition-all shadow-2xl"
             >
                Начать проект
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}