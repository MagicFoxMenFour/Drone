import { Link } from "react-router";

const packages = [
  {
    name: "Монтаж плат — старт",
    price: "от 500 ₽",
    desc: "Мелкая партия или прототип: подготовка трафарета, установка, оплавление, базовый функциональный тест.",
    features: [
      "Проверка Gerber и BOM",
      "SMT с шагом до 0.4 мм",
      "Контроль профиля пайки",
      "Функциональный тест по согласованной программе",
    ],
    notIncluded: ["Закупка компонентов без отдельного договора", "Радиоиспытания и сертификация"],
    cta: "Заказать монтаж",
    highlighted: false,
  },
  {
    name: "Разработка ПО — этап",
    price: "по запросу",
    desc: "Фиксируем этап (анализ, MVP, интеграция, сдача) и критерии приёмки: код, документация, демо на вашем стенде.",
    features: [
      "Архитектура и стек (C++/Python, ROS 2 при необходимости)",
      "Репозиторий и история изменений",
      "План тестов и отчёт по итогам этапа",
      "Передача исходников и сборочных инструкций",
    ],
    notIncluded: ["Бессрочная поддержка без SLA", "Лицензии стороннего ПО заказчика"],
    cta: "Обсудить ТЗ",
    highlighted: true,
  },
  {
    name: "Комплекс «железо + софт»",
    price: "индивидуально",
    desc: "Собираем партию плат, прошиваем, отлаживаем взаимодействие с вашим или нашим ПО до приёмочных испытаний.",
    features: [
      "Единый график монтажа и разработки",
      "Совместная отладка на стенде",
      "Пакет документов для внутреннего аудита",
    ],
    notIncluded: [],
    cta: "Запросить КП",
    highlighted: false,
  },
];

const serviceRates = [
  { service: "Монтаж печатной платы (типовая, от)", unit: "плата", price: "500 ₽" },
  { service: "Разработка ПО для робототехники", unit: "проект", price: "по запросу" },
  { service: "Настройка тестового стенда под партию", unit: "партия", price: "по запросу" },
  { service: "Срочный запуск монтажа (коэффициент)", unit: "заказ", price: "×1.3–1.5" },
];

export function PricingPage() {
  return (
    <>
      <section className="pt-40 pb-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">Стоимость услуг</p>
          <h1 className="text-7xl lg:text-[9rem] font-medium tracking-tighter text-slate-950 leading-[0.85] mb-10">
            Цены
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            Ориентиры по монтажу плат и формату работ в разработке ПО. Итоговая смета — после согласования ТЗ, объёма партии и требований к тестам.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-16">Пакеты</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative border p-10 flex flex-col ${
                  pkg.highlighted ? "bg-slate-950 border-slate-950 text-white" : "bg-white border-slate-200"
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
                <div className={`text-5xl font-bold tracking-tighter mb-6 break-words ${pkg.highlighted ? "text-white" : "text-slate-950"}`}>
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
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      </div>
                      <span className={`text-sm font-medium ${pkg.highlighted ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                    </li>
                  ))}
                  {pkg.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-3 opacity-40">
                      <div className="w-5 h-5 rounded-full bg-slate-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-slate-400 fill-none" strokeWidth="2" strokeLinecap="round">
                          <path d="M3 3l6 6M9 3l-6 6" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-500">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacts"
                  className={`block w-full py-4 rounded-full font-bold text-center transition-all ${
                    pkg.highlighted ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-slate-950 text-white hover:bg-blue-600"
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight mb-6">Как считаем</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-6">
                Для монтажа — по сложности платы, количеству сторон, тиражу и глубине теста. Для ПО — по этапам и составу команды; фиксируем результат каждого этапа в акте или отчёте.
              </p>
              <Link
                to="/contacts"
                className="inline-block px-10 py-5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-colors"
              >
                Получить расчёт
              </Link>
            </div>
            <div className="bg-slate-950 p-10 text-white">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Кратко</p>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li>Монтаж: от 500 ₽ за плату при типовой сложности; точная цена после аудита файлов.</li>
                <li>ПО: оценка по дорожной карте; изменения сверх ТЗ — отдельными соглашениями.</li>
                <li>Срочность и нестандартные компоненты согласуются до запуска в работу.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
            Актуальные условия и скидки на серию — в коммерческом предложении после получения исходных данных.
          </p>
        </div>
      </section>
    </>
  );
}
