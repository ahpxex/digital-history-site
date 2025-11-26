"use client";

import { Authenticated } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

function RedirectToLogin() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">Redirecting to login…</p>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <Authenticated
      key="dashboard"
      loading={
        <div className="flex h-screen items-center justify-center">
          <p className="text-gray-500">Checking your session…</p>
        </div>
      }
      fallback={<RedirectToLogin />}
    >
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 flex flex-col overflow-auto">{children}</main>
        </div>
      </div>
    </Authenticated>
  );
}
