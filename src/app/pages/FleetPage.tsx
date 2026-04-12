import { Link } from "react-router";

const drones = [
  {
    name: "DJI Matrice 350 RTK",
    category: "Картография / Инспекция",
    badge: "Флагман",
    badgeColor: "bg-blue-600",
    desc: "Профессиональный картографический БПЛА с встроенной RTK-системой позиционирования. Работает при ветре до 15 м/с и температуре до −20°C. Основа нашего картографического флота.",
    specs: [
      { l: "Время полёта", v: "55 мин" },
      { l: "Макс. скорость", v: "23 м/с" },
      { l: "Макс. высота", v: "7000 м" },
      { l: "Дальность", v: "20 км" },
      { l: "Защита", v: "IP55" },
      { l: "Полезная нагрузка", v: "2.7 кг" },
    ],
    payload: ["Zenmuse P1 (61 МП)", "Zenmuse L2 (LiDAR)", "Zenmuse H30T (тепловизор)"],
    tasks: ["3D-картография", "Тепловизионная инспекция", "LiDAR-сканирование"],
    count: 3,
  },
  {
    name: "DJI Mavic 3 Enterprise",
    category: "Инспекция / Разведка",
    badge: "Мобильный",
    badgeColor: "bg-slate-700",
    desc: "Компактный профессиональный БПЛА с 4/3 CMOS сенсором и 56-кратным гибридным зумом. Идеален для оперативной инспекции и разведки. Складывается до размера бутылки воды.",
    specs: [
      { l: "Время полёта", v: "45 мин" },
      { l: "Макс. скорость", v: "21 м/с" },
      { l: "Макс. высота", v: "6000 м" },
      { l: "Дальность", v: "15 км" },
      { l: "Зум", v: "56× гибридный" },
      { l: "Резервирование", v: "Двойная СИМ" },
    ],
    payload: ["Камера 4/3 CMOS", "Тепловизор 640×512", "Лазерный дальномер"],
    tasks: ["Инспекция ЛЭП", "Мониторинг строительства", "Поисково-спасательные операции"],
    count: 4,
  },
  {
    name: "DJI Agras T40",
    category: "Агромониторинг / Опрыскивание",
    badge: "Агро",
    badgeColor: "bg-green-600",
    desc: "Специализированный сельскохозяйственный БПЛА для обработки и мониторинга угодий. Бак 40 литров, производительность до 40 га/час. Работает с картами предписаний в реальном времени.",
    specs: [
      { l: "Производительность", v: "40 га/ч" },
      { l: "Объём бака", v: "40 л" },
      { l: "Ширина захвата", v: "9 м" },
      { l: "Точность", v: "±0.1 м (RTK)" },
      { l: "Время полёта", v: "20 мин (полный)" },
      { l: "Дальность", v: "5 км" },
    ],
    payload: ["Мультиспектральный сенсор", "Радар препятствий", "FPV-камера"],
    tasks: ["Точечное орошение", "Внесение удобрений", "Обработка пестицидами"],
    count: 2,
  },
  {
    name: "DJI Matrice 30T",
    category: "Тепловизионная инспекция",
    badge: "Тепловизор",
    badgeColor: "bg-amber-600",
    desc: "Компактный промышленный БПЛА с интегрированным тепловизором FLIR. Всепогодный корпус IP55, встроенный зарядный порт. Оптимален для ночных инспекций кровель и подстанций.",
    specs: [
      { l: "Тепловая камера", v: "FLIR 640×512" },
      { l: "Точность температуры", v: "±0.5°C" },
      { l: "Оптическая камера", v: "48 МП" },
      { l: "Время полёта", v: "41 мин" },
      { l: "Ветроустойчивость", v: "15 м/с" },
      { l: "Защита", v: "IP55" },
    ],
    payload: ["FLIR тепловизор", "48 МП камера", "Лазерный дальномер 1200 м"],
    tasks: ["Инспекция кровель", "Диагностика СЭС", "Поиск утечек тепла"],
    count: 2,
  },
  {
    name: "Autel EVO II Pro V3",
    category: "Аэрофотосъемка",
    badge: "Фото",
    badgeColor: "bg-purple-600",
    desc: "Профессиональный фотодрон с 6K камерой на f/2.8 объективе с регулируемой диафрагмой. Обеспечивает коммерческое качество фото и видео для маркетинговых и медиапроектов.",
    specs: [
      { l: "Разрешение фото", v: "50 МП" },
      { l: "Видео", v: "6K/30fps" },
      { l: "Диафрагма", v: "f/2.8 – f/11" },
      { l: "Время полёта", v: "42 мин" },
      { l: "HDR видео", v: "Да" },
      { l: "Стабилизатор", v: "3-осевой" },
    ],
    payload: ["Объектив 25 мм FF", "ND-фильтры", "Полярный фильтр"],
    tasks: ["Коммерческая съемка", "Кино и реклама", "Туристический контент"],
    count: 2,
  },
  {
    name: "Квадрокоптер FPV Custom",
    category: "Специальные задачи",
    badge: "Custom",
    badgeColor: "bg-red-600",
    desc: "Собственная разработка для специфических задач — работа в узких пространствах, ретрансляция, разведка в условиях ограниченной видимости. Настраивается под конкретную задачу.",
    specs: [
      { l: "Размах рамы", v: "250 мм" },
      { l: "Скорость", v: "до 120 км/ч" },
      { l: "Время полёта", v: "12 мин" },
      { l: "Задержка видео", v: "≤20 мс" },
      { l: "Ночная съемка", v: "Да" },
      { l: "Нагрузка", v: "0.4 кг" },
    ],
    payload: ["FPV-камера Caddx", "ИК-прожектор", "Мини-тепловизор"],
    tasks: ["FPV-видеосъемка", "Работа в помещениях", "Ретрансляция связи"],
    count: 2,
  },
];

const equipment = [
  { name: "RTK-приёмники Trimble R12i", qty: "4 ед.", desc: "Наземные контрольные точки с точностью 3 мм." },
  { name: "Планшеты DJI RC Plus", qty: "6 ед.", desc: "Управление с ярким дисплеем под прямым солнцем." },
  { name: "Agisoft Metashape Professional", qty: "Лицензия", desc: "Фотограмметрическая обработка данных." },
  { name: "Тепловизоры FLIR T540", qty: "2 ед.", desc: "Наземный контроль при тепловизионной инспекции." },
  { name: "Сервер обработки данных", qty: "1 ед.", desc: "32-ядерный рабочий сервер для быстрой обработки больших датасетов." },
];

export function FleetPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">Флот и оборудование</p>
          <h1 className="text-7xl lg:text-[9rem] font-medium tracking-tighter text-white leading-[0.85] mb-10">
            15 единиц<br />техники
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
            Профессиональный флот БПЛА для аэрофотосъемки, картографии, инспекции и агромониторинга.
            Все воздушные суда застрахованы и сертифицированы.
          </p>
        </div>
      </section>

      {/* Drones */}
      <section className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-16">Воздушные суда</h2>
          <div className="space-y-8">
            {drones.map((drone, i) => (
              <div key={i} className="border border-slate-200 overflow-hidden">
                <div className="p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left: info */}
                    <div className="lg:w-2/3">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`${drone.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
                          {drone.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{drone.category}</span>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest ml-auto">× {drone.count} в наличии</span>
                      </div>
                      <h3 className="text-3xl font-bold text-slate-950 tracking-tight mb-4">{drone.name}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed mb-6 max-w-xl">{drone.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {drone.tasks.map((t) => (
                          <span key={t} className="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Right: specs */}
                    <div className="lg:w-1/3">
                      <div className="bg-slate-50 p-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Характеристики</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {drone.specs.map((s, j) => (
                            <div key={j} className="border-b border-slate-200 pb-3">
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.l}</div>
                              <div className="text-sm font-bold text-slate-950 mt-0.5">{s.v}</div>
                            </div>
                          ))}
                        </div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-6 mb-3">Нагрузка / сенсоры</h4>
                        {drone.payload.map((p) => (
                          <div key={p} className="text-sm text-slate-600 font-medium py-1 border-b border-slate-100 last:border-0">
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ground equipment */}
      <section className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-16">Наземное оборудование</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((eq, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-950">{eq.name}</h3>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded ml-3 flex-shrink-0">{eq.qty}</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">{eq.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">Нужно специальное оборудование?</h2>
            <p className="text-slate-400 text-lg font-medium">Расскажите о задаче — подберём оптимальное решение из нашего арсенала.</p>
          </div>
          <Link to="/contacts" className="flex-shrink-0 px-10 py-5 bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-500 transition-colors">
            Обсудить задачу
          </Link>
        </div>
      </section>
    </>
  );
}
