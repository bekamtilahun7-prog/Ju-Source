"use client";
import { CheckIcon, VideoIcon } from "lucide-react";
import TiltedImage from "../components/TiltImage";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const specialFeatures = [
    "Find Notes Faster",
    "Study Smarter",
    "Ace your exams",
  ];
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="absolute top-30 -z-10 left-1/4 size-72 bg-[var(--navy-blue)]/25 blur-[300px]"></div>
      <motion.h1
        className="text-5xl/17 md:text-6xl/21 font-medium max-w-2xl text-center mt-44 text-[var(--heading)]"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
      >
        Start Your University Journey with the Right{" "}
        <span className="move-gradient px-3 rounded-xl text-nowrap text-white">
          Resources.
        </span>
      </motion.h1>
      <motion.p
        className="text-base text-center text-[var(--muted-text)] max-w-lg mt-6"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 320,
          damping: 70,
          mass: 1,
        }}
      >
        Find lecture notes, past examination papers, and course materials in one
        place. Spend less time searching and more time learning.
      </motion.p>
      <motion.div
        className="flex items-center gap-4 mt-8"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
      >
        {/* <button
          onClick={() => navigate("/generate")}
          className="bg-[var(--navy-blue)] hover:brightness-110 text-white rounded-full px-7 h-11 shadow-[0_8px_20px_rgba(183,198,255,0.45)]"
        >
          Generate now
        </button>
        <button className="flex items-center gap-2 border border-[var(--border)] hover:bg-[var(--card-bg)] transition rounded-full px-6 h-11 text-[var(--body-text)]">
          <VideoIcon strokeWidth={1} />
          <span>Watch demo</span>
        </button> */}
      </motion.div>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-12">
        {specialFeatures.map((feature, index) => (
          <motion.p
            className="flex items-center gap-2"
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.3 }}
          >
            <CheckIcon className="size-5 text-[var(--navy-blue)]" />
            <span className="text-[var(--body-text)]">{feature}</span>
          </motion.p>
        ))}
      </div>
      <TiltedImage />
    </div>
  );
}
