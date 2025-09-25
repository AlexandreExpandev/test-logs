import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

/**
 * @summary
 * Creates a validation middleware using a Zod schema.
 * 
 * @param {AnyZodObject} schema - The Zod schema to validate against.
 * 
 * @returns {Function} An Express middleware function.
 */
export const validationMiddleware = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error); // Pass the ZodError to the global error handler
    }
  };
