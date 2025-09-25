import { Router } from 'express';
import * as configController from '@/api/internal/config/controller';
import { adminAuthMiddleware } from '@/middleware/adminAuth';

const router = Router();

/**
 * @api {get} /api/internal/config Get Game Configuration
 * @apiName GetConfig
 * @apiGroup Config
 * @apiVersion 1.0.0
 * @apiDescription Retrieves the current game number range configuration.
 * @apiSuccess {Number} minRange The minimum number in the range.
 * @apiSuccess {Number} maxRange The maximum number in the range.
 */
router.get('/', configController.getHandler);

/**
 * @api {put} /api/internal/config Update Game Configuration
 * @apiName UpdateConfig
 * @apiGroup Config
 * @apiVersion 1.0.0
 * @apiDescription Updates the game number range configuration. Requires admin access.
 * @apiHeader {String} x-admin-auth Admin secret key for authorization.
 * @apiParam {Number} minRange The new minimum number.
 * @apiParam {Number} maxRange The new maximum number.
 * @apiSuccess {Number} minRange The updated minimum number.
 * @apiSuccess {Number} maxRange The updated maximum number.
 * @apiError {String} code FORBIDDEN if admin key is missing or invalid.
 * @apiError {String} code VALIDATION_ERROR if input is invalid.
 */
router.put('/', adminAuthMiddleware, configController.putHandler);

export default router;
