import { useState, useEffect, useCallback } from "react";
import { ChatMessage } from "@/types/chat";
import { chatApi } from "../api/chatApi";

export const useMessages = (userId: number | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMessages = useCallback(async (pageNum = 1, append = false) => {
    if (!userId) return;

    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setMessages([]);
      }
      setError(null);

      const response = await chatApi.getMessages(userId, pageNum, 100);

      if (response.success) {
        const items = response.data.items.reverse();
        
        if (append) {
          setMessages(prev => [...items, ...prev]);
        } else {
          setMessages(items);
        }
        
        setHasMore(pageNum < response.data.pagination.last_page);
        setPage(pageNum);
      } else {
        if (response.statusCode === 404) {
          setMessages([]);
          setHasMore(false);
        } else {
          setError(response.message || "Failed to load messages");
        }
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [userId]);

  const sendMessage = useCallback(
    async (text: string): Promise<ChatMessage | undefined> => {
      if (!userId || !text.trim()) return undefined;

      try {
        setSending(true);
        setError(null);

        const response = await chatApi.sendMessage(userId, { text });

        if (response.success && response.data) {
          setMessages((prevMessages) => [...prevMessages, response.data]);
          return response.data;
        } else {
          setError(response.message || "Failed to send message");
          return undefined;
        }
      } catch (err) {
        console.error("Error sending message:", err);
        setError("Failed to send message");
        return undefined;
      } finally {
        setSending(false);
      }
    },
    [userId]
  );

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore || loading) return;
    fetchMessages(page + 1, true);
  }, [hasMore, loadingMore, loading, page, fetchMessages]);

  const receiveMessage = useCallback((message: ChatMessage) => {
    setMessages((prevMessages) => {
      const exists = prevMessages.some((m) => m.id === message.id);
      if (exists) return prevMessages;
      return [...prevMessages, message];
    });
  }, []);

  useEffect(() => {
    if (userId) {
      setMessages([]);
      setPage(1);
      setHasMore(true);
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [userId, fetchMessages]);

  return {
    messages,
    loading,
    loadingMore,
    error,
    sending,
    hasMore,
    sendMessage,
    loadMore,
    receiveMessage,
  };
};
