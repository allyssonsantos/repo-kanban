import { styled } from '@/styles/stitches.config';

export const Input = styled('input', {
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid $shade01',
  color: '$shade01',
  fontFamily: '$inter',
  fontSize: '$3',
  letterSpacing: '$1',
  py: '$1',
  paddingInline: '$1',
  transition: 'border 150ms ease',

  '&:hover, &:focus, &:focus-visible': {
    outline: 'none',
    borderColor: '$purple',
  },
});
