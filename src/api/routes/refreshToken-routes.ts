import express from 'express';

const router = express.Router();
import refreshTokenController from '../controllers/refreshToken-controller';

router.delete('/logout/:userId', refreshTokenController.logout);

export = router; 