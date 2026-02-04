import { ApplicationError } from '@/errors';

export type ApiErrorCode = 'VALIDATION_ERROR' | 'NETWORK_REQUEST_ERROR' | 'NETWORK_ERROR';

export class ApiError extends ApplicationError<ApiErrorCode> {
  constructor(code: ApiErrorCode, message?: string, context?: Record<string, unknown>) {
    super(code, message, context);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
