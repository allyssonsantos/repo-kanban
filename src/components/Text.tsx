import { styled } from '@/styles/stitches.config';

export const Text = styled('span', {
  // Reset
  lineHeight: '1',
  margin: '0',
  fontWeight: 400,

  variants: {
    size: {
      '1': {
        fontSize: '$1',
        letterSpacing: '$1',
      },
      '2': {
        fontSize: '$2',
        letterSpacing: '$1',
        lineHeight: '$1',
      },
      '3': {
        fontSize: '$3',
        letterSpacing: '$1',
      },
      '4': {
        fontSize: '$4',
        letterSpacing: '$2',
      },
    },
    color: {
      purple: {
        color: '$purple',
      },
      red: {
        color: '$red',
      },
      light: {
        color: '$shade02',
      },
      normal: {
        color: '$shade01',
      },
    },
    variant: {
      bold: {
        fontWeight: '$2',
      },
      regular: {
        fontWeight: '$1',
      },
      truncate: {
        truncate: true,
      },
    },
  },
  defaultVariants: {
    size: '3',
    variant: 'regular',
    color: 'normal',
  },
});
