import { randomInt } from 'crypto';

/**
 * @summary
 * Generates a cryptographically secure random integer within a specified range.
 *
 * @function generateSecureRandomNumber
 * @module Utils
 *
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 *
 * @returns {number} A secure random integer.
 * @throws {Error} If min is not less than max.
 */
export function generateSecureRandomNumber(min: number, max: number): number {
  if (min >= max) {
    throw new Error('min must be strictly less than max');
  }
  // crypto.randomInt's max is exclusive, so we add 1 to make it inclusive.
  return randomInt(min, max + 1);
}
