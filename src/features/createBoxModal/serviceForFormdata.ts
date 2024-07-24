import { post } from '@/shared/api/methodsAxios';

export const createBoxRequest = (payload: any) => {
  const { data } = payload;
  return post('/test', data, {
    'Content-Type': 'multipart/form-data',
  });
};
