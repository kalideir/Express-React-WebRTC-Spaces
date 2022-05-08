import { createContext, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

export const socket = io(`http://localhost:8000`);

export const SocketContext = createContext<Socket | null>(null);

export default function SocketProvider({ children }: { children: ReactNode }) {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
