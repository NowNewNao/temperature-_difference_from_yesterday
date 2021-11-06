var error = 2;
var ignore = 0;

module.exports = {
    env: { node: true },
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/ban-ts-comment': ignore,
        '@typescript-eslint/no-unused-vars': error,
        '@typescript-eslint/explicit-module-boundary-types': error,
        'jsx-a11y/anchor-is-valid': 0, // Interferes with next/link tag
    },
};