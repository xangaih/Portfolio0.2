"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    label: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C++", "Java", "SQL", "Bash/Shell"],
  },
  {
    label: "AI / ML",
    skills: ["TensorFlow", "LangChain", "OpenAI API", "FAISS", "NumPy", "pandas", "Gradio", "Streamlit"],
  },
  {
    label: "Frontend & Mobile",
    skills: ["React", "React Native", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    label: "Backend & Cloud",
    skills: ["REST APIs", "PostgreSQL", "MongoDB", "AWS (EC2, S3)", "Firebase", "Azure", "Docker"],
  },
  {
    label: "DevOps & Tools",
    skills: ["CI/CD", "Git", "pytest", "JUnit", "Unix/Linux", "Agile", "Performance Tuning"],
  },
  {
    label: "Concepts",
    skills: ["Data Structures", "OOP", "Machine Learning", "Security Tooling", "Networking", "Model Analysis"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-28 px-6 bg-[#071428]/50">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono tracking-widest uppercase">04.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Skills</h2>
          <div className="flex-1 h-px bg-[#122440] max-w-xs ml-2" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-[#0c1f3a] border border-[#122440] rounded-2xl p-6 hover:border-cyan-400/35 transition-all duration-300"
            >
              <h3 className="text-xs font-bold tracking-widest uppercase text-cyan-400 mb-4">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-medium text-slate-300 bg-[#071428] border border-[#1a3a5c] px-3 py-1.5 rounded-lg group-hover:border-[#1e4870] group-hover:text-slate-200 transition-all duration-200 hover:text-cyan-400 hover:border-cyan-400/30 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
