"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "./types/message";

export default function ChatRoom() {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  // WebSocket 连接设置
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = `ws://${window.location.host}/socket`;
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onmessage = async (event) => {
      const payload =
        typeof event.data === "string" ? event.data : await event.data.text();
      const message = JSON.parse(payload) as Message;
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, []);

  // 发送消息处理
  const sendMessage = useCallback(() => {
    if (
      socketRef.current?.readyState === WebSocket.OPEN &&
      inputMessage.trim()
    ) {
      const message: Message = {
        author: "You",
        content: inputMessage,
      };
      socketRef.current.send(JSON.stringify(message));
      setMessages((prev) => [...prev, message]);
      setInputMessage("");
    }
  }, [inputMessage]);

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Chat Room</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[500px] p-4 border rounded-md">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.author === "You" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block max-w-[70%] px-4 py-2 rounded-lg ${
                  msg.author === "You"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="font-semibold text-sm">{msg.author}</div>
                <div className="text-sm break-words">{msg.content}</div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
