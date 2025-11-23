import Link from "next/link";

import { frontierArticles, upcomingEvents } from "@/data/news-feed";

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6">
      <header className="space-y-3 pb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">资讯</p>
        <h1 className="text-3xl font-semibold text-foreground">前沿追踪与会议资讯</h1>
        <p className="text-sm text-muted-foreground">
          每周整合生成式 AI、沉浸式展陈与公共人文领域的最新动态以及即将到来的会议。
        </p>
      </header>
      <div className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">前沿追踪</h2>
          <div className="space-y-4">
            {frontierArticles.map((article) => (
              <article key={article.slug} className="rounded-3xl border border-border/70 p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{article.date}</span>
                  <span>{article.timeToRead}</span>
                  {article.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary/5 px-3 py-1 text-[0.65rem] font-semibold text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{article.title}</h3>
                <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                <Link
                  href={"/news/" + article.slug}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  阅读全文
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">会议资讯</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <article key={event.slug} className="rounded-3xl border border-border/70 bg-muted/40 p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{event.date}</span>
                  <span>{event.location}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <Link
                  href={"/events/" + event.slug}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  查看日程
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
