import { AxiosError } from 'axios';
import { ZodError } from 'zod';

import { ApplicationError } from '@/errors';

export function isApplicationError(error: unknown): error is ApplicationError {
  return error instanceof ApplicationError;
}

export function isApplicationNetworkError(error: unknown): error is ApplicationError {
  return isApplicationError(error) && error.code === 'NETWORK_ERROR';
}

export function isApplicationValidateError(error: unknown): error is ApplicationError {
  return isApplicationError(error) && error.code === 'VALIDATION_ERROR';
}

export function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof AxiosError;
}

export function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}
