import { css } from 'react-strict-dom';

export const DARK_MODE = '@media (prefers-color-scheme: dark)';

const TOKENS = {
  primaryText: {
    default: 'black',
    [DARK_MODE]: 'white',
  },
  secondaryText: {
    default: '#333',
    [DARK_MODE]: '#ccc',
  },
  accent: {
    default: 'blue',
    [DARK_MODE]: 'lightblue',
  },
  background: {
    default: 'white',
    [DARK_MODE]: 'black',
  },
  lineColor: {
    default: 'gray',
    [DARK_MODE]: 'lightgray',
  },
};

export const DEFAULT_THEME = css.defineVars(TOKENS);
