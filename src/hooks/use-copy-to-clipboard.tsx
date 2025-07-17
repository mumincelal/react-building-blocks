import React from "react";

type CopyToClipboardOptions = {
  timeout?: number;
  onCopy?: () => void;
};

export const useCopyToClipboard = ({
  timeout = 2000,
  onCopy
}: CopyToClipboardOptions) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = (text: string) => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return;
    }

    if (!text) {
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);

      if (onCopy) {
        onCopy();
      }

      if (timeout !== 0) {
        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      }
    }, console.error);
  };

  return { isCopied, copyToClipboard } as const;
};
