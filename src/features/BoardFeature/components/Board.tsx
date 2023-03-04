import { Box, Text, Flex, Card, CardContent, Button } from '@/components';
import { ChevronLeft, ChevronRight } from '@/icons';

import type { Column, Board } from '../model';

type ChangeColumn = {
  branch: string;
  newIndex: number;
};

type TBoard = {
  availableColumns: Omit<Column, 'items'>[];
  board: Board;
  onBranchMove: ({
    branch,
    columnKey,
  }: {
    branch: string;
    columnKey: string;
  }) => void;
};

export function Board({ availableColumns, board, onBranchMove }: TBoard) {
  if (!board || !availableColumns) {
    return <Text>Loading...</Text>;
  }

  const handleChangeColumn = ({ branch, newIndex }: ChangeColumn) => {
    const destinationColumn = availableColumns[newIndex];

    if (destinationColumn) {
      const columnKey = destinationColumn.key;
      onBranchMove({ branch, columnKey });
    }
  };

  return (
    <>
      {availableColumns.map((column, index) => {
        const columnBranches = board.find(
          (boardColumns) => boardColumns.id === column.id
        );

        return (
          <Box css={{ width: '100%' }} key={column.name}>
            <Text
              as="span"
              size="1"
              data-testid="column-name"
              css={{
                marginBottom: '$4',
                display: 'inline-block',
                color: '$shade02',
              }}
            >
              {column.name} ({columnBranches?.items.length || 0})
            </Text>
            <Flex direction="column" gap="2">
              {columnBranches?.items.map((branch) => (
                <Card
                  key={branch}
                  css={{ display: 'flex', justifyContent: 'space-between' }}
                  title={branch}
                >
                  <Button
                    variant="icon"
                    data-testid="move-prev"
                    css={{ alignSelf: 'stretch' }}
                    disabled={!Boolean(availableColumns[index - 1])}
                    aria-label={
                      availableColumns[index - 1] &&
                      `move branch to ${
                        availableColumns[index - 1].name
                      } column`
                    }
                    onClick={() =>
                      handleChangeColumn({
                        branch,
                        newIndex: index - 1,
                      })
                    }
                  >
                    <ChevronLeft aria-hidden />
                  </Button>
                  <CardContent>{branch}</CardContent>
                  <Button
                    variant="icon"
                    data-testid="move-next"
                    css={{ alignSelf: 'stretch' }}
                    aria-label={
                      availableColumns[index + 1] &&
                      `move branch to ${
                        availableColumns[index + 1].name
                      } column`
                    }
                    disabled={!Boolean(availableColumns[index + 1])}
                    onClick={() =>
                      handleChangeColumn({
                        branch,
                        newIndex: index + 1,
                      })
                    }
                  >
                    <ChevronRight />
                  </Button>
                </Card>
              ))}
            </Flex>
          </Box>
        );
      })}
    </>
  );
}
