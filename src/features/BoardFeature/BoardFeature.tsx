import React from 'react';
import Link from 'next/link';

import type { TBoardData } from '@/types';
import { Box, Button, Flex, Text } from '@/components';
import { ArrowBack, Star } from '@/icons';
import { useBoard } from './hooks/useBoard';
import { Board } from './components';

const kFormatter = Intl.NumberFormat('en', { notation: 'compact' });

export function BoardFeature({ repo, branches }: TBoardData) {
  const { availableColumns, board, updateBranchStatus } = useBoard({
    boardId: repo.id,
    repoName: repo.name,
    branches,
  });

  return (
    <Flex direction="column" gap="6" full>
      <Flex justify="between" gap="1" css={{ paddingInline: '$2' }}>
        <Button
          as={Link}
          variant="icon"
          css={{ alignSelf: 'flex-start', flexShrink: 0 }}
          aria-label="Go back to home page"
          href="/"
        >
          <ArrowBack aria-hidden />
        </Button>
        <Box>
          <Text as="h1" size="4" css={{ marginBottom: '$4' }}>
            {repo.name}
          </Text>
          <Text as="p" size="2" color="light" css={{ maxWidth: 367 }}>
            {repo.description}
          </Text>
        </Box>
        <Button
          as={Link}
          href={repo.starUrl}
          target="_blank"
          variant="icon"
          aria-label={`This repository has ${repo.stars} stars`}
          css={{
            alignSelf: 'flex-start',
            paddingInline: '$3',
            gap: '$2',
            textTransform: 'lowercase',
            flexShrink: 0,
          }}
        >
          <Star aria-hidden /> {kFormatter.format(repo.stars)}
        </Button>
      </Flex>
      <Box css={{ overflow: 'auto' }}>
        <Box
          css={{
            display: 'grid',
            gap: '$4',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            paddingBottom: '$3',
            paddingInline: '$3',
            minWidth: 650,
          }}
        >
          <Board
            availableColumns={availableColumns}
            board={board}
            onBranchMove={updateBranchStatus}
          />
        </Box>
      </Box>
    </Flex>
  );
}
