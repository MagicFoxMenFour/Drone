import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";


const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // ← заменить
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // ← заменить
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // ← заменить


const faqs = [
  { q: "Как заказать разработку ПО?", a: "Оставьте заявку или напишите на почту. В течение 2 часов свяжемся, уточним платформу, стек и сроки этапов." },
  { q: "Работаете ли удалённо?", a: "Да. Часть задач ведём полностью удалённо; для интеграции на железе возможны выезды или работа на вашей площадке." },
  { q: "Что нужно для SMT-монтажа?", a: "Gerber, BOM и требования к тестированию. Проверяем комплектацию и технологичность перед запуском в производство." },
  { q: "Как быстро получу результат?", a: "Сроки зависят от объёма: для монтажа — после согласования материалов; для ПО — по дорожной карте в ТЗ." },
  { q: "Есть ли тестирование плат?", a: "Да. Каждая плата проходит согласованный функциональный тест; по запросу расширяем программу проверок." },
  { q: "Каков минимальный заказ?", a: "Для монтажа — от одной платы для прототипа. Для ПО — обсуждаем по постановке задачи и пилотному этапу." },
];


const MAP_LAT = 45.0371;
const MAP_LNG = 41.9504;

export function ContactsPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_phone: form.phone,
          from_email: form.email,
          service:    form.service || "Не указано",
          message:    form.message,
          to_email:   "fsamoilov@ncfu.ru",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    let map: import("leaflet").Map | null = null;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;
      if ((mapRef.current as HTMLDivElement & { _leaflet_id?: number })._leaflet_id) return;

      map = L.map(mapRef.current, {
        center: [MAP_LAT, MAP_LNG],
        zoom: 15,
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        html: `<div style="width:36px;height:36px;background:#2563eb;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:4px solid white;box-shadow:0 4px 14px rgba(37,99,235,0.6)"></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        className: "",
      });

      L.marker([MAP_LAT, MAP_LNG], { icon })
        .addTo(map)
        .bindPopup("<strong>Drone</strong><br>пр. Кулакова 2, Ставрополь")
        .openPopup();
    });

    return () => { map?.remove(); };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">Связаться с нами</p>
          <h1 className="text-7xl lg:text-[9rem] font-medium tracking-tighter text-slate-950 leading-[0.85]">
            Контакты
          </h1>
        </div>
      </section>

      {/* Contact blocks + form */}
      <section className="bg-white py-24 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left: contact cards */}
            <div>
              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                {/* Phone */}
                <div className="bg-slate-50 border border-slate-200 p-7">
                  <div className="text-3xl mb-4">📞</div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Телефон</h3>
                  <a href="tel:+79187472170" className="text-xl font-bold text-slate-950 hover:text-blue-600 transition-colors block">
                    8-918-747-21-70
                  </a>
                  <p className="text-slate-400 text-sm font-medium mt-1">Филипп · Пн–Пт 9–18</p>
                </div>
                {/* Email */}
                <div className="bg-slate-50 border border-slate-200 p-7">
                  <div className="text-3xl mb-4">✉️</div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</h3>
                  <a href="mailto:fsamoilov@ncfu.ru" className="text-lg font-bold text-slate-950 hover:text-blue-600 transition-colors break-all block">
                    fsamoilov@ncfu.ru
                  </a>
                  <p className="text-slate-400 text-sm font-medium mt-1">Ответим за 2 часа</p>
                </div>
                {/* Address */}
                <div className="bg-slate-50 border border-slate-200 p-7">
                  <div className="text-3xl mb-4">📍</div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Адрес</h3>
                  <p className="font-bold text-slate-950">пр. Кулакова 2</p>
                  <p className="text-slate-600 font-medium">Ставрополь</p>
                  <p className="text-slate-400 text-sm font-medium mt-1">Ставропольский край</p>
                </div>
                {/* Messengers */}
                <div className="bg-slate-50 border border-slate-200 p-7">
                  <div className="text-3xl mb-4">💬</div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Мессенджеры</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <a href="https://t.me/fsamoilov" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-full hover:bg-blue-600 transition-colors w-fit">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                      @fsamoilov
                    </a>
                    <a href="https://wa.me/79187472170" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full hover:bg-green-600 transition-colors w-fit">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                      8-918-747-21-70
                    </a>
                  </div>
                </div>
              </div>
              {/* Responsible */}
              <div className="bg-blue-50 border border-blue-100 p-7">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Контактные лица</h3>
                <p className="text-xl font-bold text-slate-950">Самойлов Филипп Владимирович</p>
                <p className="text-slate-500 font-medium mt-1">Пре-проектная аналитика и разработка</p>
                <div className="border-t border-blue-200/50 mt-4 pt-4">
                  <p className="text-base font-bold text-slate-950">Новикова Елена Николаевна</p>
                  <p className="text-slate-500 font-medium">Экспертиза и управление проектами</p>
                  <a href="mailto:ekosova@ncfu.ru" className="text-sm text-blue-600 font-medium hover:underline">ekosova@ncfu.ru</a>
                  <span className="text-slate-400 mx-2">·</span>
                  <a href="tel:+79624594594" className="text-sm text-blue-600 font-medium hover:underline">+7 962 459 4594</a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-4xl font-bold text-slate-950 tracking-tight mb-8">Оставить заявку</h2>

              {status === "sent" ? (
                <div className="bg-green-50 border border-green-200 p-10 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Заявка отправлена!</h3>
                  <p className="text-green-700 font-medium">Мы получили ваше сообщение и свяжемся в течение 2 часов.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Имя *</label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full border border-slate-200 px-4 py-3 text-slate-950 font-medium focus:outline-none focus:border-blue-600 placeholder:text-slate-300" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Телефон *</label>
                      <input type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+7 (988) 000-00-00"
                        className="w-full border border-slate-200 px-4 py-3 text-slate-950 font-medium focus:outline-none focus:border-blue-600 placeholder:text-slate-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                    <input type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.ru"
                      className="w-full border border-slate-200 px-4 py-3 text-slate-950 font-medium focus:outline-none focus:border-blue-600 placeholder:text-slate-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Услуга</label>
                    <select value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-slate-200 px-4 py-3 text-slate-950 font-medium focus:outline-none focus:border-blue-600">
                      <option value="">Выберите услугу</option>
                      <option>Разработка ПО для робототехнических систем</option>
                      <option>Монтаж печатных плат</option>
                      <option>Другое</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Опишите задачу</label>
                    <textarea rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Площадь объекта, регион, сроки, особые требования..."
                      className="w-full border border-slate-200 px-4 py-3 text-slate-950 font-medium focus:outline-none focus:border-blue-600 placeholder:text-slate-300 resize-none" />
                  </div>

                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">
                      Ошибка отправки. Напишите нам напрямую: fsamoilov@ncfu.ru
                    </div>
                  )}

                  <button type="submit" disabled={status === "sending"}
                    className="w-full py-5 bg-slate-950 text-white font-bold rounded-full hover:bg-blue-600 transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === "sending" ? "Отправляю..." : "Отправить заявку"}
                  </button>
                  <p className="text-xs text-slate-400 text-center font-medium">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map — Ставрополь, пр. Кулакова 2 */}
      <section className="bg-white border-b border-slate-200">
        <div
          ref={mapRef}
          className="w-full h-[420px]"
          style={{ filter: "invert(1) hue-rotate(200deg) saturate(0.6) brightness(0.5)" }}
        />
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-5xl font-bold text-slate-950 tracking-tight mb-16">Частые вопросы</h2>
          <div className="max-w-3xl border-t border-slate-200">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-slate-200 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="py-8 flex justify-between items-center">
                  <span className="text-xl font-bold text-slate-900 pr-8">{f.q}</span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xl transition-all flex-shrink-0 ${openFaq === i ? "bg-blue-600 text-white rotate-45" : "bg-white border border-slate-200"}`}>
                    +
                  </div>
                </div>
                {openFaq === i && (
                  <div className="pb-8">
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
