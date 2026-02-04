import { getComments } from '../../endpoints';

export const fetchComments = async () => {
  return getComments();
};
