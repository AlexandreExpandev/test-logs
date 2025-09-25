import { Router } from 'express';
import externalRoutes from '@/routes/external.routes';
import internalRoutes from '@/routes/internal.routes';

const router = Router();

router.use('/external', externalRoutes);
router.use('/internal', internalRoutes);

export default router;
