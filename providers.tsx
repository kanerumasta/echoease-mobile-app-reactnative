// WebSocketProvider.tsx
import React, { createContext, useContext, useEffect, useRef, ReactNode, useCallback } from 'react';
import Toast from 'react-native-toast-message';

interface WebSocketContextType {
  socket: WebSocket | null;
  disconnect: () => void,
  connect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current) return;
    const socketUrl = process.env.NOTIFICATION_SOCKET || 'ws://localhost:8000/ws/notification'
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => console.log('WebSocket connection opened');
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if(event.data.notification_type !== 'message'){
        Toast.show({
            text1: data.message,
            type: 'success',
            visibilityTime: 4000,

        })
    }
    };
    socket.onerror = (error) => console.error('WebSocket error:', error);
    socket.onclose = () => console.log('WebSocket connection closed');

    socketRef.current = socket;
  }, []);


  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      console.log('WebSocket connection closed on logout');
    }
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket: socketRef.current, disconnect : disconnect, connect:connect }}>
      {children}
    </WebSocketContext.Provider>
  );
};
export const useNotificationSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
      throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
