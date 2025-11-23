"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { quickSearchAction } from "@/app/actions/search-actions";
import { stringifyParams } from "@/lib/search/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useSearchStore } from "@/lib/store/search-store";

const initialState = {
  status: "idle" as const,
};

export function QuickSearchForm() {
  const router = useRouter();
  const setLastResult = useSearchStore((state) => state.setLastResult);
  const lastParams = useSearchStore((state) => state.lastParams);
  const lastResults = useSearchStore((state) => state.lastResults);
  const [state, dispatch, isPending] = React.useActionState(
    quickSearchAction,
    initialState
  );
  const keywordId = React.useId();

  React.useEffect(() => {
    if (state?.status === "success" && state.params && state.results) {
      setLastResult(state.params, state.results);
    }
  }, [setLastResult, state]);

  const errorKey = state?.status === "error" ? state.errorKey : undefined;
  const errorMessage = state?.status === "error" ? state.errorMessage : undefined;

  return (
    <>
      <form
        action={dispatch}
        className="group flex w-full flex-col gap-3 rounded-2xl border border-white/30 bg-white/70 p-4 text-sm shadow-lg backdrop-blur"
        aria-label="Quick search"
      >
        <label
          htmlFor={keywordId}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
        >
          关键词
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id={keywordId}
            name="keyword"
            placeholder="输入主题、地区或机构"
            aria-describedby={errorKey ? `${keywordId}-error` : undefined}
            aria-invalid={Boolean(errorKey || errorMessage)}
            className="h-12 flex-1 border-white/50 bg-white/70 text-base text-foreground placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            className="h-12 flex-none px-6"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner className="mr-2 size-4" />
                检索中...
              </>
            ) : (
              "立即检索"
            )}
          </Button>
        </div>
        {(errorKey || errorMessage) && (
          <p
            id={`${keywordId}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {errorMessage ?? errorKey}
          </p>
        )}
      </form>
      {lastResults && lastResults.length ? (
        <div className="mt-4 rounded-2xl border border-white/40 bg-white/85 p-4 text-sm shadow">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span>最新检索</span>
            {lastParams?.keywords?.length ? (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold text-primary">
                {lastParams.keywords.join(" · ")}
              </span>
            ) : null}
            <span className="text-muted-foreground">
              显示 {Math.min(3, lastResults.length)} / {lastResults.length} 条
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {lastResults.slice(0, 3).map((paper) => (
              <li
                key={paper.id}
                className="rounded-xl border border-border/60 bg-white/95 p-3"
              >
                <p className="text-sm font-semibold text-foreground">{paper.title}</p>
                <p className="text-xs text-muted-foreground">
                  {paper.authors.join("、")} · {paper.year}
                </p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
            onClick={() =>
              router.push(
                lastParams
                  ? `/search/results?${stringifyParams(lastParams)}`
                  : "/search/results"
              )
            }
          >
            查看全部结果
          </button>
        </div>
      ) : null}
    </>
  );
}
