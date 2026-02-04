import { z } from 'zod';

import { updateComment as updateCommentRequest } from '../../endpoints';
import { UpdateCommentSchema } from '../../schema';

type SohoUpdateCommentPayload = z.infer<typeof UpdateCommentSchema>;

export const updateComment = async (id: string, payload: Partial<SohoUpdateCommentPayload>) => {
  return updateCommentRequest(id, payload);
};
