// client/src/components/messaging/MessageList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      setMessages(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar mensajes:', err);
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando mensajes...</div>;

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div 
          key={message._id}
          className={`p-4 rounded-lg ${
            !message.isRead ? 'bg-blue-50' : 'bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">
              De: {message.sender.name}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(message.timestamp).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-700">{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
