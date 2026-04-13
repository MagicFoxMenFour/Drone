import { Link } from "react-router";

const team = [
  {
    name: "Попов Константин Андреевич",
    role: "Главный техник",
    bio: "Руководит технической службой компании. Отвечает за техническое обслуживание и подготовку всего флота БПЛА перед каждым вылетом. Обеспечивает соответствие дронов и оборудования стандартам безопасности. Опыт работы с беспилотными системами — 6 лет.",
    initials: "КП",
    color: "bg-blue-600",
  },
  {
    name: "Островерхов Денис",
    role: "Главный инженер",
    bio: "Проектирует и оптимизирует технические решения для нестандартных задач. Разрабатывает кастомные конфигурации БПЛА под специфику горного рельефа Кавказа. Курирует интеграцию с ГИС-системами и автоматизацию обработки данных.",
    initials: "ДО",
    color: "bg-indigo-600",
  },
  {
    name: "Новикова Елена",
    role: "Руководитель проекта",
    bio: "Ведёт все проекты от первого обращения до сдачи финального материала. Координирует работу команды, контролирует сроки и качество результата. Специализируется на проектах в агро- и строительной отраслях СКФО.",
    initials: "ЕН",
    color: "bg-green-600",
  },
  {
    name: "Самойлов Филипп",
    role: "Пилот БПЛА",
    bio: "Сертифицированный пилот БПЛА первой категории ФАВТ РФ с налётом более 600 часов. Специализируется на полётах в сложном горном рельефе и при ветре до 15 м/с. Выполнял задачи на высотах до 4 000 м в КБР и КЧР.",
    initials: "ФС",
    color: "bg-amber-600",
  },
  {
    name: "Пурас Максим",
    role: "Разработчик",
    bio: "Отвечает за разработку веб-платформ и программного обеспечения для обработки данных БПЛА. Создаёт инструменты для визуализации ортофотопланов, 3D-моделей и аналитических отчётов. Разрабатывает системы автоматизации постобработки аэрофотосъёмки.",
    initials: "МП",
    color: "bg-purple-600",
  },
];

const timeline = [
  { year: "2021", text: "Основание компании. Первые проекты аэросъемки в Ставропольском крае. Флот: 3 дрона." },
  { year: "2022", text: "Выход в смежные регионы — Дагестан, КБР, КЧР. Получена лицензия на коммерческие полеты." },
  { year: "2023", text: "Запуск направления инспекции ЛЭП. Первый крупный контракт с энергетической компанией." },
  { year: "2024", text: "200+ реализованных проектов. Флот расширен до 15 единиц. Открыт отдел агромониторинга." },
  { year: "2025", text: "Разработка систем автономного патрулирования. Выход на рынок ЮФО." },
];

const licenses = [
  "Свидетельство об авиационных работах ФАВТ РФ № АВБП-2021-304",
  "Лицензия на геодезическую и картографическую деятельность",
  "Сертификат соответствия ISO 9001:2015",
  "Допуск к работам с использованием государственной геодезической сети",
  "Страхование гражданской ответственности при выполнении полётов",
];

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">О компании</p>
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2">
              <h1 className="text-7xl lg:text-[9rem] font-medium tracking-tighter text-slate-950 leading-[0.85] mb-10">
                Видим <br /> больше
              </h1>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-end">
              <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-8">
                Мы работаем на Северном Кавказе с 2021 года — от Ставрополья до Дагестана. Дроны там, где человек не может или не должен быть.
              </p>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Citrix — специализированная компания БПЛА-сервисов для коммерческих и государственных структур. Наш флот из 15 единиц техники ежегодно выполняет более 500 вылетов в 7 регионах СКФО и ЮФО.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { v: "5+", l: "лет на рынке" },
              { v: "200+", l: "проектов" },
              { v: "15", l: "единиц флота" },
              { v: "7", l: "регионов работы" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-5xl lg:text-6xl font-bold text-blue-400 tracking-tighter">{s.v}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-32 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight mb-8">Наша миссия</h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-6">
                Сделать возможности профессиональных БПЛА доступными для бизнеса на Северном Кавказе — от малых агрохозяйств до крупных энергетических компаний.
              </p>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Мы верим, что БПЛА-технологии радикально меняют эффективность работы в условиях горного рельефа, протяженных территорий и труднодоступных объектов. Наша команда специализируется именно на Кавказе — мы знаем особенности ветров, высот и регуляторной среды каждого региона.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-10">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Наши принципы</h3>
              {[
                { t: "Безопасность прежде всего", d: "Каждый полёт — застрахован. Каждый пилот — сертифицирован ФАВТ РФ." },
                { t: "Точность — наш стандарт", d: "Мы не компромиссируем в метрологии. Данные передаются с паспортом точности." },
                { t: "Региональная экспертиза", d: "5 лет в горах Кавказа — это другой опыт, чем у московских компаний." },
                { t: "Полный цикл под ключ", d: "От согласования полётов до финального отчёта — вам не нужно привлекать подрядчиков." },
              ].map((p, i) => (
                <div key={i} className="mb-6 last:mb-0 pb-6 last:pb-0 border-b last:border-0 border-slate-200">
                  <h4 className="font-bold text-slate-950 mb-1">{p.t}</h4>
                  <p className="text-slate-500 text-sm font-medium">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-32 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight mb-16">История компании</h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200" />
            {timeline.map((t, i) => (
              <div key={i} className="relative pl-12 pb-12 last:pb-0">
                <div className="absolute left-[-11px] top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow" />
                <div className="text-blue-600 font-bold text-lg mb-2">{t.year}</div>
                <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-32 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight mb-16">Команда</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="border border-slate-100 p-8">
                <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center text-white text-xl font-bold mb-6`}>
                  {member.initials}
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-1">{member.name}</h3>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section className="bg-slate-50 py-32 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight mb-8">
                Лицензии и<br />сертификаты
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Все наши операции соответствуют требованиям российского воздушного законодательства и отраслевым стандартам. Самостоятельно согласовываем все полёты с органами власти.
              </p>
            </div>
            <div className="space-y-4">
              {licenses.map((lic, i) => (
                <div key={i} className="flex items-start gap-4 bg-white border border-slate-100 p-5">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 fill-green-600">
                      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.07 5.43l-3.5 4a.5.5 0 0 1-.36.17.5.5 0 0 1-.36-.15l-1.5-1.5a.5.5 0 1 1 .7-.7l1.14 1.14 3.14-3.6a.5.5 0 1 1 .74.64z"/>
                    </svg>
                  </div>
                  <p className="text-slate-700 font-medium text-sm leading-relaxed">{lic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">Работаем по всему СКФО</h2>
            <p className="text-slate-400 text-lg font-medium">Свяжитесь с нами, чтобы обсудить ваш проект.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/contacts" className="px-10 py-5 bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-500 transition-colors">
              Контакты
            </Link>
            <Link to="/blog" className="px-10 py-5 border border-white/30 text-white rounded-full text-lg font-bold hover:bg-white/10 transition-colors">
              Блог
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
