"use client";

import { HeroUIProvider } from "@heroui/react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { registerExampleResources } from "@/examples/_registry";
import { exampleResources } from "@/examples/resources";
import { featureResources, registerFeatureResources } from "@/features";
import { authProvider, refineDataProvider } from "@/infra/refine";

// Register example resources on module load
registerExampleResources();
registerFeatureResources();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <Refine
        routerProvider={routerProvider}
        dataProvider={refineDataProvider}
        authProvider={authProvider}
        resources={[...exampleResources, ...featureResources]}
        options={{
          // Note: syncWithLocation requires Suspense boundaries in Next.js 15
          // due to useSearchParams usage. Set to false for static builds.
          syncWithLocation: false,
          warnWhenUnsavedChanges: true,
          disableTelemetry: true,
        }}
      >
        {children}
      </Refine>
    </HeroUIProvider>
  );
}
