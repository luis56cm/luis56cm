// controllers/notificationController.js
const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
  try {
    const { recipient, type, title, message, courseId } = req.body;
    const notification = new Notification({
      recipient,
      sender: req.user._id,
      type,
      title,
      message,
      courseId
    });
    await notification.save();
    // Aquí podrías implementar WebSockets para notificaciones en tiempo real
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la notificación", error });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .populate('sender', 'name')
      .populate('courseId', 'name');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener notificaciones", error });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: "Notificación marcada como leída" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la notificación", error });
  }
};