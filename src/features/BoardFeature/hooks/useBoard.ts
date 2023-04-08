import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks';
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
 * TODO: It still needs to update the localStorage if some property of the available
 * columns changes.
 *
 * @param savedBoard - current saved board
 * @param availableColumns - available columns
 * @returns A new updated board
 */
function updateSavedBoard({
  savedBoard,
  availableColumns,
  branches,
}: {
  savedBoard: Board;
  availableColumns: Omit<Column, 'items'>[];
  branches: string[];
}) {
  /**
   * if number of columns of the current board is different from the available
   * columns, it means that the saved board has less or more columns. The board
   * service could have deleted or added columns.
   * So, we need to remove or add the new columns, if some columns is deleted
   * we need to move all the branches that were in that column to the first
   * available column.
   */
  if (savedBoard.length !== availableColumns.length) {
    /**
     * we loop trough the available columns and if it already exists in the
     * current board we just keep it as it is, if it's a new one we created it
     * with empty items.
     */
    const boardWithNewColumns = availableColumns.map((availableColumn) => {
      const alreadyExists = savedBoard.find(
        (current) => current.id === availableColumn.id
      );
      return {
        ...availableColumn,
        items: alreadyExists ? alreadyExists.items : [],
      };
    });

    // here we get the deleted columns (if it exists)
    const orphanColumns = savedBoard.filter(
      (currentColumn) =>
        !boardWithNewColumns.some(
          (newColumn) => newColumn.id === currentColumn.id
        )
    );

    // here we get only the names of the saved branches from the deleted column
    const orphanBranches = orphanColumns
      .map((orphanColumn) => orphanColumn.items)
      .flat();

    // put all the branches from the deleted column in the first one
    boardWithNewColumns[0].items = [
      ...boardWithNewColumns[0].items,
      ...orphanBranches,
    ];

    return boardWithNewColumns;
  }

  /**
   * now we need to check if any new branch was added and add it to the first
   * available column
   */

  // here we get saved branches from each columns
  const savedBranches = savedBoard.reduce<string[]>(
    (savedBranches, currentColumn) => {
      savedBranches = [...savedBranches, ...currentColumn.items];
      return savedBranches;
    },
    []
  );

  // now we will check if the branches from the API stays the same or if we get
  // any new branch or if some was deleted.
  const newBranches = branches.filter(
    (branch) => !savedBranches.includes(branch)
  );
  const deletedBranches = savedBranches.filter(
    (savedBranch) => !branches.includes(savedBranch)
  );

  if (newBranches.length || deletedBranches.length) {
    const boardWithNewBranchesOnIt = savedBoard.map((column, index) => {
      if (index === 0 && newBranches.length) {
        column.items = [...column.items, ...newBranches];
      }

      const itemsWithoutDeletedBranch = column.items.filter(
        (branch) => !deletedBranches.includes(branch)
      );

      return {
        ...column,
        items: itemsWithoutDeletedBranch,
      };
    });

    return boardWithNewBranchesOnIt;
  }

  return savedBoard;
}

export function useBoard({
  repoName,
  branches,
  availableColumns,
}: {
  repoName: string;
  branches: string[];
  availableColumns: Omit<Column, 'items'>[];
}) {
  const initialBoard = availableColumns.map((column, index) => ({
    id: column.id,
    key: column.key,
    name: column.name,
    items: index === 0 ? branches : [],
  }));

  const [savedBoard, setSavedBoard] = useLocalStorage<Board>(
    repoName,
    initialBoard
  );

  const [updatedBoard, setUpdatedBoard] = useState<Board | null>(null);

  useEffect(() => {
    if (savedBoard) {
      const newBoard = updateSavedBoard({
        savedBoard,
        availableColumns,
        branches,
      });

      setUpdatedBoard(newBoard);
    }
  }, [availableColumns, branches, savedBoard]);

  const updateBranchStatus = ({ branch, columnKey }: UpdateBranchStatus) => {
    if (updatedBoard) {
      const newBoard = boardService.changeBoardBranchStatus({
        board: updatedBoard,
        branch,
        columnKey,
      });
      setSavedBoard(newBoard);
    }
  };

  return {
    board: updatedBoard || savedBoard || initialBoard,
    availableColumns,
    updateBranchStatus,
  };
}
