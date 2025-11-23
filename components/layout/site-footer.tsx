"use client";

import Link from "next/link";

import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted-foreground lg:px-6">
        <div>
          <p className="text-base font-semibold text-foreground">
            推动数字史学知识共享与跨界合作
          </p>
          <p>数字史学实验室 · contact@digital-history.org</p>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-semibold text-foreground">联系团队</p>
            <a
              href="mailto:contact@digital-history.org"
              className="underline-offset-4 hover:underline"
            >
              contact@digital-history.org
            </a>
          </div>
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <Link href="/cases">CASES</Link>
            <Link href="/tools">TOOLKIT</Link>
            <Link href="/news">NEWS</Link>
          </div>
        </div>
        <Separator />
        <p className="text-xs text-muted-foreground">© 2025 Digital History Lab</p>
      </div>
    </footer>
  );
}
