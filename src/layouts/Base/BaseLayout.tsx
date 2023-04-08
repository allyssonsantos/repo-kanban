import { PropsWithChildren } from 'react';
import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';

import { Transition } from '@/animation';
import { Box, ThemeSwitcher } from '@/components';
import { lightTheme, GlobalStyles, keyframes } from '@/styles/stitches.config';

const inter = Inter({ subsets: ['latin'] });

type Props = PropsWithChildren<{}>;

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },

  '80%': {
    opacity: 0,
  },
  '100%': {
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
          animation: `${fadeIn} 250ms forwards`,
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
      <Transition key={`${router.pathname}-transition`} aria-hidden />
    </ThemeProvider>
  );
}
