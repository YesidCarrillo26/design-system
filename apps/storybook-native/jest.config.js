/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  // Los tests viven junto a los componentes (packages/ui), no dentro de esta app.
  roots: ['<rootDir>', '<rootDir>/../../packages/ui/src'],
  testMatch: ['**/*.native.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Storybook 10 y sus dependencias son solo ESM: Babel tiene que transformarlas.
  transformIgnorePatterns: [
    '/node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|react-native-svg|storybook|@storybook/.*|@vitest/.*|@testing-library/.*|chai|loupe|tinyspy|@chroma-yesid/.*))',
  ],
};
