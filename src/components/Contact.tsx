"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "khangaienkhbat2026@depauw.edu",
    href: "mailto:khangaienkhbat2026@depauw.edu",
    description: "Best way to reach me",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/khangai",
    href: "https://www.linkedin.com/in/khangai",
    description: "Let's connect professionally",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/khangaienkhbat",
    href: "https://github.com/khangaienkhbat",
    description: "See my code in action",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono tracking-widest uppercase">05.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Contact</h2>
          <div className="flex-1 h-px bg-[#122440] max-w-xs ml-2" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-14"
        >
          <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Let&apos;s build{" "}
            <span className="text-cyan-400">something</span>
            <br />
            great together.
          </h3>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            I&apos;m actively looking for full-time software engineering roles starting May 2026.
            If you&apos;re hiring, let&apos;s talk.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {contacts.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                className="group flex flex-col items-center text-center bg-[#0c1f3a] border border-[#122440] rounded-2xl p-7 hover:border-cyan-400/40 hover:bg-[#0f2847] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#071428] border border-[#1a3a5c] flex items-center justify-center mb-4 group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-all duration-300">
                  <Icon size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">{c.label}</p>
                <p className="text-sm font-semibold text-slate-300 mb-1 break-all">{c.value}</p>
                <p className="text-xs text-slate-500 mb-3">{c.description}</p>
                <ArrowUpRight
                  size={14}
                  className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </motion.a>
            );
          })}
        </div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="mailto:khangaienkhbat2026@depauw.edu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-400 text-[#040d1a] font-bold text-base tracking-wide hover:bg-cyan-300 transition-all duration-200 shadow-xl shadow-cyan-400/20 hover:shadow-cyan-400/40 hover:-translate-y-0.5"
          >
            <Mail size={18} />
            Send Me an Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
