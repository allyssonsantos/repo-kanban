import { createStitches, PropertyValue } from '@stitches/react';

export const { styled, globalCss, getCssText, createTheme, css, keyframes } =
  createStitches({
    theme: {
      colors: {
        shade01: '#F2F2F2',
        shade02: '#B0B0B0',
        shade03: '#383838',
        shade04: '#222222',
        shade05: '#151515',
        purple: '#6a51b2',
        red: '#E75B4F',
      },
      fonts: {
        inter: 'Inter, sans-serif',
      },
      fontSizes: {
        1: '12px',
        2: '14px',
        3: '16px',
        4: '48px',
      },
      fontWeights: {
        1: 400,
        2: 600,
      },
      letterSpacings: {
        1: '-0.0125em',
        2: '-0.05em',
      },
      lineHeights: {
        1: 1.4,
      },
      radii: {
        1: '4px',
      },
      space: {
        1: '8px',
        2: '10px',
        3: '16px',
        4: '20px',
        5: '24px',
        6: '50px',
        7: '100px',
      },
    },
    utils: {
      py: (value: PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
      truncate: () => ({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    },
    media: {
      bp1: '(max-width: 768px)',
    },
  });

export const lightTheme = createTheme({
  colors: {
    shade01: '#151515',
    shade02: '#515151',
    shade03: '#D1D1D1',
    shade04: '#EEEEEE',
    shade05: '#FFFFFF',
    red: '#D62617',
  },
});

export const GlobalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'html, body, #__next': {
    height: '100%',
  },
  body: {
    backgroundColor: '$shade05',
    color: '$shade01',
    transitionProperty: 'background-color, color',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
  },
});
