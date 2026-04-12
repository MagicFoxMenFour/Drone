import { useState } from "react";
import { Link } from "react-router";

const packages = [
  {
    name: "Базовый полёт",
    price: "49 900 ₽",
    desc: "Для разовых задач: рекламной съемки, проверки объекта или быстрой оценки территории.",
    features: [
      "2 часа лётного времени",
      "Аэрофотосъемка до 5 км²",
      "RAW-исходники в полном разрешении",
      "Базовый монтаж видео (до 3 мин)",
      "Согласование полётов включено",
      "Срок — 24 часа после съемки",
    ],
    notIncluded: ["3D-модель", "Тепловизор", "Ортофотоплан"],
    cta: "Выбрать",
    highlighted: false,
  },
  {
    name: "Профессиональный",
    price: "149 900 ₽",
    desc: "Комплексный пакет для строительства, инспекции и геодезических изысканий.",
    features: [
      "До 8 часов лётного времени",
      "Аэрофотосъемка до 50 км²",
      "3D-модель рельефа / объекта",
      "Ортофотоплан 1:500",
      "Тепловизионная съемка",
      "Технический отчёт с паспортом точности",
      "Передача данных в AutoCAD, GIS",
    ],
    notIncluded: ["LiDAR-сканирование"],
    cta: "Выбрать",
    highlighted: true,
  },
  {
    name: "Промышленный",
    price: "по запросу",
    desc: "Для масштабных проектов: картографирование больших площадей, сезонный агромониторинг, системы патрулирования.",
    features: [
      "Неограниченное лётное время",
      "Площадь от 100 км²",
      "LiDAR-сканирование",
      "Мультиспектральный анализ",
      "Интеграция с корпоративными ГИС",
      "Выделенный менеджер проекта",
      "Регулярные отчёты по расписанию",
      "SLA: готовность за 48 ч",
    ],
    notIncluded: [],
    cta: "Обсудить",
    highlighted: false,
  },
];

const serviceRates = [
  { service: "Аэрофотосъемка", unit: "час", price: "12 000 ₽" },
  { service: "3D-картография (до 5 км²)", unit: "объект", price: "45 000 ₽" },
  { service: "Ортофотоплан 1:500", unit: "км²", price: "8 000 ₽" },
  { service: "LiDAR-сканирование", unit: "км²", price: "25 000 ₽" },
  { service: "Тепловизионная съемка", unit: "час", price: "18 000 ₽" },
  { service: "Инспекция ЛЭП", unit: "км", price: "3 500 ₽" },
  { service: "Агромониторинг (NDVI)", unit: "га", price: "800 ₽" },
  { service: "Видеомонтаж (до 5 мин)", unit: "ролик", price: "15 000 ₽" },
  { service: "Технический отчёт", unit: "объект", price: "20 000 ₽" },
];

const calcServices = [
  { id: "photo", label: "Аэрофотосъемка", basePrice: 12000 },
  { id: "mapping", label: "3D-картография", basePrice: 45000 },
  { id: "inspection", label: "Инспекция объектов", basePrice: 18000 },
  { id: "agro", label: "Агромониторинг", basePrice: 800 },
  { id: "thermal", label: "Тепловизионная съемка", basePrice: 18000 },
];

const regions = [
  { id: "stavropol", label: "Ставропольский край", mult: 1.0 },
  { id: "dagestan", label: "Дагестан", mult: 1.15 },
  { id: "kbr", label: "КБР", mult: 1.1 },
  { id: "kch", label: "КЧР", mult: 1.1 },
  { id: "ingush", label: "Ингушетия / Чечня", mult: 1.2 },
  { id: "other", label: "Другой регион", mult: 1.3 },
];

export function PricingPage() {
  const [serviceId, setServiceId] = useState("photo");
  const [area, setArea] = useState(10);
  const [regionId, setRegionId] = useState("stavropol");
  const [urgent, setUrgent] = useState(false);
  const [report, setReport] = useState(false);

  const selectedService = calcServices.find((s) => s.id === serviceId)!;
  const selectedRegion = regions.find((r) => r.id === regionId)!;

  let price = selectedService.basePrice;
  if (serviceId === "agro") {
    price = selectedService.basePrice * area;
  } else if (serviceId === "mapping") {
    price = selectedService.basePrice + (area > 5 ? (area - 5) * 8000 : 0);
  } else {
    price = selectedService.basePrice * Math.max(1, Math.ceil(area / 5));
  }
  price *= selectedRegion.mult;
  if (urgent) price *= 1.5;
  if (report) price += 20000;
  price = Math.round(price / 1000) * 1000;

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">Стоимость услуг</p>
          <h1 className="text-7xl lg:text-[9rem] font-medium tracking-tighter text-slate-950 leading-[0.85] mb-10">
            Цены
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            Прозрачное ценообразование без скрытых платежей. Согласование полётов и выезд по СКФО — включены во все пакеты.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-16">Пакеты</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative border p-10 flex flex-col ${
                  pkg.highlighted
                    ? "bg-slate-950 border-slate-950 text-white"
                    : "bg-white border-slate-200"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-10">
                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                      Популярный
                    </span>
                  </div>
                )}
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${pkg.highlighted ? "text-blue-400" : "text-slate-400"}`}>
                  {pkg.name}
                </p>
                <div className={`text-5xl font-bold tracking-tighter mb-6 ${pkg.highlighted ? "text-white" : "text-slate-950"}`}>
                  {pkg.price}
                </div>
                <p className={`text-sm font-medium leading-relaxed mb-8 ${pkg.highlighted ? "text-slate-400" : "text-slate-500"}`}>
                  {pkg.desc}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-green-400 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6l3 3 5-5"/>
                        </svg>
                      </div>
                      <span className={`text-sm font-medium ${pkg.highlighted ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                    </li>
                  ))}
                  {pkg.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-3 opacity-40">
                      <div className="w-5 h-5 rounded-full bg-slate-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-slate-400 fill-none" strokeWidth="2" strokeLinecap="round">
                          <path d="M3 3l6 6M9 3l-6 6"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-500">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacts"
                  className={`block w-full py-4 rounded-full font-bold text-center transition-all ${
                    pkg.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "bg-slate-950 text-white hover:bg-blue-600"
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-white py-24 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-6">Калькулятор стоимости</h2>
              <p className="text-lg text-slate-500 font-medium mb-12">Получите приблизительную оценку стоимости вашего проекта. Точный расчёт — после обсуждения с менеджером.</p>

              <div className="space-y-8">
                {/* Service */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Услуга</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {calcServices.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={`py-3 px-4 border text-sm font-bold transition-all text-left ${
                          serviceId === s.id
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 text-slate-600 hover:border-slate-400"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Площадь объекта: <span className="text-slate-950">{area} {serviceId === "agro" ? "га" : "км²"}</span>
                  </label>
                  <input
                    type="range"
                    min={serviceId === "agro" ? 50 : 1}
                    max={serviceId === "agro" ? 10000 : 200}
                    step={serviceId === "agro" ? 50 : 1}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>{serviceId === "agro" ? "50 га" : "1 км²"}</span>
                    <span>{serviceId === "agro" ? "10 000 га" : "200 км²"}</span>
                  </div>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Регион</label>
                  <select
                    value={regionId}
                    onChange={(e) => setRegionId(e.target.value)}
                    className="w-full border border-slate-200 px-4 py-3 text-sm font-medium text-slate-950 focus:outline-none focus:border-blue-600"
                  >
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Дополнительно</label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm font-medium text-slate-700">Срочное выполнение (×1.5, готовность за 12 ч)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={report} onChange={(e) => setReport(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm font-medium text-slate-700">Технический отчёт с паспортом точности (+20 000 ₽)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="lg:sticky lg:top-32">
              <div className="bg-slate-950 p-10">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Предварительная оценка</p>
                <div className="text-6xl font-bold text-white tracking-tighter mb-2">
                  {price.toLocaleString("ru")} ₽
                </div>
                <p className="text-slate-500 text-sm font-medium mb-10">
                  Окончательная стоимость уточняется менеджером после получения ТЗ.
                </p>
                <div className="space-y-3 border-t border-white/10 pt-8 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-medium">Услуга</span>
                    <span className="text-white font-bold">{selectedService.label}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-medium">Площадь</span>
                    <span className="text-white font-bold">{area} {serviceId === "agro" ? "га" : "км²"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-medium">Регион</span>
                    <span className="text-white font-bold">{selectedRegion.label}</span>
                  </div>
                  {urgent && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400 font-medium">Срочность</span>
                      <span className="text-amber-400 font-bold">×1.5</span>
                    </div>
                  )}
                </div>
                <Link to="/contacts" className="block w-full py-5 bg-blue-600 text-white font-bold rounded-full text-center hover:bg-blue-500 transition-colors">
                  Получить точный расчёт
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rates table */}
      <section className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-16">Прайс-лист</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-950">
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-widest pb-4">Услуга</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-widest pb-4">Единица</th>
                  <th className="text-right text-xs font-bold text-slate-400 uppercase tracking-widest pb-4">Стоимость</th>
                </tr>
              </thead>
              <tbody>
                {serviceRates.map((r, i) => (
                  <tr key={i} className="border-b border-slate-200">
                    <td className="py-5 text-slate-950 font-medium">{r.service}</td>
                    <td className="py-5 text-slate-400 font-medium">{r.unit}</td>
                    <td className="py-5 text-right font-bold text-slate-950">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-sm font-medium mt-6">
            * Стоимость указана без учёта командировочных расходов за пределы Ставропольского края.
            Поправочные коэффициенты: Дагестан +15%, КБР/КЧР +10%, Ингушетия/Чечня +20%.
          </p>
        </div>
      </section>
    </>
  );
}
