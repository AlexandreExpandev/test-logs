import { Router } from 'express';
// import { authMiddleware } from '@/middleware/auth';
import gameRoutes from './game.routes';
import configRoutes from './config.routes';

const router = Router();

// All internal routes would be protected by the authentication middleware.
// For this simple game, we are leaving it open for easy testing.
// router.use(authMiddleware);

router.use('/game', gameRoutes);
router.use('/config', configRoutes);

export default router;
