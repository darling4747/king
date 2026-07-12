const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Map routing endpoints to controller methods
router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUserByPhone);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
