import { essentials, jsdoc, next, react, storybook, typescript } from 'eslint-config-moneyforward/flat';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['.next/**', 'next-env.d.*', '**/dist/**', '**/storybook-static/**', '**/jsonPlaceholderOpenapi.d.ts'],
  },

  ...essentials,
  ...typescript,
  ...react,
  ...next,
  ...jsdoc,
  ...storybook,

  {
    files: ['**/*.config.*'],
    rules: {
      'import/no-default-export': ['off'],
    },
  },

  {
    files: ['app/**/*.tsx'],
    rules: {
      'unicorn/no-anonymous-default-export': ['off'],
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
    files: ['**/page.tsx'],
    rules: {
      'react/prop-types': ['off'],
    },
  },

  {
    files: ['**/*.stories.*'],
    rules: {
      'jsdoc/require-jsdoc': ['off'],
    },
  },

  /* prettier */
  eslintConfigPrettier,
];
