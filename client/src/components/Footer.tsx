import { footerData } from "../data/footer";
import { ArrowUpRight, BookOpenText, MapPin, Mail } from "lucide-react";
import { motion } from "motion/react";
import type { IFooterLink } from "../types";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-[var(--border)] bg-[var(--page-bg)] px-4 py-12 md:px-16 lg:px-24 xl:px-32">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 70, mass: 1 }}
      >
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--navy-blue)]/10 text-[var(--navy-blue)]">
                <BookOpenText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[var(--heading)]">
                  JU-Source
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-text)]">
                  Academic Portal
                </p>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--muted-text)]">
              A unified academic hub for students and faculty to discover course
              materials, department updates, and learning resources.
            </p>
            <div className="mt-5 space-y-3 text-sm text-[var(--muted-text)]">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--navy-blue)]" />
                <span>support@ju-source.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[var(--navy-blue)]" />
                <span>Jahangirnagar University</span>
              </div>
            </div>
          </div>

          {footerData.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--heading)]">
                {section.title}
              </p>
              <ul className="mt-4 space-y-3">
                {section.links.map((link: IFooterLink, index: number) => (
                  <li key={`${section.title}-${index}`}>
                    <Link
                      to={link.href}
                      className="inline-flex items-center gap-2 text-sm text-[var(--muted-text)] transition hover:text-[var(--navy-blue)]"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted-text)] md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} JU-Source. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/" className="hover:text-[var(--navy-blue)]">
              Home
            </Link>
            <Link to="/student" className="hover:text-[var(--navy-blue)]">
              Student Portal
            </Link>
            <Link to="/head" className="hover:text-[var(--navy-blue)]">
              Department Head
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
