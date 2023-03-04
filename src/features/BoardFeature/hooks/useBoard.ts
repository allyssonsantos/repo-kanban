import { useLocalStorage } from '@/hooks';
import { useEffect } from 'react';
import type { Board, Column } from '../model';
import { boardService } from '../services';

type UpdateBranchStatus = {
  branch: string;
  columnKey: string;
};

/**
 * This will handle if the available columns are different from the saved in the
 * localStorage cache, if it's different it will remove or add missing columns.
 * In case of some column is removed, it will get all branches from that column
 * and put in the first column.
 *
 * It still needs to update the localStorage if some property of the available
 * columns changes.
 *
 * @param currentBoard - current saved board
 * @param availableColumns - available columns
 * @returns A new updated board
 */
function updateSavedBoard(
  currentBoard: Board,
  availableColumns: Omit<Column, 'items'>[]
) {
  if (currentBoard.length !== availableColumns.length) {
    const boardWithNewColumns = availableColumns.map((availableColumn) => {
      const alreadyExists = currentBoard.find(
        (current) => current.id === availableColumn.id
      );
      return {
        ...availableColumn,
        items: alreadyExists ? alreadyExists.items : [],
      };
    });

    const orphanColumns = currentBoard.filter(
      (currentColumn) =>
        !boardWithNewColumns.some(
          (newColumn) => newColumn.id === currentColumn.id
        )
    );
    const orphanBranches = orphanColumns
      .map((orphanColumn) => orphanColumn.items)
      .flat();

    boardWithNewColumns[0].items = [
      ...boardWithNewColumns[0].items,
      ...orphanBranches,
    ];

    return boardWithNewColumns;
  }

  return currentBoard;
}

export function useBoard({
  boardId,
  repoName,
  branches,
}: {
  boardId: number;
  repoName: string;
  branches: string[];
}) {
  const availableColumns = boardService.getBoardColumns(boardId).columns;
  const initialBoard = availableColumns.map((column, index) => ({
    id: column.id,
    key: column.key,
    name: column.name,
    items: index === 0 ? branches : [],
  }));

  const [currentBoard, setCurrentBoard] = useLocalStorage<Board>(
    repoName,
    initialBoard
  );

  useEffect(() => {
    if (currentBoard) {
      setCurrentBoard(updateSavedBoard(currentBoard, availableColumns));
    }
  }, [availableColumns, currentBoard, setCurrentBoard]);

  const updateBranchStatus = ({ branch, columnKey }: UpdateBranchStatus) => {
    if (currentBoard) {
      const newBoard = boardService.changeBoardBranchStatus({
        board: currentBoard as Board,
        branch,
        columnKey,
      });
      setCurrentBoard(newBoard);
    }
  };

  return {
    board: currentBoard,
    availableColumns,
    updateBranchStatus,
  };
}
