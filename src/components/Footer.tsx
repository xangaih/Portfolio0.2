"use client";

export default function Footer() {
  return (
    <footer className="border-t border-[#122440] py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
        <p>
          Built by{" "}
          <span className="text-slate-400 font-medium">Khangai Enkhbat</span>
          {" "}with Next.js &amp; Tailwind CSS
        </p>
        <p>
          <a
            href="https://github.com/khangaienkhbat"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            github.com/khangaienkhbat
          </a>
        </p>
      </div>
    </footer>
  );
}
