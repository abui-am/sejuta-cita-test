import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Books from '../Books';
import book from './json/book.json';
import book12 from './json/book12.json';

const handlers = [
  rest.get(
    '/fee-assessment-books?categoryId=1&page=0&size=10',
    (req, res, ctx) => {
      const categoryId = req.url.searchParams.get('categoryId');
      const page = req.url.searchParams.get('page');
      const size = req.url.searchParams.get('size');
      if (categoryId === '1' && page === '0' && size === '10') {
        return res(ctx.json(book[1]));
      }
      if (categoryId === '1' && page === '1' && size === '10') {
        return res(ctx.json(book[2]));
      }
      if (categoryId === '1' && page === '0' && size === '20') {
        return res(ctx.json(book['1s20']));
      }
      if (categoryId === '12' && page === '0' && size === '10') {
        return res(ctx.json(book12));
      }
      return res(ctx.status(404));
    },
  ),

  rest.get('/fee-assessment-categories', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          name: 'Happiness & Mindfulness',
        },
        {
          id: 11,
          name: 'Career & Business',
        },
        {
          id: 12,
          name: 'Productivity & Time Management',
        },
        {
          id: 19,
          name: 'Society & Politics',
        },
        {
          id: 21,
          name: 'Investment & Finance',
        },
      ]),
    ),
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('Books Test', () => {
  it('should render book with categoryId 1 on first render', async () => {
    const { findByText } = render(<Books searchText="" />);
    expect(await findByText('The Intelligent Investor')).toBeVisible();
    expect(await findByText('Eat to Live')).toBeVisible();
    expect(await findByText('Ikigai')).toBeVisible();
    expect(await findByText('The Little Book of Hygge')).toBeVisible();
    expect(await findByText('The Mastery of Love')).toBeVisible();
    expect(await findByText('Joyful')).toBeVisible();
  });

  it('should render book with categoryId 12 when clicking button Productivity & Time Management', async () => {
    const { findByText, findByRole } = render(<Books searchText="" />);
    // Available on cat 1
    const bookExample = await findByText('The Subtle Art of Not Giving a F*ck');
    expect(bookExample).toBeVisible();
    const button = await findByRole('button', {
      name: 'Productivity & Time Management',
    });

    await userEvent.click(button);

    // Test onClick class
    expect(button).toHaveClass('bg-primary');
    // Not available on cat 12
    expect(bookExample).not.toBeVisible();
    expect(await findByText('The Little Book of Hygge')).toBeVisible();
  });

  it('should change page when clicking pagination', async () => {
    const { findByText } = render(<Books searchText="" />);
    // Available on cat 1
    const bookExample = await findByText('The Subtle Art of Not Giving a F*ck');
    expect(bookExample).toBeVisible();
    const button = await findByText('2');

    await userEvent.click(button);

    // Not available on page 2
    expect(bookExample).not.toBeVisible();

    expect(await findByText('Joyful')).toBeVisible();
  });

  it('should able to search', async () => {
    const { findByText, queryByText } = render(
      <Books searchText="Brain Mak" />,
    );
    expect(queryByText('The Subtle Art of Not Giving a F*ck')).toBe(null);
    expect(await findByText('Brain Maker')).toBeVisible();
  });

  it('should able to change item per page', async () => {
    const { getByTestId, findByText, queryByText } = render(
      <Books searchText="" />,
    );
    expect(queryByText('How I Built This')).toBe(null);
    await userEvent.selectOptions(getByTestId('select-per-page'), '20 books');
    expect(await findByText(/How I Built This/g)).toBeVisible();
  });
});
