import React from 'react';

import { Book as BookType } from '../../types/book';
import ButtonRounded from '../Button/ButtonRounded';

function Book({
  book,
  onClickBookmark,
}: {
  book: BookType;
  onClickBookmark: () => void;
}) {
  return (
    <div key={book.id}>
      <div className="relative">
        <img
          src={book.cover_url}
          alt={book.title}
          width="100%"
          className="mb-2 rounded-lg"
        />
        <ButtonRounded
          onClick={onClickBookmark}
          className="bg-white absolute bottom-2 right-2"
        >
          BM
        </ButtonRounded>
      </div>
      <h2 className="font-bold text-sm">{book.title}</h2>
      <p className="mt-2 truncate text-xs text-gray-600">{book.description}</p>
    </div>
  );
}

export default Book;
