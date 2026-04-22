"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Zap, Shield, Globe } from "lucide-react";
import { GithubIcon } from "@/components/icons";

const projects = [
  {
    icon: Zap,
    title: "ACE AI",
    subtitle: "Production AI Platform",
    description:
      "A full-scale AI assistant platform built for real-world deployment. Integrates OpenAI's API with a FAISS vector store for semantic search and retrieval-augmented generation (RAG), powered by LangChain orchestration. Features a fast Streamlit interface, security-aware data handling, and REST API endpoints — engineered from the ground up on Linux with production reliability in mind.",
    tech: ["Python", "LangChain", "FAISS", "OpenAI API", "Streamlit", "REST APIs", "Linux"],
    github: "https://github.com/khangaienkhbat",
    live: null,
    accent: "from-cyan-400/20 to-blue-500/10",
    border: "hover:border-cyan-400/50",
    tag: "AI / LLM",
  },
  {
    icon: Shield,
    title: "Toxic Comments Classifier",
    subtitle: "ML Moderation System",
    description:
      "End-to-end machine learning pipeline for detecting toxic content at scale. Leveraged TensorFlow and fine-tuned LLMs to hit 90% precision/recall. Architected with audit logging, compliance flags, and a Gradio-powered demo UI. Automated the full deployment lifecycle with Docker and CI/CD pipelines — production-ready, scalable, and built with enterprise moderation workflows in mind.",
    tech: ["Python", "TensorFlow", "LLMs", "Gradio", "Docker", "CI/CD", "NumPy", "pandas"],
    github: "https://github.com/khangaienkhbat",
    live: null,
    accent: "from-violet-400/20 to-purple-600/10",
    border: "hover:border-violet-400/50",
    tag: "ML / NLP",
  },
  {
    icon: Globe,
    title: "GatewayToGold",
    subtitle: "Cross-Platform Mobile App",
    description:
      "A cross-platform React Native app serving 100+ active users with real-time data sync and multi-cloud infrastructure. Built ingestion pipelines across MongoDB, Firebase, and AWS with Azure integration for analytics. Exposed a typed TypeScript API layer, accelerated iteration cycles with Cursor-assisted development, and maintained reliability through continuous CI/CD loops with real user feedback.",
    tech: ["React Native", "TypeScript", "MongoDB", "AWS", "Firebase", "Azure", "CI/CD"],
    github: "https://github.com/khangaienkhbat",
    live: null,
    accent: "from-emerald-400/20 to-teal-600/10",
    border: "hover:border-emerald-400/50",
    tag: "Full-Stack / Cloud",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono tracking-widest uppercase">03.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Projects</h2>
          <div className="flex-1 h-px bg-[#122440] max-w-xs ml-2" />
        </motion.div>

        <div className="flex flex-col gap-8">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className={`group relative overflow-hidden bg-[#0c1f3a] border border-[#122440] rounded-2xl p-7 sm:p-9 transition-all duration-300 ${project.border}`}
              >
                {/* Gradient backdrop */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-bl ${project.accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#071428] border border-[#1a3a5c]">
                        <Icon size={20} className="text-cyan-400" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-cyan-400/70 tracking-widest uppercase mb-0.5 block">
                          {project.tag}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 mt-1">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="text-slate-500 hover:text-cyan-400 transition-colors duration-200"
                      >
                        <GithubIcon size={20} />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} Live Demo`}
                          className="text-slate-500 hover:text-cyan-400 transition-colors duration-200"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Subtitle */}
                  <p className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-base leading-relaxed mb-7">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#071428] border border-[#1a3a5c] text-slate-400 group-hover:border-[#1e4870] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
