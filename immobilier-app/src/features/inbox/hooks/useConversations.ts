import { useState, useEffect, useCallback } from 'react';
import { Conversation } from '@/types/chat';
import { chatApi } from '../api/chatApi';

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchConversations = useCallback(async (pageNum = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setConversations([]);
      }
      setError(null);

      const response = await chatApi.getConversations(pageNum, 7);
      
      if (response.success) {
        const items = response.data.items;
        
        if (append) {
          setConversations(prev => [...prev, ...items]);
        } else {
          setConversations(items);
        }
        
        setHasMore(pageNum < response.data.pagination.last_page);
        setPage(pageNum);
      } else {
        setError(response.message || 'Failed to load conversations');
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore || loading) return;
    fetchConversations(page + 1, true);
  }, [hasMore, loadingMore, loading, page, fetchConversations]);

  const refresh = useCallback(() => {
    setPage(1);
    fetchConversations(1, false);
  }, [fetchConversations]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};