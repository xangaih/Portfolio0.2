"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Award } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "3+", label: "Years Building" },
    { value: "3", label: "Internships" },
    { value: "35%", label: "Workflow Reduction" },
    { value: "Dean's List", label: "3× Honoree" },
  ];

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-cyan-400 text-sm font-mono tracking-widest uppercase">01.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">About Me</h2>
          <div className="flex-1 h-px bg-[#122440] max-w-xs ml-2" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I&apos;m a Computer Science &amp; Data Science student at{" "}
              <span className="text-cyan-400 font-semibold">DePauw University</span>, graduating May 2026.
              I care deeply about writing software that solves real problems — the kind that ships fast, holds
              up in production, and scales.
            </p>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              Across internships at Rayca Precision and TechPoint, I&apos;ve cut manual workflows by 35%,
              improved system reliability by 30%, and shipped high-impact features end-to-end. I thrive in
              fast-moving environments where ownership and craft matter equally.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              Currently pursuing Salesforce Platform Developer I certification. Looking to join a team where I
              can grow fast, build meaningful things, and make a real dent.
            </p>

            {/* Info chips */}
            <div className="flex flex-wrap gap-3 mt-8">
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-[#0c1f3a] border border-[#122440] px-3 py-1.5 rounded-lg">
                <GraduationCap size={14} className="text-cyan-400" />
                DePauw University · CS / Data Science
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-[#0c1f3a] border border-[#122440] px-3 py-1.5 rounded-lg">
                <MapPin size={14} className="text-cyan-400" />
                Greencastle, IN
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-[#0c1f3a] border border-[#122440] px-3 py-1.5 rounded-lg">
                <Award size={14} className="text-cyan-400" />
                Salesforce Dev I (In Progress)
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="group bg-[#0c1f3a] border border-[#122440] rounded-2xl p-6 hover:border-cyan-400/40 hover:bg-[#0f2847] transition-all duration-300"
              >
                <p className="text-3xl font-bold text-cyan-400 mb-1 group-hover:glow-text transition-all">
                  {value}
                </p>
                <p className="text-sm text-slate-400">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
