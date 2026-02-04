import { z } from 'zod';

import { request } from '../../request';
import { CommentListSchema, CommentSchema } from '../../schema';

type SohoComment = z.infer<typeof CommentSchema>;

export const getComments = async (): Promise<Array<SohoComment>> => {
  return request({ url: '/comments', schema: CommentListSchema });
};
