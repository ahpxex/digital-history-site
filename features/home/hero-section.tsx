"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { QuickSearchForm } from "@/features/search/components/quick-search-form";

type HeroProps = {
  hero: {
    badge: string;
    title: string;
    description: string;
    videoSrc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaPrimaryHref: string;
    ctaSecondaryHref: string;
    highlights: {
      label: string;
      value: number;
      suffix?: string;
    }[];
  };
};

export function HeroSection({ hero }: HeroProps) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-white py-16 sm:py-24 lg:py-32"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 text-slate-900 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="max-w-2xl space-y-6 text-balance">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-600">
            {hero.badge}
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            {hero.title}
          </h1>
          <p className="text-lg text-slate-600">{hero.description}</p>
          <div className="flex flex-wrap gap-4 text-slate-900">
            <Link
              href={hero.ctaPrimaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20"
            >
              {hero.ctaPrimary}
              <ArrowUpRightIcon className="size-4" />
            </Link>
            <Link
              href={hero.ctaSecondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-slate-900/20 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm"
            >
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="w-full max-w-md space-y-4">
          <QuickSearchForm />
          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-slate-900/10 bg-white/90 p-4 text-center text-slate-900 shadow-lg shadow-slate-900/5">
            {hero.highlights.map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-bold">
                  {item.value}
                  {item.suffix}
                </p>
                <p className="text-xs uppercase tracking-[0.3em]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
