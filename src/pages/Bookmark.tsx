import React, { useState } from 'react';

import BookComponent from '../components/Books/Book';
import Container from '../components/Container/Container';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import useBookmark from '../hooks/useBookmark';

function Bookmark() {
  const [searchText, setSearchText] = useState<string>('');
  const { bookmarks } = useBookmark();
  const filteredBooks = bookmarks.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  return (
    <main>
      <Header
        onChangeSearchText={(str) => {
          setSearchText(str);
        }}
      />
      <Container>
        <div className="grid grid-cols-2 gap-4">
          {filteredBooks.map((book) => (
            <BookComponent
              book={book}
              key={book.id + book.title}
              onClickBookmark={() => {}}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </main>
  );
}

export default Bookmark;
