"use client";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <motion.div
      className="max-w-5xl py-16 mt-40 md:pl-20 md:w-full max-md:mx-4 md:mx-auto flex flex-col md:flex-row max-md:gap-6 items-center justify-between text-left bg-[linear-gradient(135deg,_var(--navy-blue),_#4f8ff6)] rounded-[28px] p-6 text-white shadow-[0_20px_40px_rgba(59,130,246,0.25)]"
      initial={{ y: 150, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
    >
      <div>
        <motion.h1
          className="text-4xl md:text-[46px] md:leading-15 font-semibold text-white"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          Ready to Find Your Next Resource?
        </motion.h1>
        <motion.p
          className="text-white/90 text-lg"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 70, mass: 1 }}
        >
          Discover lecture notes and course materials in one convenient place.
        </motion.p>
      </div>
      <motion.button
        onClick={() => navigate("/student")}
        className="px-12 py-3 text-[var(--body-text)] bg-white hover:bg-[var(--page-bg)] rounded-full text-sm mt-4 shadow-[0_8px_20px_rgba(183,198,255,0.2)]"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        Explore Resources
      </motion.button>
    </motion.div>
  );
}
