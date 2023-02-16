import { useTheme } from 'next-themes';

import type * as Stitches from '@stitches/react';
import { Button } from './Button';

type Props = {
  css?: Stitches.CSS;
};

export function ThemeSwitcher({ css }: Props) {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  const handleThemeChange = () => {
    setTheme(nextTheme);
  };

  return (
    <Button onClick={handleThemeChange} css={css}>
      Toggle theme
    </Button>
  );
}
