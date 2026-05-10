import { Link } from "react-router";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <h2 className="text-7xl lg:text-9xl font-medium tracking-tighter mb-20 text-slate-950">Пакеты</h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="relative p-1 bg-gradient-to-br from-orange-600 to-amber-500 overflow-hidden min-h-[520px] flex items-center justify-center">
            <div className="bg-white p-12 w-full max-w-md shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Монтаж плат</p>
              <h3 className="text-5xl sm:text-6xl font-bold text-slate-950 mb-8 tracking-tighter break-words">от 500 ₽</h3>
              <div className="border-t border-slate-100 pt-8 mb-10 text-slate-500 font-medium">
                SMT и выводной монтаж, контроль профиля пайки, функциональный тест каждой платы по согласованной программе.
              </div>
              <Link
                to="/contacts"
                className="block w-full py-4 bg-slate-950 text-white font-bold rounded-full hover:bg-blue-600 transition-colors text-center"
              >
                Оставить заявку
              </Link>
            </div>
          </div>

          <div className="relative p-1 bg-gradient-to-br from-cyan-600 to-blue-700 overflow-hidden min-h-[520px] flex items-center justify-center">
            <div className="bg-white p-12 w-full max-w-md shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Разработка ПО</p>
              <h3 className="text-5xl sm:text-6xl font-bold text-slate-950 mb-8 tracking-tighter">по запросу</h3>
              <div className="border-t border-slate-100 pt-8 mb-10 text-slate-500 font-medium">
                Робототехника и БПЛА: C++, Python, ROS 2, встраиваемые узлы и наземные приложения. Этапы и приёмка фиксируются в ТЗ.
              </div>
              <Link
                to="/contacts"
                className="block w-full py-4 bg-slate-950 text-white font-bold rounded-full hover:bg-blue-600 transition-colors text-center"
              >
                Обсудить проект
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
