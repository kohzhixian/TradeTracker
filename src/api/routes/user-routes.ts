import express from 'express';
import usersController from '../controllers/user-controller';
import userController from '../controllers/user-controller';

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);

router.post('/login', usersController.login);
router.post('/register', usersController.register);

router.patch('/updateProfile', usersController.updateProfile);
router.patch('/updatePassword', userController.updatePassword);

router.delete('/deactivateAccount', usersController.deactivateAccount);

export = router;