import type { ReactElement } from 'react';
import Head from 'next/head';

import { HomeFeature } from '@/features/HomeFeature';
import { BaseLayout } from '@/layouts';

export default function Home() {
  return (
    <>
      <Head>
        <title>Repository Kanban - CodeSandbox</title>
      </Head>
      <HomeFeature />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
