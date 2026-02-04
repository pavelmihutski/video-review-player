import { delay, http, HttpResponse } from 'msw';
import { PathParams } from 'msw';
import { z } from 'zod';

import { CommentSchema, CreateCommentSchema } from '../../schema';
import commentsList from './get-comments-list-success.json';

type SohoComment = z.infer<typeof CommentSchema>;
type SohoCreateComment = z.infer<typeof CreateCommentSchema>;

const schemas = [
  {
    match: ({ author }: SohoCreateComment) => author === 'bad-request',
    getResponse: () => new HttpResponse('Bad Request', { status: 400 }),
  },
];

export const createComment = http.post<PathParams, SohoCreateComment>('/comments', async ({ request }) => {
  const body = await request.json();

  const schema = schemas.find(schema => schema.match(body));

  await delay();

  if (schema) {
    return schema.getResponse();
  }

  const newComment: SohoComment = {
    id: `c_${commentsList.length + 1}`,
    ...body,
  };

  commentsList.push(newComment);

  return HttpResponse.json(newComment, { status: 201 });
});
