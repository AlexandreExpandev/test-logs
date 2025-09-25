import { z } from 'zod';

// Example of shared Zod validation schemas

// Foreign Key (ID)
export const zFK = z.coerce.number().int().positive({ message: 'ID must be a positive integer.' });
export const zNullableFK = z.coerce.number().int().positive().nullable();

// Common string types
export const zName = z.string().min(2, { message: 'Name must be at least 2 characters long.' }).max(100);
export const zDescription = z.string().min(2).max(500);
export const zNullableDescription = zDescription.nullable();

// Bit/Boolean
export const zBit = z.boolean();
