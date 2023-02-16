import type { Board, Column } from '../../model';

type BoardColumns = {
  id: number;
  columns: Omit<Column, 'items'>[];
};

export function getBoardColumns(boardId: number): BoardColumns {
  // could fetch available columns to a specific board and return it
  const data = {
    id: boardId,
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
  return data;
}

export function changeBoardBranchStatus({
  board,
  branch,
  columnKey,
}: {
  board: Board;
  branch: string;
  columnKey: string;
}) {
  if (!board || !branch || !columnKey) {
    throw new Error(
      'board, branch, previous, and the new status must be provided'
    );
  }

  const boardCopy = structuredClone(board);
  const boardWithoutPreviousBranch = boardCopy.map((column) => ({
    ...column,
    items: column.items.filter((item) => item !== branch),
  }));

  const boardWithNewItem = boardWithoutPreviousBranch.map((column) =>
    column.key === columnKey
      ? { ...column, items: [branch, ...column.items] }
      : column
  );

  return boardWithNewItem;
}
