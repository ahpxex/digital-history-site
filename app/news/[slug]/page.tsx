import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { frontierArticles, getArticleBySlug } from "@/data/news-feed";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return frontierArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function NewsDetailPage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">前沿追踪 · {article!.date}</p>
      <h1 className="mt-4 text-3xl font-semibold text-foreground">{article!.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{article!.excerpt}</p>
      <div className="mt-6 space-x-2 text-xs uppercase tracking-[0.35em] text-primary">
        {article!.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-primary/5 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
        {article!.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
