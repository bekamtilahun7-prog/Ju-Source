import type { SectionTitleProps } from "../types";
import { motion } from "motion/react";

export default function SectionTitle({
  text1,
  text2,
  text3,
}: SectionTitleProps) {
  return (
    <>
      <motion.p
        className="text-center font-medium text-[var(--navy-blue)] mt-28 px-10 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border)] shadow-[0_8px_20px_rgba(183,198,255,0.2)] w-max mx-auto"
        initial={{ y: 120, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
      >
        {text1}
      </motion.p>
      <motion.h3
        className="text-3xl font-semibold text-center mx-auto mt-4 text-[var(--heading)]"
        initial={{ y: 120, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        {text2}
      </motion.h3>
      <motion.p
        className="text-[var(--muted-text)] text-center mt-2 max-w-xl mx-auto"
        initial={{ y: 120, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
      >
        {text3}
      </motion.p>
    </>
  );
}
