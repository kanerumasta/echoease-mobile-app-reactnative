import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { MessageSchema } from "../schemas/chat-schemas";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useChatWebSocket = (
  code: string,
  websocketURL: string,
  setMessages: Dispatch<SetStateAction<z.infer<typeof MessageSchema>[]>>,
) => {
  const websocket = useRef<WebSocket | null>(null);
  const [newMessage, setNewMessage] = useState("")



  // Function to fetch token and establish the WebSocket connection
  const connect = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {

      // Close any existing WebSocket connection before opening a new one
      if (websocket.current) {
        websocket.current.close();
      }

      websocket.current = new WebSocket(`${websocketURL}?token=${token}`);

      websocket.current.onopen = () => {
        console.log("WebSocket connected");
      };

      websocket.current.onclose = () => {
            console.log('disconnected')
      };

      websocket.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      websocket.current.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        setMessages((prevMessages) => [messageData,...prevMessages]);
        setNewMessage("")
      };
    }
  };

  useEffect(() => {
    connect(); // Fetch token and connect when component mounts

    return () => {
      if (websocket.current) {
        websocket.current.close(); // Clean up WebSocket on unmount
      }
    };
  }, [websocketURL, code]); // Run when websocketURL or code changes

  // Function to send a message via WebSocket
  const sendMessage = () => {

    if (websocket.current && newMessage) {
      websocket.current.send(newMessage.trim());
    }
  };

  return { sendMessage , setNewMessage, newMessage};
};
