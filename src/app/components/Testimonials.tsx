import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";

const reviews = [
  {
    name: "Руслан Хасанов",
    role: "Главный агроном, СПК «Нива Ставрополья»",
    text: "Мультиспектральная съёмка помогла выявить стресс-зоны на пшеничных полях ещё до появления видимых признаков болезни. Урожай вырос на 19%, расход воды снизился на треть.",
    rating: 5,
    initials: "РХ",
    color: "bg-green-600",
  },
  {
    name: "Заур Гусейнов",
    role: "Технический директор, «ДагЭнерго»",
    text: "Инспекция 360 км ЛЭП в горных районах Дагестана заняла 5 дней. Бригада сделала бы это за 6 недель с риском для людей. Нашли 247 дефектов изоляторов.",
    rating: 5,
    initials: "ЗГ",
    color: "bg-amber-600",
  },
  {
    name: "Тамара Бекова",
    role: "Директор, ООО «КавказСтрой», Нальчик",
    text: "3D-модель горного участка под застройку получили за 2 дня. Геодезисты оценивали работу в 4 недели и в 5 раз дороже. Теперь заказываем съёмку на каждый объект.",
    rating: 5,
    initials: "ТБ",
    color: "bg-blue-600",
  },
  {
    name: "Магомед Алиев",
    role: "Начальник службы мониторинга, «КаспийПорт»",
    text: "Патрулирование акватории сократило время реакции на загрязнения с 5 часов до 22 минут. За первый месяц предотвратили два экологических инцидента.",
    rating: 5,
    initials: "МА",
    color: "bg-cyan-600",
  },
  {
    name: "Виктория Ермоленко",
    role: "Коммерческий директор, Devland Кавказ",
    text: "Аэросъёмка нашего ЖК в предгорьях КЧР выглядит кинематографично. Продажи выросли на 26% — клиенты говорили, что именно видео убедило их прийти на показ.",
    rating: 5,
    initials: "ВЕ",
    color: "bg-purple-600",
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
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((r, i) => <Card key={i} review={r} i={i} />)}
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-6 mt-6 max-w-[67%]">
          {reviews.slice(3).map((r, i) => <Card key={i} review={r} i={i + 3} />)}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="flex lg:hidden gap-4 overflow-x-auto pb-6 no-scrollbar">
          {reviews.map((r, i) => <Card key={i} review={r} i={i} />)}
        </div>
      </div>
    </section>
  );
}
