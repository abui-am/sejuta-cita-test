import clsx from 'clsx';
import React, { useCallback, useEffect } from 'react';

import {
  getFreeAssestmentBooks,
  getFreeAssestmentCategories,
} from '../api/feeApi';
import Container from '../components/Container/Container';
import Pagination from '../components/Pagination/Pagination';
import { Book } from '../types/book';
import { Category } from '../types/category';

function Books({ searchText }: { searchText: string }) {
  const [page, setPage] = React.useState<number>(0);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoryId, setCategoryId] = React.useState<number | null>(1);
  const [books, setBooks] = React.useState<Book[]>([]);
  const getCategories = async () => {
    const res = await getFreeAssestmentCategories();
    setCategories(res.data);
  };
  const getBooks = useCallback(async () => {
    const res = await getFreeAssestmentBooks({
      categoryId,
      page,
      size: 10,
    });
    setBooks(res.data);
  }, [categoryId, page]);
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <Container>
        <h1 className="font-bold">Categories</h1>
        <div className="flex mt-4 -mx-1 -my-1 flex-wrap ">
          {categories?.map((category) => (
            <button
              type="button"
              onClick={() => setCategoryId(category.id)}
              key={category.id}
              className={clsx(
                categoryId === category.id &&
                  'bg-primary text-white border-primary',
                'rounded-lg border mx-1 px-2 py-2 my-1',
              )}
            >
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </Container>
      <Container className="mt-6 pt-4 from-orange-50 to-transparent bg-gradient-to-b">
        {/* bg-orange-100 */}

        <h1 className="font-bold">Books</h1>
        <div className="grid flex-wrap grid-cols-3 mt-4 gap-4">
          {filteredBooks?.map((book) => (
            <div key={book.id}>
              <img
                src={book.cover_url}
                alt={book.title}
                width="100%"
                className="mb-2 rounded-lg"
              />
              <h2 className="font-bold text-sm">{book.title}</h2>
              <p className="mt-2 truncate text-xs text-gray-600">
                {book.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 mb-6">
          <Pagination
            siblingCount={5}
            onClickNext={(pg) => {
              setPage(pg);
            }}
            onClickPrev={(pg) => {
              setPage(pg);
            }}
            onPageChange={(pg) => {
              setPage(pg);
            }}
            pageSize={10}
            totalCount={50}
            currentPage={1}
          />
        </div>
      </Container>
    </>
  );
}

export default Books;
