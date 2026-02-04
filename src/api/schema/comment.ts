import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.string(),
  time: z.number(),
  author: z.string(),
  text: z.string(),
  timestamp: z.number(),
  resolved: z.boolean(),
});

export const CommentListSchema = z.array(CommentSchema);

export const CreateCommentSchema = CommentSchema.omit({ id: true });

export const UpdateCommentSchema = CommentSchema.partial().required({ id: true });
