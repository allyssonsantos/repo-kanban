import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { boardService } from './services';
import { BoardFeature } from './BoardFeature';

jest.mock('./services', () => ({
  boardService: {
    ...jest.requireActual('./services').boardService,
    getBoardColumns: jest.fn(),
  },
}));

const mockedRepo = {
  id: 1,
  name: 'fake repo',
  description: 'fake description',
  stars: 1000,
  starUrl: 'http://foo.bar',
};

const mockedBranches = ['main', 'staging', 'develop'];

const mockedColumns = {
  id: 'foo',
  columns: [
    {
      id: 'some-uuid',
      key: 'inProgress',
      name: 'In progress',
    },
    {
      id: 'some-uuid-review',
      key: 'review',
      name: 'Review',
    },
    {
      id: 'some-uuid-ready-to-merge',
      key: 'readyToMerge',
      name: 'Ready to merge',
    },
  ],
};

describe('BoardFeature component', () => {
  const user = userEvent.setup();

  it('should render the correct elements', () => {
    (boardService.getBoardColumns as jest.Mock).mockReturnValue(mockedColumns);

    render(<BoardFeature repo={mockedRepo} branches={mockedBranches} />);

    expect(
      screen.getByRole('link', { name: 'Go back to home page' })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { level: 1, name: mockedRepo.name })
    ).toBeVisible();
    expect(screen.getByText(mockedRepo.description)).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'This repository has 1000 stars' })
    ).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'This repository has 1000 stars' })
    ).toHaveTextContent('1K');

    const columns = screen.getAllByTestId('column-name');
    const [firstColumn, secondColumn, thridColumn] = columns;

    expect(columns).toHaveLength(3);
    expect(firstColumn.textContent).toMatchInlineSnapshot(`"In progress (3)"`);
    expect(secondColumn.textContent).toMatchInlineSnapshot(`"Review (0)"`);
    expect(thridColumn.textContent).toMatchInlineSnapshot(
      `"Ready to merge (0)"`
    );
  });

  it('should move branch to next column when click in next button', async () => {
    (boardService.getBoardColumns as jest.Mock).mockReturnValue(mockedColumns);
    render(<BoardFeature repo={mockedRepo} branches={mockedBranches} />);

    expect(screen.getByText('In progress (3)')).toBeVisible();
    expect(screen.getByText('Review (0)')).toBeVisible();

    await user.click(
      screen
        .getByTitle('main')
        .querySelector('[data-testid="move-next"]') as Element
    );

    expect(screen.getByText('In progress (2)')).toBeVisible();
    expect(screen.getByText('Review (1)')).toBeVisible();

    await user.click(
      screen
        .getByTitle('main')
        .querySelector('[data-testid="move-next"]') as Element
    );

    expect(screen.getByText('In progress (2)')).toBeVisible();
    expect(screen.getByText('Review (0)')).toBeVisible();
    expect(screen.getByText('Ready to merge (1)')).toBeVisible();

    await user.click(
      screen
        .getByTitle('main')
        .querySelector('[data-testid="move-prev"]') as Element
    );

    expect(screen.getByText('In progress (2)')).toBeVisible();
    expect(screen.getByText('Review (1)')).toBeVisible();
    expect(screen.getByText('Ready to merge (0)')).toBeVisible();
  });
});
