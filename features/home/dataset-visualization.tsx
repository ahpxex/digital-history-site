"use client";

import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { HomeContent } from "@/data/home-content";

type Props = {
  datasets: HomeContent["datasets"];
  title: string;
  subtitle: string;
  topicTitle: string;
  regionTitle: string;
};

export function DatasetVisualization({
  datasets,
  title,
  subtitle,
  topicTitle,
  regionTitle,
}: Props) {
  const leadingRegion = [...datasets.regions].sort((a, b) => b.value - a.value)[0];
  const maxRegionValue = Math.max(...datasets.regions.map((item) => item.value), 0);

  return (
    <section id="datasets" className="py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {title}
          </p>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm">
            <h3 className="font-semibold text-foreground">{topicTitle}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={datasets.topics}>
                  <defs>
                    <linearGradient id="topicArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fill="url(#topicArea)"
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} opacity={0.85}>
                    {datasets.topics.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="relative rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm">
            <h3 className="font-semibold text-foreground">{regionTitle}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  data={datasets.regions}
                  innerRadius="25%"
                  outerRadius="90%"
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, Math.max(50, maxRegionValue + 5)]}
                    tick={false}
                  />
                  <RadialBar
                    dataKey="value"
                    background
                    cornerRadius={14}
                    clockWise
                  >
                    {datasets.regions.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </RadialBar>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            {leadingRegion ? (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl bg-background/80 px-6 py-4 text-center shadow">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    领先地区
                  </p>
                  <p className="text-2xl font-semibold text-foreground">
                    {leadingRegion.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {leadingRegion.value} 个项目
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
