import { z } from 'zod';

import { request } from '../../request';
import { CommentSchema, UpdateCommentSchema } from '../../schema';

type SohoComment = z.infer<typeof CommentSchema>;
type SohoUpdateCommentPayload = z.infer<typeof UpdateCommentSchema>;

export const updateComment = async (id: string, comment: Partial<SohoUpdateCommentPayload>): Promise<SohoComment> => {
  return request({ url: `/comments/${id}`, method: 'put', schema: CommentSchema, config: { data: comment } });
};
