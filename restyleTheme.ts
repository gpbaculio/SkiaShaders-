import {createTheme} from '@shopify/restyle';

// for dark mode create another theme
export const colors = {
  '#61DAFB': '#61DAFB',
  '#FB61DA': '#FB61DA',
  '#DAFB61': '#DAFB61',
  '#61FBCF': '#61FBCF',
};

const theme = createTheme({
  colors,
  spacing: {
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 24,
  },
  breakpoints: {},
  textVariants: {
    defaults: {},
  },
});

export type Theme = typeof theme;
export default theme;
