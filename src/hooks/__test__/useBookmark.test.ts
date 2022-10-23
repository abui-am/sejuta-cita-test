import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useBookmark from '../useBookmark';

const data = {
  id: 9,
  title: 'The Subtle Art of Not Giving a F*ck',
  category_id: 1,
  authors: ['Mark Manson'],
  cover_url:
    'https://cdn.sejutacita.id/6138d21e3a09ee0013ee730f/Booku/46cc81d6-07f1-464b-9e4f-0beac07287cd.jpg',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n       molestiae quas vel sint commo',
  sections: [
    {
      title: 'Intro',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n       molesti',
    },
    {
      title: 'Negativity',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n       molestiae quas vel sint commodi repudiandae consequuntur voluptatum',
    },
    {
      title: 'Struggle is unavoidable',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n       molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n       numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n       optio, eaque rerum! Provident similique accusantium nemo aut',
    },
    {
      title: 'You are responsible',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n       molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n       numquam blanditiis harum quisquam',
    },
    {
      title: 'Avoid shitty value',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n       molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n       numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n       optio, eaque rerum! Provident similique accusantium nemo autem. Veri',
    },
    {
      title: 'We may be wrong',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n       molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n       numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n       optio, eaque rerum! Provident similique accusant',
    },
    {
      title: 'Do not dream about immortality',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n       molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n       numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n       optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis\n       obcaecati tenetur iure e',
    },
    {
      title: 'Final notes',
      content: 'Lorem ipsum dolor sit amet consectetur ',
    },
  ],
  audio_length: 1211,
};

describe('useBookmark', () => {
  it('should be functional', async () => {
    const { result } = renderHook(useBookmark);

    // Initial value
    expect(result.current.bookmarks).toStrictEqual([]);

    // Add bookmark
    act(() => result.current.addBookmark(data));

    // Expect it tobe on localStorages
    expect(result.current.bookmarks).toEqual([data]);

    // Remove bookmark by id
    act(() => result.current.removeBookmark(data.id));

    // Expect it tobe empty
    expect(expect(result.current.bookmarks).toEqual([]));
  });
});
