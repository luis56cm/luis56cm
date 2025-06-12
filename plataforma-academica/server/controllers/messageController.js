// controllers/messageController.js
const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    
    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      content
    });
    
    await message.save();
    
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error al enviar mensaje' });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    })
    .populate('sender', 'name')
    .populate('recipient', 'name')
    .sort({ timestamp: -1 });
    
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener conversaciones' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }
    
    message.isRead = true;
    await message.save();
    
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error al marcar mensaje como leído' });
  }
};
