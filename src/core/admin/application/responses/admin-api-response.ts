export type AdminApiSuccessResponse<TData> = {
  success: true;
  data: TData;
};

export type AdminApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type AdminApiResponse<TData> =
  | AdminApiSuccessResponse<TData>
  | AdminApiErrorResponse;

export function adminApiSuccess<TData>(
  data: TData,
): AdminApiSuccessResponse<TData> {
  return {
    success: true,
    data,
  };
}

export function adminApiError(
  code: string,
  message: string,
): AdminApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
}