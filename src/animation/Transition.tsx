import { styled, keyframes } from '@/styles/stitches.config';

const scale = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(175%)',
  },
});

export const Transition = styled('div', {
  animation: `${scale} 500ms forwards ease-in-out`,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '80%',
  height: '100%',
  backgroundColor: '$purple',
  pointerEvents: 'none',
  boxShadow: '30px 0 20px 50px $colors$purple',
});
