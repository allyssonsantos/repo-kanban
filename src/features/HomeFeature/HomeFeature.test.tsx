import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

import { HomeFeature, PREVIOUS_REPOS_LS_KEY } from './HomeFeature';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
  query: jest.fn(),
  events: {
    on: jest.fn(),
  },
});

describe('HomeFeature component', () => {
  const user = userEvent.setup();
  it('should render the correct elements', () => {
    render(<HomeFeature />);

    expect(
      screen.getByRole('heading', { level: 1 }).textContent
    ).toMatchInlineSnapshot(`"Start by pasting the repository URL."`);
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('should redirect to the correct url with correct query params and set search in cache', async () => {
    const repoToBeSearched =
      'https://github.com/allyssonsantos/allyssonsantos.github.io';
    render(<HomeFeature />);

    await user.type(screen.getByRole('textbox'), repoToBeSearched);
    await user.click(screen.getByRole('button'));

    expect(global.Storage.prototype.setItem).toHaveBeenCalledWith(
      PREVIOUS_REPOS_LS_KEY,
      `["${repoToBeSearched}"]`
    );

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/board',
      query: {
        owner: 'allyssonsantos',
        repo: 'allyssonsantos.github.io',
      },
    });
  });

  it("should render an error message if the url isn't in the right pattern and erase it when start typing again", async () => {
    render(<HomeFeature />);

    await user.type(screen.getByRole('textbox'), 'http://error.com');
    await user.click(screen.getByRole('button'));

    expect(
      screen.getByText('Oops! Enter a valid GitHub repository URL.')
    ).toBeVisible();

    await user.type(screen.getByRole('textbox'), 'h');

    expect(
      screen.queryByText('Oops! Enter a valid GitHub repository URL.')
    ).not.toBeInTheDocument();
  });
});
