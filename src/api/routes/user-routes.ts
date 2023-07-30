import express from 'express';
import usersController from '../controllers/user-controller';

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);

router.post('/login', usersController.login);
router.post('/register', usersController.register);

router.patch('/:userId', usersController.updateProfile);

router.delete('/:userId', usersController.deactivateAccount);

export = router;