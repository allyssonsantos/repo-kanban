import { PropsWithChildren } from 'react';
import { Inter } from '@next/font/google';
import { Box, ThemeSwitcher } from '@/components';
import { ThemeProvider } from 'next-themes';

import { lightTheme, GlobalStyles, keyframes } from '@/styles/stitches.config';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

type Props = PropsWithChildren<{}>;

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export function BaseLayout({ children }: Props) {
  GlobalStyles();
  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
      value={{
        dark: 'dark',
        light: lightTheme.className,
      }}
    >
      <Box
        as="main"
        className={inter.className}
        key={router.pathname}
        css={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          margin: '0 auto',
          maxWidth: '1140px',
          position: 'relative',
          width: '100%',
          animation: `${fadeIn} 500ms forwards`,
        }}
      >
        {children}
        <ThemeSwitcher
          css={{
            position: 'fixed',
            bottom: '$2',
            right: '$2',
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
