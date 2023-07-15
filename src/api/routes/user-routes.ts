import express from 'express';
import usersController from '../controllers/user-controller';

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);

router.post('/login', usersController.login);
router.post('/createUser', usersController.createUser);

router.patch('/:userId', usersController.updateUser);

router.delete('/:userId', usersController.deleteUser);

export = router;