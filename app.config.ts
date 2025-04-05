/**
 *
 * Useful links:
 * - {@link https://docs.expo.dev/workflow/configuration/}
 * - {@link https://docs.expo.dev/versions/latest/config/app/}
 */

import 'ts-node/register'; // enables imports of TypeScript files
import { ExpoConfig, ConfigContext } from 'expo/config';

import { appConfig } from './app.config/index';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  ...appConfig,
});
