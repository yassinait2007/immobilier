import React from 'react';
import { MessageCircle } from 'lucide-react';

interface InboxHeaderProps {
  conversationCount: number;
}

const InboxHeader: React.FC<InboxHeaderProps> = ({ conversationCount }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-xs sm:text-sm text-gray-600">
              {conversationCount} conversation{conversationCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxHeader;