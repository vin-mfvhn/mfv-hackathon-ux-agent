// @ts-check
import { essentials, jsdoc, react, storybook, typescript } from 'eslint-config-moneyforward/flat';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['**/build/**', '**/dist/**', '**/storybook-static/**', '**/jsonPlaceholderOpenapi.d.ts'],
  },

  ...essentials,
  ...typescript,
  ...react,
  ...jsdoc,
  ...storybook,

  {
    files: ['**/*.config.*'],
    rules: {
      'import/no-default-export': ['off'],
    },
  },

  {
    files: ['src/**/route.tsx'],
    rules: {
      '@typescript-eslint/only-throw-error': ['off'],
    },
  },

  {
    rules: {
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          controlComponents: ['MultilineTextBox', 'TextBox', 'SelectBox'],
        },
      ],
    },
  },

  {
    files: ['**/*.stories.*'],
    rules: {
      'jsdoc/require-jsdoc': ['off'],
    },
  },

  // prettier
  eslintConfigPrettier,
];
