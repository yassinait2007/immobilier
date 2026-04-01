import React, { useState, useEffect, useRef } from "react";
import { Send, Star, MessageCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatMessage, ChatUser } from "@/types/chat";
import { ContentLoading } from "@/components/ui/loading";

interface ChatWindowProps {
  messages: ChatMessage[];
  selectedUser: ChatUser | null;
  loading: boolean;
  sending: boolean;
  error: string | null;
  onSendMessage: (text: string) => Promise<ChatMessage | undefined>;
  onBackToConversations?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  selectedUser,
  loading,
  sending,
  error,
  onSendMessage,
  onBackToConversations,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    const messageText = newMessage.trim();
    setNewMessage("");

    const message = await onSendMessage(messageText);
    if (message) {
    } else {
      setNewMessage(messageText);
    }
  };

  const handleBackToConversations = () => {
    if (onBackToConversations) {
      onBackToConversations();
    } else {
      navigate("/inbox");
    }
  };

  if (!selectedUser) {
    return (
      <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
        <div className="text-center p-8">
          <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Sélectionnez une conversation
          </h3>
          <p className="text-gray-500 max-w-sm">
            Choisissez une conversation dans la liste pour commencer à échanger
            des messages
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col"
      style={{ height: "100%", maxHeight: "100%" }}
    >
      {/* Fixed Header */}
      <div className="flex-none border-b border-gray-100 p-4">
        <div className="flex items-center space-x-3">
          {/* Back button for mobile */}
          <button
            onClick={handleBackToConversations}
            className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          {selectedUser.profile ? (
            <img
              src={selectedUser.profile}
              alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />
          ) : (
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm ${
                selectedUser.type === "host"
                  ? "bg-gradient-to-br from-emerald-400 to-teal-500"
                  : "bg-gradient-to-br from-blue-400 to-indigo-500"
              }`}
            >
              {selectedUser.firstName[0]}
              {selectedUser.lastName[0]}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {selectedUser.firstName} {selectedUser.lastName}
              </h2>
            </div>

            {selectedUser.rate > 0 && (
              <div className="hidden sm:flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600">
                  {selectedUser.rate.toFixed(1)} ({selectedUser.nbRates} avis)
                </span>
                {selectedUser.isEmailVerified && (
                  <span className="text-sm text-green-600 ml-2">✓ Vérifié</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ minHeight: 0, maxHeight: "100%" }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <ContentLoading
              message="Chargement des messages..."
              description="Récupération de la conversation"
            />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <h3 className="text-red-800 font-medium mb-1">Erreur</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun message
              </h3>
              <p className="text-gray-500 text-sm">
                Commencez la conversation en envoyant votre premier message
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const isOwnMessage = message.imSender;
              const showAvatar =
                !isOwnMessage &&
                (index === 0 ||
                  messages[index - 1]?.imSender !== message.imSender);

              return (
                <div
                  key={index}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  } ${!isOwnMessage ? "items-end space-x-2" : ""}`}
                >
                  {!isOwnMessage && (
                    <div className="flex-shrink-0">
                      {showAvatar ? (
                        selectedUser.profile ? (
                          <img
                            src={selectedUser.profile}
                            alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                              selectedUser.type === "host"
                                ? "bg-gradient-to-br from-emerald-400 to-teal-500"
                                : "bg-gradient-to-br from-blue-400 to-indigo-500"
                            }`}
                          >
                            {selectedUser.firstName[0]}
                          </div>
                        )
                      ) : (
                        <div className="w-6 h-6"></div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col max-w-xs sm:max-w-sm lg:max-w-md">
                    <div
                      className={`px-3 py-2 rounded-2xl shadow-sm ${
                        isOwnMessage
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-gray-100 text-gray-900 rounded-bl-md border border-gray-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed break-words">
                        {message.text}
                      </p>
                    </div>
                    <span
                      className={`text-xs mt-1 ${
                        isOwnMessage
                          ? "text-gray-500 text-right"
                          : "text-gray-400 text-left ml-1"
                      }`}
                    >
                      {/* {formatRelativeTime(message.date)} */}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Fixed Footer */}
      <div className="flex-none border-t border-gray-100 p-3 sm:p-4">
        <form
          onSubmit={handleSendMessage}
          className="flex space-x-2 sm:space-x-3"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="bg-primary text-white rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
