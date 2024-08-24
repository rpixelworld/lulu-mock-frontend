// eslint.config.mjs
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Ensures that hooks are called correctly
    'react-hooks/exhaustive-deps': 'warn', // Ensures correct dependencies in hooks
  },
});
