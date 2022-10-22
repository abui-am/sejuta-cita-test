import React from 'react';
import { Bookmark, BookmarkFill } from 'react-bootstrap-icons';

import { Book as BookType } from '../../types/book';
import ButtonRounded from '../Button/ButtonRounded';

function Book({
  book,
  onClickBookmark,
  bookmarkType = 'add',
}: {
  book: BookType;
  onClickBookmark: () => void;
  bookmarkType?: 'add' | 'delete';
}) {
  return (
    <div key={book.id}>
      <div className="relative rounded-lg overflow-hidden mb-2">
        <img src={book.cover_url} alt={book.title} width="100%" />
        <div className="absolute bottom-0 h-20 w-full right-0  from-gray-900 to-transparent bg-gradient-to-t opacity-40" />
        {bookmarkType === 'delete' ? (
          <ButtonRounded
            onClick={onClickBookmark}
            className="bg-white absolute bottom-2 right-2 bg-opacity-30 border-transparent"
          >
            <BookmarkFill className="text-white" />
          </ButtonRounded>
        ) : (
          <ButtonRounded
            onClick={onClickBookmark}
            className="bg-white absolute bottom-2 right-2 bg-opacity-30 border-transparent"
          >
            <Bookmark className="text-white" />
          </ButtonRounded>
        )}
      </div>
      <h2 className="font-bold text-sm mb-2 sm:text-lg">{book.title}</h2>
      <p className="text-xs font-bold text-gray-600 mb-2 sm:text-base">
        {book.authors.join(', ')}
      </p>
      <p className="truncate text-xs text-gray-600 sm:text-base">
        {book.description}
      </p>
    </div>
  );
}

export default Book;
