import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ReactElement } from 'react';
import Head from 'next/head';

import type { TBoardData } from '@/types';
import { BoardFeature } from '@/features/BoardFeature';
import { BaseLayout, BoardLayout } from '@/layouts';
import {
  getRepoInformation,
  getRepoBranches,
} from '@/features/BoardFeature/services/github';
import { boardService } from '@/features/BoardFeature/services';

// if quota exceeds, uncomment this
// import { repoMock, branchesMock } from '@/tmp/mock';

export default function Board({
  // repo = repoMock,
  // branches = branchesMock,
  repo,
  branches,
  availableColumns,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Repository Kanban - CodeSandbox</title>
      </Head>
      <BoardFeature
        repo={repo}
        branches={branches}
        availableColumns={availableColumns}
      />
    </>
  );
}

Board.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <BoardLayout>{page}</BoardLayout>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps<TBoardData> = async (
  context
) => {
  const { owner, repo } = context.query;

  if (typeof owner !== 'string' || typeof repo !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const repoInformation = await getRepoInformation({
      owner,
      repo,
    });

    const { id: repoId } = repoInformation;

    const { branches } = await getRepoBranches({
      owner,
      repo,
    });

    const { columns: availableColumns } = boardService.getBoardColumns(repoId);

    return {
      props: {
        repo: repoInformation,
        branches,
        availableColumns,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      redirect: {
        destination: '/?error=true',
        permanent: false,
      },
    };
  }
};
