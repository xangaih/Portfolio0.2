"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Rayca Precision",
    role: "Software Engineer Intern",
    period: "Nov 2024 — Feb 2025",
    location: "San Francisco, CA",
    highlight: "Cut manual workflows by 35% · Improved system reliability by 30%",
    tags: ["Python", "REST APIs", "pytest", "CI/CD", "Unix/Linux"],
  },
  {
    company: "TechPoint",
    role: "Xplore Program · Software Engineer",
    period: "Jun 2024 — Jul 2024",
    location: "Indianapolis, IN",
    highlight: "Boosted engagement 40% · Cut release cycles by 25%",
    tags: ["JavaScript", "Python", "Git", "CI/CD", "Agile"],
  },
  {
    company: "Digital Consulting LLC",
    role: "Software Engineer Intern",
    period: "Nov 2021 — Jan 2022",
    location: "Remote",
    highlight: "Improved throughput by 28% · Reduced system overhead by 22%",
    tags: ["Python", "C++", "SQL", "PostgreSQL", "MongoDB"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-28 px-6 bg-[#071428]/50">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono tracking-widest uppercase">02.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Experience</h2>
          <div className="flex-1 h-px bg-[#122440] max-w-xs ml-2" />
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[#122440] hidden sm:block" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-3.5 top-5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#040d1a] shadow-lg shadow-cyan-400/30 hidden sm:block" />

                <div className="group bg-[#0c1f3a] border border-[#122440] rounded-2xl p-6 sm:p-8 hover:border-cyan-400/35 hover:bg-[#0e2340] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={15} className="text-cyan-400" />
                        <span className="text-xs text-cyan-400 font-semibold tracking-wide uppercase">
                          {exp.company}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5 font-medium">
                    {exp.highlight}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-md bg-[#071428] border border-[#1a3a5c] text-slate-400 group-hover:border-cyan-400/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
