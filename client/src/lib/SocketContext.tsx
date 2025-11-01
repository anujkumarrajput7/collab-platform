import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  liveActivity: any[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  liveActivity: []
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [liveActivity, setLiveActivity] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    newSocket.on('connect', () => {
      console.log('✅ Socket connected');
      setConnected(true);
      
      // Join user's room if authenticated
      if (user?._id) {
        newSocket.emit('join', user._id);
      }
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      setConnected(false);
    });

    // Listen to live activity events
    newSocket.on('campaign:new', (data) => {
      setLiveActivity(prev => [data, ...prev].slice(0, 100));
    });

    newSocket.on('application:new', (data) => {
      setLiveActivity(prev => [data, ...prev].slice(0, 100));
    });

    newSocket.on('application:decided', (data) => {
      setLiveActivity(prev => [data, ...prev].slice(0, 100));
    });

    newSocket.on('proof:submitted', (data) => {
      setLiveActivity(prev => [data, ...prev].slice(0, 100));
    });

    newSocket.on('proof:verified', (data) => {
      setLiveActivity(prev => [data, ...prev].slice(0, 100));
    });

    newSocket.on('payment:completed', (data) => {
      setLiveActivity(prev => [data, ...prev].slice(0, 100));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, connected, liveActivity }}>
      {children}
    </SocketContext.Provider>
  );
};
