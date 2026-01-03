"use client";

import React from "react";
import { createPortal } from "react-dom";

type PortalProps = {};

export function Portal({ children }: React.PropsWithChildren<PortalProps>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}
