import { Slot } from 'expo-router';
import { html } from 'react-strict-dom';

import { branding } from '@/src/theme/branded.stylex';
import '@/src/theme/stylex.css';

export default function Layout() {
  return (
    <html.div style={[branding]}>
      <Slot />
    </html.div>
  );
}
