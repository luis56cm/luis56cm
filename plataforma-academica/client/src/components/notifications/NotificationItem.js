// components/notifications/NotificationItem.js
import axios from 'axios';

const NotificationItem = ({ notification }) => {
    const markAsRead = async () => {
      try {
        await axios.put(`/api/notifications/${notification._id}/read`);
        // Actualizar el estado local
      } catch (error) {
        console.error('Error al marcar como leída:', error);
      }
    };
  
    return (
      <div
        className={`p-4 rounded-lg border ${
          notification.read ? 'bg-white' : 'bg-blue-50'
        }`}
        onClick={markAsRead}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-sm text-gray-600">{notification.message}</p>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(notification.createdAt).toLocaleDateString()}
          </span>
        </div>
        {notification.courseId && (
          <p className="text-sm text-gray-500 mt-1">
            Curso: {notification.courseId.name}
          </p>
        )}
      </div>
    );
  };
  
  export default NotificationItem;