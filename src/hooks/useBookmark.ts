import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';

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
      toast.success(`${bookmark.title} Successfully added to bookmarks`);
    } else {
      toast(`${bookmark.title} Already in bookmarks`);
    }
  };

  const removeBookmark = (bookmarkId: number) => {
    setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
    toast.success(`Successfully delete bookmarks`);
  };
  return { bookmarks, addBookmark, removeBookmark };
};

export default useBookmark;
