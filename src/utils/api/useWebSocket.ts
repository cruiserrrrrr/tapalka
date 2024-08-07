import { useCallback, useEffect, useRef } from "react";

interface IHandlers {
  onOpen: (event: Event) => void;
  onMessage: (event: Event) => void;
  onClose: (event: Event) => void;
  onError: (error: Event) => void;
  [ket: string]: any;
}

export const useWebSocket = (url: string, handlers: IHandlers) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = (event) => {
      if (handlers.onOpen) {
        handlers.onOpen(event);
      }
    };

    socket.onmessage = (event) => {
      if (handlers.onMessage) {
        handlers.onMessage(event);
      }
    };

    socket.onclose = (event) => {
      if (handlers.onClose) {
        handlers.onClose(event);
      }
    };

    socket.onerror = (error) => {
      if (handlers.onError) {
        handlers.onError(error);
      }
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = useCallback((message: { [key: string]: any }) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Ready state:', socketRef.current?.readyState);
    }
  }, []);

  return sendMessage;
};
