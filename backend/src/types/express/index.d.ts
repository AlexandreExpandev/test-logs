declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      // Add other user properties as needed
    };
  }
}
