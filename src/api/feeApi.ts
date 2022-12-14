import cache from '../helpers/cache';
import { Book } from '../types/book';
import { Category } from '../types/category';
import api from './base';

export type GetFeeeAssestmentBooksParams = {
  categoryId: number | null;
  page: number;
  size: number;
};
export const getFeeeAssestmentBooks = async (
  params: GetFeeeAssestmentBooksParams,
) =>
  cache.fetch<Book[]>({
    key: 'fee-assessment-books',
    callback: async () => {
      const res = await api.get<Book[]>('/fee-assessment-books', {
        params: {
          categoryId: params.categoryId,
          page: params.page,
          size: params.size,
        },
      });
      return res.data;
    },
    params,
  });

export const getFeeAssestmentCategories = async () =>
  cache.fetch<Category[]>({
    key: 'fee-assessment-categories',
    callback: async () => {
      const res = await api.get<Category[]>('/fee-assessment-categories');
      return res.data;
    },
  });
