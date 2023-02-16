import { styled } from '@/styles/stitches.config';

export const Button = styled('button', {
  alignItems: 'center',
  border: 'none',
  borderRadius: '$1',
  color: '$shade01',
  display: 'flex',
  fontFamily: '$inter',
  fontSize: '$3',
  justifyContent: 'center',
  letterSpacing: '$1',
  textDecoration: 'none',
  transition: 'background-color 300ms ease-in-out',

  '&:hover, &:focus, &:focus-visible': {
    backgroundColor: '$shade03',
  },

  variants: {
    variant: {
      default: {
        backgroundColor: '$shade04',
        py: '$1',
        paddingInline: '$3',
      },
      icon: {
        backgroundColor: 'transparent',
        minWidth: 48,
        minHeight: 48,
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.1,
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});
