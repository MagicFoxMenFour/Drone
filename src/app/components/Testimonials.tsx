import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";

const reviews = [
  {
    name: "Алексей Воронов",
    role: "Технический директор, ООО «Электростройсервис»",
    text: "Заказали партию из 300 плат с шагом 0.4 мм — срок 15 дней, ноль брака на приёмке. Отдельно отметили регистрацию температурного профиля и отчёт по тестам.",
    rating: 5,
    initials: "АВ",
    color: "bg-red-600",
  },
  {
    name: "Дмитрий Орлов",
    role: "Руководитель направления БАС",
    text: "Нужна была стабильная связь и видео по 4G для управления вне прямой видимости. Собрали стенд, отладили приоритет команд над потоком — в проде работает предсказуемо.",
    rating: 5,
    initials: "ДО",
    color: "bg-blue-600",
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4 fill-amber-400" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1l1.854 3.756L14 5.528l-3 2.924.708 4.124L8 10.556l-3.708 1.02L5 7.452 2 4.528l4.146-.772z"/>
    </svg>
  );
}

function Card({ review, i }: { review: typeof reviews[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="bg-white border border-slate-100 p-8 shadow-sm hover:shadow-lg transition-shadow flex-shrink-0 w-[320px] lg:w-auto"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, j) => <StarIcon key={j} />)}
      </div>
      <p className="text-slate-700 font-medium leading-relaxed mb-6 text-sm lg:text-base">"{review.text}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
          {review.initials}
        </div>
        <div>
          <div className="font-bold text-slate-950 text-sm">{review.name}</div>
          <div className="text-xs text-slate-400 font-medium">{review.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="py-32 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Клиенты о нас</p>
          <h2 className="text-7xl lg:text-[8rem] font-medium tracking-tighter text-slate-950 leading-[0.9]">
            Отзывы
          </h2>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-2 gap-6 max-w-4xl">
          {reviews.map((r, i) => <Card key={i} review={r} i={i} />)}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="flex lg:hidden gap-4 overflow-x-auto pb-6 no-scrollbar">
          {reviews.map((r, i) => <Card key={i} review={r} i={i} />)}
        </div>
      </div>
    </section>
  );
}
