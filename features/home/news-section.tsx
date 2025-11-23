import { ArrowRightIcon, Calendar, MapPinIcon } from "lucide-react";
import Link from "next/link";

import type { HomeContent } from "@/data/home-content";

type Props = {
  news: HomeContent["news"];
  frontierLabel: string;
  frontierSummary: string;
  eventsLabel: string;
  eventsSummary: string;
  learnMoreLabel: string;
};

export function NewsSection({
  news,
  frontierLabel,
  frontierSummary,
  eventsLabel,
  eventsSummary,
  learnMoreLabel,
}: Props) {

  return (
    <section id="news" className="py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2 lg:px-6">
        <div className="space-y-4 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {frontierLabel}
            </p>
            <p className="text-sm text-muted-foreground">
              {frontierSummary}
            </p>
          </div>
          <div className="space-y-4">
            {news.frontier.map((item) => (
              <article key={item.id} className="rounded-2xl border border-border/60 p-4">
                <p className="text-xs text-muted-foreground">{item.date}</p>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={item.link}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-primary"
                >
                  {learnMoreLabel}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-border/70 bg-muted/40 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {eventsLabel}
            </p>
            <p className="text-sm text-muted-foreground">{eventsSummary}</p>
          </div>
          <div className="space-y-4">
            {news.events.map((event) => (
              <article key={event.id} className="rounded-2xl border border-border/60 bg-background p-4">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  {event.date}
                </p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="size-4" />
                  {event.location}
                </p>
                <Link
                  href={event.link}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-primary"
                >
                  {learnMoreLabel}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
