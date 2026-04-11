import { useState } from "react";

export function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-[#0A0A1B] py-40 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-r from-purple-600 via-blue-500 to-sky-400 opacity-50 blur-[100px]" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 text-center">
        <h2 className="text-[10vw] lg:text-[12rem] font-medium tracking-tighter text-white leading-none mb-20">
          Начнём <br /> проект?
        </h2>

        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="px-20 py-8 bg-white text-[#0A0A1B] rounded-full text-3xl font-bold hover:scale-105 transition-transform shadow-2xl"
          >
            Оставить заявку
          </button>
        )}

        {showForm && !submitted && (
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-lg bg-white/10 backdrop-blur-md rounded-2xl p-8 text-left flex flex-col gap-4"
            aria-label="Форма заявки"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="contact-name" className="text-white/70 text-sm font-bold uppercase tracking-widest">Имя</label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400"
                placeholder="Ваше имя"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="contact-phone" className="text-white/70 text-sm font-bold uppercase tracking-widest">Телефон</label>
              <input
                id="contact-phone"
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="contact-message" className="text-white/70 text-sm font-bold uppercase tracking-widest">Сообщение</label>
              <textarea
                id="contact-message"
                rows={3}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 resize-none"
                placeholder="Опишите ваш проект"
              />
            </div>
            <button
              type="submit"
              className="mt-2 py-4 bg-white text-[#0A0A1B] rounded-full font-bold text-lg hover:scale-105 transition-transform"
            >
              Отправить заявку
            </button>
          </form>
        )}

        {submitted && (
          <div className="mx-auto max-w-lg text-center py-12">
            <p className="text-4xl font-bold text-white mb-4">Спасибо!</p>
            <p className="text-white/60 text-xl">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        )}

        <div className="mt-40 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between text-white/40 font-bold uppercase tracking-widest text-xs">
          <div>Email: info@dronesolutions.ru</div>
          <div>Тел: +7 (928) 000-00-00 · Ставрополь, СКФО</div>
        </div>
      </div>
    </section>
  );
}