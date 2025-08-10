import React from "react";

const composeProviders =
  (...providers: React.ComponentType<{ children: React.ReactNode }>[]) =>
  ({ children }: { children: React.ReactNode }) =>
    providers.reduceRight(
      (acc, Provider) => (
        <Provider key={Provider.displayName || Provider.name || "Provider"}>
          {acc}
        </Provider>
      ),
      children
    );

export const Providers =
  composeProviders(
    // Add your providers here
  );
