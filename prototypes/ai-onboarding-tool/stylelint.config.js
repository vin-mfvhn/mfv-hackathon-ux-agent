export default {
  extends: ['stylelint-config-moneyforward/essentials', 'stylelint-config-moneyforward/css-modules'],
  ignoreFiles: [
    './.next/**',
    './node_modules/**',
    './build/**',
    './dist/**',
    './storybook-static/**',
    '**/*.@(ts|tsx)',
  ],
};
