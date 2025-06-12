// client/src/components/messaging/ComposeMessage.js
import React, { useState } from 'react';
import axios from 'axios';

const ComposeMessage = ({ onMessageSent }) => {
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await axios.post('/api/messages', {
        recipientId: recipient,
        content
      });
      
      setContent('');
      setRecipient('');
      if (onMessageSent) onMessageSent();
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Destinatario:
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mensaje:
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows="4"
          required
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {sending ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
};

export default ComposeMessage;