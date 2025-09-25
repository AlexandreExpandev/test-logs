export interface ApiResponse<T> {
  success: true;
  data: T;
  metadata: {
    timestamp: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}
