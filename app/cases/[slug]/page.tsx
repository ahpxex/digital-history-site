import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { caseStudies, getCaseBySlug } from "@/data/case-studies";
import { getRegionLabel, getThemeLabel } from "@/lib/search/dictionaries";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getCaseBySlug(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
  };
}

export default function CaseDetailPage({ params }: PageProps) {
  const caseStudy = getCaseBySlug(params.slug);
  if (!caseStudy) {
    notFound();
  }

  return (
    <article className="bg-muted/20">
      <section className="relative isolate bg-gradient-to-br from-primary/5 via-card to-transparent">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(" + caseStudy!.heroImage + ")" }}
          aria-hidden
        />
        <div className="mx-auto max-w-5xl px-4 py-16 text-balance text-slate-900 lg:px-6">
          <p className="text-xs uppercase tracking-[0.4em]">
            {caseStudy!.year} · {getRegionLabel(caseStudy!.region)} · {getThemeLabel(caseStudy!.theme)}
          </p>
          <h1 className="mt-4 text-4xl font-semibold">{caseStudy!.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{caseStudy!.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>{caseStudy!.institution}</span>
            <div className="flex flex-wrap gap-2">
              {caseStudy!.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/70 px-3 py-1 text-xs text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-4 text-center text-slate-900 sm:grid-cols-3">
            {caseStudy!.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/80 p-4 shadow">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.3em]">{stat.label}</p>
                {stat.hint ? (
                  <p className="text-xs text-muted-foreground">{stat.hint}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
        <div className="space-y-10">
          {caseStudy!.sections.map((section) => (
            <div key={section.heading} className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">{section.heading}</h2>
              {section.body.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-4 rounded-3xl border border-border/70 bg-card/80 p-6">
          <h3 className="text-xl font-semibold text-foreground">资源链接</h3>
          <ul className="space-y-2 text-sm text-primary">
            {caseStudy!.resources.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
