import { css } from 'react-strict-dom';

import { DARK_MODE } from './constants';
import { DEFAULT_THEME } from './default.stylex';

const BRAND_THEME = {
  primaryText: { default: 'purple', [DARK_MODE]: 'lightpurple' },
  secondaryText: { default: 'pink', [DARK_MODE]: 'hotpink' },
  accent: 'red',
  background: { default: '#555', [DARK_MODE]: 'black' },
  lineColor: 'red',
};

export const branding = css.createTheme(DEFAULT_THEME, BRAND_THEME);
