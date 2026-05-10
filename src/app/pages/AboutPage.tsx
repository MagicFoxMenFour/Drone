import { Link } from "react-router";

const team = [
  {
    name: "Самойлов Филипп Владимирович",
    role: "Пре-проектная аналитика / Эскизное и техническое проектирование / Прототипирование",
    bio: "Опыт работы в междисциплинарных командах, руководство коллективами разработчиков, постановка задач и контроль их выполнения. Глубокое понимание архитектуры систем управления БПЛА, включая алгоритмы автономного управления, навигации, стабилизации и координации групповых действий. Широкий опыт практической работы с различными типами коммерческих БПЛА, включая сборку, ремонт, настройку и отладку оборудования.",
    initials: "ФС",
    color: "bg-amber-600",
  },
  {
    name: "Новикова Елена Николаевна",
    role: "Экспертиза технических решений / Индустриальные коллаборации / Управление проектами",
    bio: "Опыт создания технических заданий (ТЗ) для разработки программного обеспечения, аппаратных решений и интеграционных систем. Профессиональное управление проектами полного цикла, включая планирование, распределение ресурсов, контроль сроков исполнения и соблюдение бюджета. Применение методологий Agile, Scrum, Waterfall для эффективной координации работы команды.",
    initials: "ЕН",
    color: "bg-green-600",
  },
  {
    name: "Пурас Максим Романович",
    role: "Программирование / CAD-моделирование / Робототехника и электроника",
    bio: "Владение языками C++ и Python для разработки алгоритмов и обработки данных. Опыт низкоуровневого программирования микроконтроллеров (Arduino, Digispark, NodeMCU) с настройкой периферии, таймеров и интерфейсов связи (I2C, SPI, UART). Навыки 3D-моделирования механизмов в Autodesk Fusion 360. Разработка и тестирование алгоритмов для управления робототехническими системами.",
    initials: "МП",
    color: "bg-purple-600",
  },
  {
    name: "Соколов Михаил Романович",
    role: "Программирование / Компьютерное зрение / Разработка для ROS 2",
    bio: "Владение языками C++ и Python для разработки высокопроизводительных алгоритмов и сложных приложений. Опыт разработки алгоритмов компьютерного зрения на базе OpenCV — обработка изображений, распознавание объектов, анализ видеопотока. Знание фреймворка ROS 2: создание узлов, взаимодействие с топиками, сервисами и действиями для автономного управления роботами.",
    initials: "МС",
    color: "bg-blue-600",
  },
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
                Команда из Северного Кавказа: разработка встраиваемого и прикладного ПО для робототехники и БПЛА, мелкосерийное производство электроники.
              </p>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Объединяем компетенции в программировании (C++, Python, ROS 2, компьютерное зрение) и в SMT-монтаже печатных плат с обязательным функциональным тестом каждой платы.
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
              { v: "100%", l: "тест плат" },
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
                Давать заказчикам предсказуемое качество в разработке ПО для робототехники и в производстве электроники — с прозрачными этапами, тестами и документацией.
              </p>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Работаем с заказчиками по СКФО и за его пределами: от алгоритмов и узлов ROS 2 до партий собранных и проверенных плат.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-10">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Наши принципы</h3>
              {[
                { t: "Инженерная дисциплина", d: "Фиксируем требования, ведём ревизию кода и схем, документируем интерфейсы и результаты тестов." },
                { t: "Качество серии", d: "Профили пайки контролируем по каналам; каждая плата проходит функциональную проверку перед отгрузкой." },
                { t: "Региональная доступность", d: "Базируемся на Ставрополье, работаем с заказчиками по СКФО и по всей стране." },
                { t: "Полный контур поставки", d: "От прототипа и мелкой серии до передачи исходников, прошивок и производственной документации." },
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

      {/* Partners */}
      <section className="bg-white py-24 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight mb-8">Партнёры</h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
            Сотрудничаем с ведущими компаниями в сфере электроники, разработки ПО и аддитивных технологий.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: "ООО «Электростройсервис»", desc: "Производство электроники и компонентов" },
              { name: "ООО «Стилсофт»", desc: "Разработка программного обеспечения" },
              { name: "ООО «Юнион Аддитив»", desc: "Аддитивные технологии и 3D-печать" },
            ].map((p, i) => (
              <div key={i} className="border border-slate-100 p-8 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72L4.318 3.44A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72m-13.5 8.65h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .415.336.75.75.75Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">{p.name}</h3>
                <p className="text-slate-400 text-sm font-medium">{p.desc}</p>
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
                Соответствуем требованиям отраслевых стандартов и внутренних регламентов заказчиков. По запросу предоставляем пакет документов для аудита качества.
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
