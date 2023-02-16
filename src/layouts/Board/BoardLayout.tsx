import { PropsWithChildren } from 'react';
import { Box } from '@/components';

type Props = PropsWithChildren<{}>;

export function BoardLayout({ children }: Props) {
  return (
    <Box
      css={{
        width: '100%',
        height: '100%',
        marginTop: 100,
      }}
    >
      {children}
    </Box>
  );
}
