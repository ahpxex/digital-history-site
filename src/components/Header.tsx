"use client";

import { UserAvatar } from "./UserAvatar";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4 flex-1" />

        <div className="flex items-center gap-3">
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
