export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error: ApiError;
};

export type ApiError = {
  code: number;
  message: string;
  data?: unknown;
};

export type WsErrorReason = {
  error: {
    code: number;
    message: string;
  };
};
