import { styled } from '@/styles/stitches.config';

export const Card = styled('div', {
  backgroundColor: '$shade04',
  borderRadius: '$1',
  transition: 'background-color 300ms ease-in-out',

  '&:hover, &:focus, &:focus-visible': {
    backgroundColor: '$shade03',
  },
});

export const CardContent = styled('div', {
  color: '$shade02',
  fontSize: '$3',
  letterSpacing: '$1',
  py: '$5',
  truncate: true,
});
