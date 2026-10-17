const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');
const { withUniwindConfig } = require('uniwind/metro');

// Expo detecta el workspace y agrega la raíz del monorepo a watchFolders/nodeModulesPaths.
const config = getDefaultConfig(__dirname);

// Uniwind va por fuera: es quien reescribe el resolver y el transformer para `className`.
module.exports = withUniwindConfig(
  withStorybook(config, {
    // Esta app existe solo para Storybook, así que siempre está activo.
    enabled: true,
    configPath: path.resolve(__dirname, './.rnstorybook'),
  }),
  {
    cssEntryFile: './src/global.css',
    dtsFile: './src/uniwind-types.d.ts',
  },
);
