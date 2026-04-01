import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatUser } from "@/types/chat";
import { useConversations, useMessages } from "./hooks";
import { ConversationList, ChatWindow, InboxHeader } from "./components";
//import { useWebSocket } from "@/context/web-socket/WebSocketContext";
import { useAuth } from "@/context/authentication/auth-context";
import { chatApi } from "./api/chatApi";
import { getSocket } from "@/socket";
//import { debugWebSocket } from "@/Echo";

export const InboxPage: React.FC = () => {
  // Call this in your component to test
  console.log("debug begin");
  //debugWebSocket();

  const { userId: urlUserId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const {
    conversations,
    loading: conversationsLoading,
    loadingMore: conversationsLoadingMore,
    error: conversationsError,
    hasMore: conversationsHasMore,
    loadMore: loadMoreConversations,
    refresh: refreshConversations,
  } = useConversations();

  const {
    messages,
    loading: messagesLoading,
    error: messagesError,
    sending,
    sendMessage,
    receiveMessage,
  } = useMessages(selectedUserId);

  //const { addListener, removeListener } = useWebSocket();

  const fetchUserProfile = async (userId: number) => {
    try {
      setLoadingProfile(true);
      const response = await chatApi.getUserProfile(userId);

      if (response.success) {
        setSelectedUser({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          type: response.data.type as "client" | "host",
          profile: response.data.profile || "",
          rate: 0,
          nbRates: 0,
          isEmailVerified: false,
        });
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    if (urlUserId) {
      const userId = parseInt(urlUserId);

      if (currentUser && userId === currentUser.id) {
        navigate("/inbox");
        return;
      }

      setSelectedUserId(userId);
      fetchUserProfile(userId);
    } else {
      setSelectedUserId(null);
      setSelectedUser(null);
      setSelectedConversationId(null);
    }
  }, [urlUserId, currentUser, navigate]);

  useEffect(() => {
    if (urlUserId && conversations.length > 0) {
      const userId = parseInt(urlUserId);
      const conversation = conversations.find((c) => c.with.id === userId);
      setSelectedConversationId(conversation?.id || null);
    }
  }, [urlUserId, conversations]);

  useEffect(() => {
    const listener = ({ message }: any) => {
      console.log("inbox-page", message);
      console.log("type", typeof message);
      //console.log("===========", message.with.id, urlUserId);
      if (urlUserId) {
        if (message.with.id === +urlUserId) {
          console.log("===========", "good");
          receiveMessage(message);
        }
      }
    };

    const socket = getSocket(`chat.${currentUser?.id}`, "MessageSent");

    socket.connect(listener);

    return () => {
      socket.dispose();
    };
  }, [urlUserId, conversations]);

  const handleConversationSelect = (userId: number) => {
    navigate(`/inbox/${userId}`);
  };

  const handleRefresh = () => {
    refreshConversations();
  };

  const handleSendMessage = async (text: string) => {
    const result = await sendMessage(text);
    if (result) {
      refreshConversations();
    }
    return result;
  };

  const handleBackToConversations = () => {
    setSelectedConversationId(null);
    setSelectedUserId(null);
    setSelectedUser(null);
    navigate("/inbox");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <InboxHeader conversationCount={conversations.length} />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-4 lg:py-8">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {selectedUser ? (
            <div
              style={{
                height: "calc(100vh - 140px)",
                maxHeight: "calc(100vh - 140px)",
              }}
            >
              <ChatWindow
                messages={messages}
                selectedUser={selectedUser}
                loading={messagesLoading || loadingProfile}
                sending={sending}
                error={messagesError}
                onSendMessage={handleSendMessage}
                onBackToConversations={handleBackToConversations}
              />
            </div>
          ) : (
            <div
              style={{
                height: "calc(100vh - 140px)",
                maxHeight: "calc(100vh - 140px)",
              }}
            >
              <ConversationList
                conversations={conversations}
                selectedConversationId={selectedConversationId}
                onConversationSelect={handleConversationSelect}
                loading={conversationsLoading}
                loadingMore={conversationsLoadingMore}
                hasMore={conversationsHasMore}
                error={conversationsError}
                onRefresh={handleRefresh}
                onLoadMore={loadMoreConversations}
              />
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div
          className="hidden lg:grid grid-cols-12 gap-6 lg:gap-8"
          style={{
            height: "calc(100vh - 200px)",
            maxHeight: "calc(100vh - 200px)",
          }}
        >
          <div
            className="col-span-5 xl:col-span-4"
            style={{
              height: "calc(100vh - 200px)",
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            <ConversationList
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              onConversationSelect={handleConversationSelect}
              loading={conversationsLoading}
              loadingMore={conversationsLoadingMore}
              hasMore={conversationsHasMore}
              error={conversationsError}
              onRefresh={handleRefresh}
              onLoadMore={loadMoreConversations}
            />
          </div>

          <div
            className="col-span-7 xl:col-span-8"
            style={{
              height: "calc(100vh - 200px)",
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            <ChatWindow
              messages={messages}
              selectedUser={selectedUser}
              loading={messagesLoading || loadingProfile}
              sending={sending}
              error={messagesError}
              onSendMessage={handleSendMessage}
              onBackToConversations={handleBackToConversations}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
