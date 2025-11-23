import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getEventBySlug, upcomingEvents } from "@/data/news-feed";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return upcomingEvents.map((event) => ({ slug: event.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const event = getEventBySlug(params.slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
  };
}

export default function EventDetailPage({ params }: PageProps) {
  const event = getEventBySlug(params.slug);
  if (!event) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">会议资讯</p>
      <h1 className="mt-3 text-3xl font-semibold text-foreground">{event!.title}</h1>
      <p className="text-sm text-muted-foreground">
        {event!.date} · {event!.location}
      </p>
      <p className="mt-4 text-base text-muted-foreground">{event!.description}</p>
      <div className="mt-8 space-y-2 rounded-3xl border border-border/70 bg-card/80 p-6">
        <h2 className="text-xl font-semibold text-foreground">议程亮点</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          {event!.agenda.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <Link
        href={event!.registrationUrl}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        前往注册
      </Link>
    </article>
  );
}
