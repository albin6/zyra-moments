// contexts/SocketContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext<typeof Socket | null>(null);

const SOCKET_URL = `${import.meta.env.VITE_CHAT_API_URI}`;

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket] = useState(() =>
    io(SOCKET_URL, { withCredentials: true, reconnection: true } as any)
  );

  useEffect(() => {
    return () => {
      socket.disconnect(); 
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error("useSocket must be used within a SocketProvider");
  return socket;
};