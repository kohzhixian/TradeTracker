const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user-controller');

router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);

router.post('/login', usersController.login);
router.post('/createUser', usersController.createUser);

router.patch('/:userId', usersController.updateUser);

router.delete('/:userId', usersController.deleteUser);

module.exports = router;