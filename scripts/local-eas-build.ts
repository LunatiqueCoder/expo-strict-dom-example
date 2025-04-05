import _yargs from 'yargs/yargs';
import easJson from '../eas.json';
import fs from 'fs';
import path from 'path';

// Read variables from .env.local file
function loadEnvLocal() {
  try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
      console.log('✅ (scripts/local-eas-build.ts) Found `.env.local` file. Injecting environment variables:');
      const envFileContent = fs.readFileSync(envPath, 'utf8');
      const envVars = {};

      // Parse the file content line by line
      envFileContent.split('\n').forEach(line => {
        // Skip empty lines and comments
        if (!line || line.startsWith('#')) {
          return;
        }

        // Split by the first equals sign
        const parts = line.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          // Join the rest in case there are multiple equal signs
          const value = parts.slice(1).join('=').trim();
          // Remove surrounding quotes if they exist
          const cleanValue = value.replace(/^['"](.*)['"]/g, '$1');
          envVars[key] = cleanValue;
          console.log(`💉 (scripts/local-eas-build.ts) ${key}`);
        }
      });

      // Merge with process.env
      return { ...process.env, ...envVars };
    }
  } catch (error) {
    console.warn(`Warning: Could not load .env.local file: ${error.message}`);
  }
  return process.env;
}

// Load environment variables from .env.local
const envWithLocal = loadEnvLocal();

const ENVIRONMENTS = [
  'P', //  - Production
  'S', //  - Staging
  'I', //  - Internal/Preview
  'D', //  - Development
  'DS', // - Development Simulator (iOS)
  'IS', // - Internal/Preview Simulator (iOS)
] as const;
type TEnv = (typeof ENVIRONMENTS)[number];
const ENV_DESCRIPTION = "'D' for development, 'I' for internal preview, 'S' for Staging or 'P' for Production";

const PLATFORMS = ['android', 'ios'] as const;
type TPlatforms = (typeof PLATFORMS)[number];

function local_eas_build(platform: TPlatforms, ENV?: TEnv, otherEasBuildsArgs?: string) {
  const BUILD_PROFILE: keyof typeof easJson.build = (() => {
    if (ENV === 'P') {
      return 'production';
    }

    if (ENV === 'S') {
      return 'staging';
    }

    if (ENV === 'I') {
      return 'preview';
    }

    if (ENV === 'DS') {
      return 'dev-simulator';
    }

    if (ENV === 'IS') {
      return 'preview-simulator';
    }

    return 'development';
  })();

  const FILE_EXTENSION = (() => {
    if (platform === 'ios') {
      if (!ENV || ['DS', 'IS'].includes(ENV)) {
        return 'tar.gz';
      }

      return 'ipa';
    }

    if (ENV === 'P') {
      return 'aab';
    }

    return 'apk';
  })();

  const OUTPUT = `--output=eas-builds/${platform}/${BUILD_PROFILE}.${FILE_EXTENSION}`;

  const BUILD_SCRIPT = `eas-build -e ${BUILD_PROFILE} --local ${OUTPUT} --non-interactive --no-wait --platform ${platform}`;

  const { spawn } = require('child_process');
  const { stderr, exitCode } = spawn('yarn', ['run', BUILD_SCRIPT, otherEasBuildsArgs], {
    env: envWithLocal as NodeJS.ProcessEnv,
    stdio: 'inherit',
    shell: true,
  });

  if (exitCode !== null && exitCode !== 0) {
    throw new Error(`local-eas-build script failed with exit code ${exitCode}. Error: ${stderr}`);
  }
}

const options = {
  env: {
    demandOption: false,
    choices: ENVIRONMENTS,
    describe: `Environment: ${ENV_DESCRIPTION}`,
  },
  platform: {
    demandOption: true,
    choices: PLATFORMS,
  },
} as const;

const yargs = _yargs(process.argv.slice(2)).options(options).strict(false);

try {
  const { env, platform } = yargs.parseSync();

  const scriptArg = process.argv
    .filter(item => {
      const normalizedItem = item.replace(/\\/g, '/'); // Windows OS: Normalize only the item being checked
      return (
        !normalizedItem.includes('node_modules/.bin/ts-node') &&
        !normalizedItem.includes('node_modules/ts-node/dist/bin.js') &&
        !normalizedItem.includes('scripts/local-eas-build.ts') &&
        !item.includes('--env=') && // No need to normalize for these
        !item.includes('--platform=') // No need to normalize for these
      );
    })
    .reduce((prev, curr) => prev + ' ' + curr, '');

  local_eas_build(platform, env, scriptArg);
} catch (e) {
  yargs.showHelp();

  console.error(e.message);

  /**
   * This line of code terminates the current process
   * and returns '1' as the exit code to the calling process or shell.
   * This is typically done to indicate that an error has occurred.
   */
  process.exit(1);
}
