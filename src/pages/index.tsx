import type { ReactElement } from 'react';
import Head from 'next/head';

import { BaseLayout } from '@/layouts';

export default function Home() {
  return (
    <>
      <Head>
        <title>Repository Kanban - CodeSandbox</title>
      </Head>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
