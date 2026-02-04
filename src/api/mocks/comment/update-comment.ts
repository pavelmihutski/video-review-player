import { delay, HttpResponse, PathParams } from 'msw';
import { http } from 'msw';
import { z } from 'zod';

import { CommentSchema } from '../../schema';
import commentsList from './get-comments-list-success.json';

type SohoComment = z.infer<typeof CommentSchema>;

const schemas = [
  {
    match: ({ author }: SohoComment) => author === 'bad-request',
    getResponse: () => new HttpResponse('Bad Request', { status: 400 }),
  },
  {
    match: ({ author }: SohoComment) => author === 'success',
    getResponse: () => HttpResponse.json(commentsList, { status: 200 }),
  },
];

export const updateComment = http.put<PathParams, SohoComment>('/comments/:id', async ({ request, params }) => {
  const { id } = params;
  const body = await request.json();

  const schema = schemas.find(schema => schema.match(body));

  await delay();

  if (schema) {
    return schema.getResponse();
  }

  const index = commentsList.findIndex(comment => comment.id === id);

  const updatedComment = { ...commentsList[index], ...body };

  if (index !== -1) {
    commentsList[index] = updatedComment;
  }

  return HttpResponse.json(updatedComment, { status: 200 });
});
