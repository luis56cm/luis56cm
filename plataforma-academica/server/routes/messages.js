// routes/messages.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/', auth, messageController.sendMessage);
router.get('/', auth, messageController.getConversations);
router.put('/:messageId/read', auth, messageController.markAsRead);

module.exports = router;
