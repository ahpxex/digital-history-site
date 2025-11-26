import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/server/api/root";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          credentials: "same-origin",
        }),
    }),
  ],
});
