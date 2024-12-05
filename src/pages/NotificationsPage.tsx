import React from 'react';
import { usePinStore } from '../store/usePinStore';
import { Bell } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, clearNotifications } = usePinStore();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="text-primary hover:text-primary-dark"
          >
            Clear all
          </button>
        )}
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <p className="text-gray-800">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(notification.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};