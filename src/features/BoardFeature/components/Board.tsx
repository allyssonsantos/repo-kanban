import { BoardData } from '@/pages/board';
import { Box, Text, Flex, Card, CardContent, Button } from '@/components';
import { ChevronLeft, ChevronRight } from '@/icons';

import { useBoard } from '../hooks/useBoard';

type ChangeColumn = {
  branch: string;
  newIndex: number;
};

export function Board({ repo, branches }: BoardData) {
  const { columns, board, updateBranchStatus } = useBoard({
    boardId: repo.id,
    repoName: repo.name,
    branches,
  });

  if (!board || !columns) {
    return <Text>Loading...</Text>;
  }

  const handleChangeColumn = ({ branch, newIndex }: ChangeColumn) => {
    const destinationColumn = columns[newIndex];

    if (destinationColumn) {
      const columnKey = destinationColumn.key;
      updateBranchStatus({ branch, columnKey });
    }
  };

  return (
    <>
      {columns.map((column, index) => {
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
                    disabled={!Boolean(columns[index - 1])}
                    aria-label={
                      columns[index - 1] &&
                      `move branch to ${columns[index - 1].name} column`
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
                      columns[index + 1] &&
                      `move branch to ${columns[index + 1].name} column`
                    }
                    disabled={!Boolean(columns[index + 1])}
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
