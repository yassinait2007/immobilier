import React from 'react';
import { MessageCircle, Star, RefreshCw, Loader } from 'lucide-react';
import { Conversation } from '@/types/chat';
import { formatRelativeTime } from '@/utils/formaters';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: number | null;
  onConversationSelect: (userId: number) => void;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  onRefresh: () => void;
  onLoadMore: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onConversationSelect,
  loading,
  loadingMore,
  hasMore,
  error,
  onRefresh,
  onLoadMore,
}) => {
  if (loading) {
    return (
      <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <div className="flex-none border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <div className="flex-none border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
            <button
              onClick={onRefresh}
              className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <MessageCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-red-800 text-lg font-semibold mb-2">Erreur de chargement</h3>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button 
              onClick={onRefresh}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col" style={{ height: '100%', maxHeight: '100%' }}>
      {/* Fixed Header */}
      <div className="flex-none border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
          <button
            onClick={onRefresh}
            className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto" 
        style={{ minHeight: 0, maxHeight: '100%' }}
      >
        {conversations.length === 0 ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune conversation</h3>
              <p className="text-gray-500 text-sm">Vos conversations apparaîtront ici</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {conversations.map((conversation) => {
              const isSelected = selectedConversationId === conversation.id;
              const { with: user, lastMessage } = conversation;
              
              return (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'bg-primary/10 border-2 border-primary/20 shadow-sm' 
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                  onClick={() => onConversationSelect(user.id)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {user.profile ? (
                        <img
                          src={user.profile}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                          user.type === 'host' 
                            ? 'bg-gradient-to-br from-emerald-400 to-teal-500' 
                            : 'bg-gradient-to-br from-blue-400 to-indigo-500'
                        }`}>
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                      )}
                    </div>

                    {/* Conversation Details */}
                    <div className="flex-1 min-w-0">
                      {/* Name */}
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {user.firstName} {user.lastName}
                        </h3>
                      </div>

                      {/* Rating */}
                      {user.rate > 0 && (
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {user.rate.toFixed(1)} ({user.nbRates} avis)
                          </span>
                          {user.isEmailVerified && (
                            <span className="text-xs text-green-600 ml-2">✓ Vérifié</span>
                          )}
                        </div>
                      )}

                      {/* Last Message */}
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-gray-600 truncate flex-1">
                          <span className={lastMessage.imSender ? 'font-medium text-gray-800' : ''}>
                            {lastMessage.imSender ? 'Vous: ' : ''}
                          </span>
                          {lastMessage.text}
                        </p>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {formatRelativeTime(lastMessage.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Load More Button or Loading */}
            {hasMore && (
              <div className="flex justify-center py-4">
                {loadingMore ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Chargement...</span>
                  </div>
                ) : (
                  <button
                    onClick={onLoadMore}
                    className="px-4 py-2 text-sm text-primary hover:text-primary-dark font-medium hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    Voir plus de conversations
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;