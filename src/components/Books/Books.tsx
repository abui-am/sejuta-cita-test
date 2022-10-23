import clsx from 'clsx';
import React, { useCallback, useEffect } from 'react';

import {
  getFreeAssestmentBooks,
  getFreeAssestmentCategories,
} from '../../api/feeApi';
import useBookmark from '../../hooks/useBookmark';
import { Book } from '../../types/book';
import { Category } from '../../types/category';
import Container from '../Container/Container';
import Pagination from '../Pagination/Pagination';
import BookComponent from './Book';
import BookSkeleton from './BookSkeleton';

function Books({ searchText }: { searchText: string }) {
  const [page, setPage] = React.useState<number>(1);
  const [perPage, setPerPage] = React.useState<number>(10);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoryId, setCategoryId] = React.useState<number | null>(1);
  const [books, setBooks] = React.useState<Book[]>([]);
  const { addBookmark } = useBookmark();
  const handleOnPerPageChange = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const getCategories = async () => {
    const res = await getFreeAssestmentCategories();
    setCategories(res);
  };
  const getBooks = useCallback(async () => {
    setIsLoading(true);
    const res = await getFreeAssestmentBooks({
      categoryId,
      page: page - 1,
      size: perPage,
    });

    setBooks(res);
    setIsLoading(false);
  }, [categoryId, page, perPage]);

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
        <h1 className="font-bold sm:text-lg lg:text-2xl">Categories</h1>
        <div className="flex mt-4 -mx-1 flex-wrap ">
          {categories?.map((category) => (
            <button
              type="button"
              onClick={() => {
                setCategoryId(category.id);
                setPage(1);
              }}
              name={category.name}
              key={category.id}
              className={clsx(
                categoryId === category.id &&
                  'bg-primary text-white border-primary',
                'rounded-lg border mx-1 px-2 py-2 my-1',
              )}
            >
              <span className="text-sm sm:text-base">{category.name}</span>
            </button>
          ))}
        </div>
      </Container>
      <Container className="mt-6 sm:mt-10 pt-4 sm:pt-10 from-orange-50 to-transparent bg-gradient-to-b">
        <h1 className="font-bold sm:text-lg lg:text-2xl">Books</h1>
        <div className="grid flex-wrap grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <BookSkeleton key={index} />
              ))
            : filteredBooks?.map((book) => (
                <BookComponent
                  onClickBookmark={() => addBookmark(book)}
                  book={book}
                  key={book.id}
                />
              ))}
        </div>
        <div className="flex justify-center mt-6 mb-6">
          <Pagination
            onPerPageChange={handleOnPerPageChange}
            siblingCount={3}
            onClickNext={setPage}
            onClickPrev={setPage}
            onPageChange={setPage}
            pageSize={perPage}
            totalCount={50}
            currentPage={page}
          />
        </div>
      </Container>
    </>
  );
}

export default Books;
