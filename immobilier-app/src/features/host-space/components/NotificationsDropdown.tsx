import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, CheckCircle2, Clock, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

// Simulated data
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nouvelle réservation',
    message: 'Une réservation pour "Villa Agadir" a été confirmée.',
    time: 'Il y a 5 min',
    type: 'success',
    read: false,
  },
  {
    id: '2',
    title: 'Validation de bien',
    message: 'Votre annonce "Appartement Centre" est en cours d\'examen.',
    time: 'Il y a 2 heures',
    type: 'warning',
    read: false,
  },
  {
    id: '3',
    title: 'Mise à jour système',
    message: 'Les nouveaux outils de statistiques sont disponibles.',
    time: 'Il y a 1 jour',
    type: 'info',
    read: true,
  }
];

export const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('app_notifications_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse notifications", e);
      }
    }
    return initialNotifications;
  });

  useEffect(() => {
    localStorage.setItem('app_notifications_v1', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative hidden sm:block cursor-pointer group">
          <div className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Bell className="h-6 w-6 text-gray-500 group-hover:text-blue-600 transition-colors" />
          </div>
          {unreadCount > 0 && (
            <Badge className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-red-500 border-white border-2">
              {unreadCount}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      
      <PopoverContent align="end" className="w-[380px] p-0 rounded-2xl shadow-xl border-gray-100 overflow-hidden z-[100]">
        <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-black text-gray-900 text-lg">Notifications</h3>
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="text-xs font-bold text-blue-600 cursor-pointer hover:underline bg-transparent border-0"
            >
              Tout marquer comme lu
            </button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              onClick={() => handleMarkAsRead(notif.id)}
              className={`p-5 border-b border-gray-50 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${notif.read ? 'opacity-70' : 'bg-blue-50/30'}`}
            >
              <div className="flex-shrink-0 mt-1">
                {notif.type === 'success' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                {notif.type === 'warning' && <Clock className="h-5 w-5 text-orange-500" />}
                {notif.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
              </div>
              <div>
                <h4 className={`text-sm ${notif.read ? 'font-bold text-gray-800' : 'font-black text-gray-900'}`}>
                  {notif.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {notif.message}
                </p>
                <span className="text-[10px] font-bold text-gray-400 mt-2 block uppercase tracking-wider">
                  {notif.time}
                </span>
              </div>
              {!notif.read && (
                <div className="h-2 w-2 rounded-full bg-blue-600 ml-auto mt-2" />
              )}
            </div>
          ))}
        </div>
        
        <div className="p-3 text-center border-t border-gray-100 bg-gray-50/50 hover:bg-gray-50 cursor-pointer transition-colors">
          <span className="text-sm font-bold text-gray-500">Voir toutes les notifications</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
