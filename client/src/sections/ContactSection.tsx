"use client";
import SectionTitle from "../components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  return (
    <div id="contact" className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text1="GET IN TOUCH"
        text2="We'd Love to Hear From You"
        text3="Have a question, feedback, or a problem accessing academic resources? Send us a message."
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-[var(--body-text)] mt-16 w-full"
      >
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          <p className="mb-2 font-medium text-[var(--heading)]">Your name</p>
          <div className="flex items-center pl-3 rounded-xl border border-[var(--border)] bg-[var(--page-bg)] shadow-[0_8px_20px_rgba(59,130,246,0.05)] focus-within:border-[var(--navy-blue)] focus-within:ring-2 focus-within:ring-[var(--navy-blue)]/20">
            <UserIcon className="size-5 text-[var(--navy-blue)]" />
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3.5 outline-none bg-transparent text-[var(--body-text)] placeholder:text-[var(--muted-text)]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          <p className="mb-2 font-medium text-[var(--heading)]">Email id</p>
          <div className="flex items-center pl-3 rounded-xl border border-[var(--border)] bg-[var(--page-bg)] shadow-[0_8px_20px_rgba(59,130,246,0.05)] focus-within:border-[var(--navy-blue)] focus-within:ring-2 focus-within:ring-[var(--navy-blue)]/20">
            <MailIcon className="size-5 text-[var(--navy-blue)]" />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3.5 outline-none bg-transparent text-[var(--body-text)] placeholder:text-[var(--muted-text)]"
            />
          </div>
        </motion.div>

        <motion.div
          className="sm:col-span-2"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
        >
          <p className="mb-2 font-medium text-[var(--heading)]">Message</p>
          <textarea
            name="message"
            rows={8}
            placeholder="Enter your message"
            className="focus:border-[var(--navy-blue)] focus:ring-2 focus:ring-[var(--navy-blue)]/20 resize-none w-full p-3.5 outline-none rounded-xl border border-[var(--border)] bg-[var(--page-bg)] text-[var(--body-text)] placeholder:text-[var(--muted-text)] shadow-[0_8px_20px_rgba(59,130,246,0.05)]"
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-max flex items-center gap-2 bg-[var(--navy-blue)] hover:brightness-110 text-white px-10 py-3 rounded-full shadow-[0_12px_28px_rgba(59,130,246,0.25)]"
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
        >
          Submit
          <ArrowRightIcon className="size-5" />
        </motion.button>
      </form>
    </div>
  );
}
