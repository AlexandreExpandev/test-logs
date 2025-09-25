import { Router } from 'express';
import * as configController from '@/api/internal/config/controller';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

/**
 * @api {get} /api/internal/config/game Get game configuration
 * @apiName GetGameConfig
 * @apiGroup Config
 * @apiVersion 1.0.0
 * @apiDescription Retrieves the current min/max range for the game.
 * @apiHeader {String} Authorization Bearer token for authentication.
 * @apiSuccess {Number} minRange The minimum number in the range.
 * @apiSuccess {Number} maxRange The maximum number in the range.
 * @apiError {String} code Error code (e.g., 'UNAUTHORIZED').
 * @apiError {String} message Error description.
 */
// In a real app, authMiddleware would protect this route for administrators.
router.get('/game', authMiddleware, configController.getHandler);

/**
 * @api {put} /api/internal/config/game Update game configuration
 * @apiName UpdateGameConfig
 * @apiGroup Config
 * @apiVersion 1.0.0
 * @apiDescription Updates the min/max range for the game. (Admin only)
 * @apiHeader {String} Authorization Bearer token for authentication.
 * @apiParam {Number} minRange The new minimum number.
 * @apiParam {Number} maxRange The new maximum number.
 * @apiSuccess {Number} minRange The updated minimum number.
 * @apiSuccess {Number} maxRange The updated maximum number.
 * @apiError {String} code Error code (e.g., 'UNAUTHORIZED', 'VALIDATION_ERROR').
 * @apiError {String} message Error description.
 */
// In a real app, authMiddleware would protect this route for administrators.
router.put('/game', authMiddleware, configController.putHandler);

export default router;
