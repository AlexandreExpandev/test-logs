import { Router } from 'express';
import * as healthController from '@/api/external/health/controller';

const router = Router();

/**
 * @api {get} /api/external/health Health Check
 * @apiName HealthCheck
 * @apiGroup External
 * @apiVersion 1.0.0
 * @apiDescription Checks the health of the service.
 * @apiSuccess {String} status Service status.
 * @apiSuccess {String} timestamp Current server timestamp.
 */
router.get('/health', healthController.getHandler);

// Future public routes (e.g., authentication, registration) can be added here.

export default router;
