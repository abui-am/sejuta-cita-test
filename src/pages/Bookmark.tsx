import React, { useState } from 'react';

import BookComponent from '../components/Books/Book';
import Container from '../components/Container/Container';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Pagination from '../components/Pagination/Pagination';
import useBookmark from '../hooks/useBookmark';

function Bookmark() {
  const [page, setPage] = React.useState<number>(1);
  const [perPage, setPerPage] = React.useState<number>(10);
  const [searchText, setSearchText] = useState<string>('');
  const { bookmarks, removeBookmark } = useBookmark();

  const handleOnPerPageChange = (value: number) => {
    setPerPage(value);
    setPage(1);
  };
  const filteredBooks = bookmarks
    .filter?.((book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    .slice((page - 1) * perPage, page * perPage);
  return (
    <>
      <Header
        onChangeSearchText={(str) => {
          setSearchText(str);
        }}
      />
      <Container className="mt-6 sm:mt-10 pt-4 sm:pt-10 from-orange-50 to-transparent bg-gradient-to-b">
        <h1 className="font-bold sm:text-lg lg:text-2xl">Bookmark</h1>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBooks.map((book) => (
            <BookComponent
              bookmarkType="delete"
              book={book}
              key={book.id + book.title}
              onClickBookmark={() => {
                removeBookmark(book.id);
              }}
            />
          ))}
        </div>
      </Container>
      <div className="flex justify-center mt-6 mb-6">
        <Pagination
          onPerPageChange={handleOnPerPageChange}
          siblingCount={3}
          onClickNext={setPage}
          onClickPrev={setPage}
          onPageChange={setPage}
          pageSize={perPage}
          totalCount={bookmarks.length}
          currentPage={page}
        />
      </div>
      <Footer />
    </>
  );
}

export default Bookmark;
