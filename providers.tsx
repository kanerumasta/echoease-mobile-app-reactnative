// WebSocketProvider.tsx
import React, { createContext, useContext, useEffect, useRef, ReactNode, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { useFetchNewNotificationsQuery } from './redux/features/notificationApiSlice';

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
  const {refetch} = useFetchNewNotificationsQuery()

  const connect = useCallback(() => {
    if (socketRef.current) return;
    const socketUrl = process.env.NOTIFICATION_SOCKET
    if(!socketUrl   ){console.log('socketUrl is undefined: /providers');return}
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => console.log('WebSocket connection opened');
    socket.onmessage = (event) => {

        refetch()
        const data = JSON.parse(event.data)
        console.log(data)
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
