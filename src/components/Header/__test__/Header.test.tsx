import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { vi } from 'vitest';

import Header from '../Header';

describe('Header', () => {
  it('should call onChangeSearchText on input change', async () => {
    const onChangeSearchText = vi.fn();

    const router = createBrowserRouter([
      {
        path: '/',
        element: <Header onChangeSearchText={onChangeSearchText} />,
      },
    ]);
    const { queryAllByPlaceholderText } = render(
      <RouterProvider router={router} />,
    );
    const input = queryAllByPlaceholderText('Search here...')[0];
    await userEvent.type(input, 'test');
    expect(onChangeSearchText).toBeCalledWith('test');
  });
});
