import { AxiosRequestConfig, isAxiosError } from 'axios';
import { z } from 'zod';

import { client } from './client';
import { ApiError } from './error';
import { isZodError } from './utils';

export type RequestParams<Payload> = {
  url: string;
  method?: 'get' | 'post' | 'put';
  config?: AxiosRequestConfig;
  schema?: z.ZodSchema<Payload>;
};

export async function request<Payload>({
  url,
  method = 'get',
  config = {},
  schema,
}: RequestParams<Payload>): Promise<Payload> {
  try {
    const response = await client.request<Payload>({ url, method, ...config });

    if (schema) {
      return schema.parse(response.data);
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new ApiError('NETWORK_REQUEST_ERROR', undefined, {
        response: error.response,
      });
    }

    if (isZodError(error)) {
      throw new ApiError('VALIDATION_ERROR', undefined, {
        errors: error.issues,
      });
    }

    throw new ApiError('NETWORK_ERROR', undefined, {
      nativeError: error,
    });
  }
}
