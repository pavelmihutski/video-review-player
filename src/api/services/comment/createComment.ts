import { z } from 'zod';

import { createComment as createCommentRequest } from '../../endpoints';
import { CreateCommentSchema } from '../../schema';

type SohoCreateCommentPayload = z.infer<typeof CreateCommentSchema>;

export const createComment = async (payload: SohoCreateCommentPayload) => {
  return createCommentRequest(payload);
};
