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
  const [error, setError] = React.useState<Error | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);

      if (onCopy) {
        onCopy();
      }

      if (timeout !== 0) {
        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to copy text")
      );
    }
  };

  return { isCopied, error, copyToClipboard } as const;
};
