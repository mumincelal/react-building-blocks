import React from "react";

interface UseBroadcastChannelOptions {
  name: string;
  onMessage?: (event: MessageEvent) => void;
  onMessageError?: (event: MessageEvent) => void;
}

interface UseBroadcastChannelReturn<D, P> {
  isSupported: boolean;
  channel: BroadcastChannel | undefined;
  data: D | undefined;
  post: (data: P) => void;
  close: () => void;
  messageError: Event | undefined;
  isClosed: boolean;
}

export function useBroadcastChannel<D, P>(
  options: UseBroadcastChannelOptions
): UseBroadcastChannelReturn<D, P> {
  const [isSupported, setIsSupported] = React.useState<boolean>(false);
  const channelRef = React.useRef<BroadcastChannel | undefined>(undefined);
  const [data, setData] = React.useState<D | undefined>();
  const [messageError, setMessageError] = React.useState<Event | undefined>(
    undefined
  );
  const [isClosed, setIsClosed] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsSupported(
      // biome-ignore lint/nursery/noSecrets: <explanation>
      typeof window !== "undefined" && "BroadcastChannel" in window
    );
  }, []);

  const handleMessage = React.useCallback(
    (event: MessageEvent) => {
      setData(event.data as D);
      options.onMessage?.(event);
    },
    [options.onMessage]
  );

  const handleMessageError = React.useCallback(
    (event: MessageEvent) => {
      setMessageError(event);
      options.onMessageError?.(event);
    },
    [options.onMessageError]
  );

  React.useEffect(() => {
    if (isSupported) {
      const newChannel = new BroadcastChannel(options.name);
      channelRef.current = newChannel;

      newChannel.addEventListener("message", handleMessage);
      newChannel.addEventListener("messageerror", handleMessageError);

      return () => {
        newChannel.removeEventListener("message", handleMessage);
        newChannel.removeEventListener("messageerror", handleMessageError);
        if (!isClosed) {
          newChannel.close();
        }
        channelRef.current = undefined;
      };
    }
  }, [isSupported, options.name, handleMessage, handleMessageError]);

  const post = React.useCallback(
    (messageData: P) => {
      if (channelRef.current && !isClosed) {
        channelRef.current.postMessage(messageData);
      }
    },
    [isClosed]
  );

  const close = React.useCallback(() => {
    if (channelRef.current && !isClosed) {
      channelRef.current.close();
      setIsClosed(true);
    }
  }, [isClosed]);

  return {
    isSupported,
    channel: channelRef.current,
    data,
    post,
    close,
    messageError,
    isClosed
  };
}
