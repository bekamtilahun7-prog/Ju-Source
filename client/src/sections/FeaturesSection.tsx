"use client";
import SectionTitle from "../components/SectionTitle";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { featuresData } from "../data/features";
import type { IFeature } from "../types";

export default function FeaturesSection() {
  return (
    <div id="features" className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text2="Everything You Need to Study Smarter"
        text1="Why Choose Us?"
        text3="Discover a simpler way to find, access, and organize your university learning resources."
      />

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-16 px-6">
        {featuresData.map((feature: IFeature, index: number) => (
          <motion.div
            key={index}
            className={`${index === 1 ? "p-px rounded-[13px] bg-linear-to-br from-[var(--navy-blue)] to-[var(--border)]" : ""}`}
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <div className="p-6 rounded-xl space-y-4 border border-[var(--border)] bg-[var(--card-bg)] max-w-80 w-full shadow-[0_12px_28px_rgba(59,130,246,0.08)]">
              <img src={feature.icon} alt={feature.title} />
              <h3 className="text-base font-medium text-[var(--card-heading)]">
                {feature.title}
              </h3>
              <p className="text-[var(--muted-text)] line-clamp-2 pb-4">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-40 relative mx-auto max-w-5xl">
        <div className="absolute -z-50 size-100 -top-10 -left-20 aspect-square rounded-full bg-[var(--navy-blue)]/20 blur-3xl"></div>
        <motion.p
          className="text-[var(--body-text)] text-lg text-left max-w-3xl"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          Find the right academic materials faster. Explore resources organized
          by Jimma University, all in one place.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
          <motion.div
            className="md:col-span-2"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 70,
              mass: 1,
            }}
          >
            <img
              className="h-full w-auto border-2 border-navy-500 rounded-2xl"
              src="/assets/features-showcase-1.png"
              alt="features showcase"
              width={1000}
              height={500}
            />
          </motion.div>
          <motion.div
            className="md:col-span-1"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <img
              src="/assets/features-showcase-2.png"
              alt="features showcase"
              width={1000}
              height={500}
              className="hover:-translate-y-0.5 transition duration-300"
            />
            <h3 className="text-[24px]/7.5 text-[var(--card-heading)] font-medium mt-6">
              Your First-Year Academic Resources, Just a Few Clicks Away.{" "}
            </h3>
            <p className="text-[var(--body-text)] mt-2">
              Stop wasting time searching for scattered materials. Discover
              lecture notes and course resources designed for Jimma University
              through one simple, organized platform.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
