/**
 * @summary
 * Creates a standardized success response object.
 * 
 * @param {T} data - The payload to be included in the response.
 * @param {object} [metadata] - Optional metadata.
 * @returns {object} A success response object.
 */
export const successResponse = <T>(data: T, metadata?: object): object => {
  return {
    success: true,
    data,
    metadata: { ...metadata, timestamp: new Date().toISOString() },
  };
};

/**
 * @summary
 * Creates a standardized error response object.
 * 
 * @param {string} message - The error message.
 * @param {string} code - A unique error code.
 * @param {any} [details] - Optional additional details about the error.
 * @returns {object} An error response object.
 */
export const errorResponse = (message: string, code: string, details?: any): object => {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
};
