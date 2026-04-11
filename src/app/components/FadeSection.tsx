import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";

interface FadeSectionProps {
  children: React.ReactNode;
  delay?: number;
}

export function FadeSection({ children, delay = 0 }: FadeSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
