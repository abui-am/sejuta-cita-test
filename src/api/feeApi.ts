import { Category } from '../types';
import api from './base';

export type GetFreeAssestmentBooksParams = {
  categoryId: number | null;
  page: number;
  size: number;
};
export const getFreeAssestmentBooks = async (
  params: GetFreeAssestmentBooksParams,
) =>
  api.get('/fee-assessment-books', {
    params: {
      categoryId: params.categoryId,
      page: params.page,
      size: params.size,
    },
  });

export const getFreeAssestmentCategories = async () =>
  api.get<Category[]>('/fee-assessment-categories');
