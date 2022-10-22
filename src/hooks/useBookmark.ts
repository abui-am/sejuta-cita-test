import React, { useEffect } from 'react';

import { Book } from '../types/book';

const useBookmark = () => {
  const [bookmarks, setBookmarks] = React.useState<Book[]>([]);

  useEffect(() => {
    if (bookmarks.length !== 0) {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks]);
  useEffect(() => {
    const bm = localStorage.getItem('bookmarks');
    setBookmarks(JSON.parse(bm || '{}'));
  }, []);

  const addBookmark = (bookmark: Book) => {
    // is bookmark already in bookmarks?
    const isBookmarked = bookmarks.some((b) => b.id === bookmark.id);
    if (!isBookmarked) {
      setBookmarks([...bookmarks, bookmark]);
    }
  };

  const removeBookmark = (bookmark: Book) => {
    setBookmarks(bookmarks.filter((b) => b.id !== bookmark.id));
  };
  return { bookmarks, addBookmark, removeBookmark };
};

export default useBookmark;
