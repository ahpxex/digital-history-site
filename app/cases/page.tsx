import Link from "next/link";

import { caseStudies } from "@/data/case-studies";
import { getRegionLabel, getThemeLabel } from "@/lib/search/dictionaries";

export default function CasesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <header className="space-y-3 pb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          案例库
        </p>
        <h1 className="text-3xl font-semibold text-foreground">
          全球数字史学精选案例
        </h1>
        <p className="text-sm text-muted-foreground">
          通过语义标注、跨语检索与 API 接入的案例，为新的研究与展陈提供参考。
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        {caseStudies.map((item) => (
          <article
            key={item.slug}
            className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm"
          >
            <div
              className="h-40 w-full rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: "url(" + item.heroImage + ")" }}
              aria-label={item.title}
            />
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="font-semibold text-primary">
                {getRegionLabel(item.region)}
              </span>
              <span>{getThemeLabel(item.theme)}</span>
              <span>{item.year}</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={"/cases/" + item.slug}
              className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              查看详情
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
