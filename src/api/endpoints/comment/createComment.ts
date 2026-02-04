import { z } from 'zod';

import { request } from '../../request';
import { CommentSchema, CreateCommentSchema } from '../../schema';

type SohoCreateCommentPayload = z.infer<typeof CreateCommentSchema>;
type SohoComment = z.infer<typeof CommentSchema>;

export const createComment = async (payload: SohoCreateCommentPayload): Promise<SohoComment> => {
  return request({ url: '/comments', method: 'post', schema: CommentSchema, config: { data: payload } });
};
