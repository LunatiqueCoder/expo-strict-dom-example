import { ExpoConfig } from 'expo/config';

const DEVELOPMENT_VARIABLES = [process.env.EAS_BUILD_PROFILE, process.env.NODE_ENV, process.env.BABEL_ENV];
const IS_DEV = DEVELOPMENT_VARIABLES.includes('development');

export const appConfig: ExpoConfig = {
  name: 'myapp',
  slug: 'myapp',
  version: '1.30.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.myorg.myapp',
    requireFullScreen: true,
    config: {
      usesNonExemptEncryption: false, //https://docs.expo.dev/versions/latest/sdk/securestore/#exempting-encryption-prompt
    },
    entitlements: {
      'aps-environment': IS_DEV ? 'development' : 'production',
    },
  },
  android: {
    package: 'com.myorg.myapp',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'server',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-localization',
    'expo-secure-store',
    // [
    //   'expo-splash-screen',
    //   {
    //     image: './assets/images/splash-icon.png',
    //     imageWidth: 200,
    //     resizeMode: 'contain',
    //     backgroundColor: '#ffffff',
    //   },
    // ],
    'expo-font',
    // 'expo-web-browser',
  ],
  experiments: {
    typedRoutes: true,
  },
};
