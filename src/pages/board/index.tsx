import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ReactElement } from 'react';
import Head from 'next/head';

import { BoardFeature } from '@/features/BoardFeature';
import { BaseLayout, BoardLayout } from '@/layouts';
import {
  getRepoInformation,
  getRepoBranches,
} from '@/features/BoardFeature/services/github';
// if quota exceeds, uncomment this
import { repoMock, branchesMock } from '@/tmp/mock';

export default function Board({
  repo = repoMock,
  branches = branchesMock,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Repository Kanban - CodeSandbox</title>
      </Head>
      <BoardFeature repo={repo} branches={branches} />
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

export type BoardData = {
  repo: {
    id: number;
    name: string;
    description: string | null;
    stars: number;
    starUrl: string;
  };
  branches: string[];
};

export const getServerSideProps: GetServerSideProps<BoardData> = async (
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
    const { id, name, description, stars, starUrl } = await getRepoInformation({
      owner,
      repo,
    });

    const { branches } = await getRepoBranches({
      owner,
      repo,
    });

    return {
      props: {
        repo: {
          id,
          name,
          description,
          stars,
          starUrl,
        },
        branches,
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
