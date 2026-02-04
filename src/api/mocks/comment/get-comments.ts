import { delay, PathParams } from 'msw';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

import { CommentSchema } from '../../schema';
import commentsList from './get-comments-list-success.json';

type SohoComment = z.infer<typeof CommentSchema>;

export const getComments = http.get<PathParams, SohoComment[]>('/comments', async () => {
  await delay();

  return HttpResponse.json(commentsList, { status: 200 });
});
