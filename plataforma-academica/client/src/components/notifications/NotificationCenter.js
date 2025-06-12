// components/notifications/NotificationCenter.js
import React from 'react';
import { Bell } from 'lucide-react';
import NotificationItem from './NotificationItem';
import { useState } from 'react';

const NotificationCenter = ({ notifications }) => {
  const [showAll, setShowAll] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Notificaciones</h2>
        <div className="relative">
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {notifications
          .slice(0, showAll ? undefined : 5)
          .map(notification => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))}
      </div>

      {notifications.length > 5 && (
        <button
          className="mt-4 text-blue-500 hover:text-blue-700"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Ver menos' : 'Ver todas'}
        </button>
      )}
    </div>
  );
};

export default NotificationCenter;