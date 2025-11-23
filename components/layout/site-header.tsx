"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "案例库", href: "/cases" },
  { label: "研究工具", href: "/tools" },
  { label: "资讯", href: "/news" },
  { label: "数据集", href: "#datasets" },
  { label: "合作伙伴", href: "#partners" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]"
          aria-label="Digital history logo"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            DH
          </span>
          Global Digital History
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => {
            if (item.href.startsWith("#")) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-muted-foreground transition-colors hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/search/advanced"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            高级检索
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            asChild
            className="hidden md:inline-flex"
            aria-label="查看检索结果"
          >
            <Link href="/search/results">检索结果</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
