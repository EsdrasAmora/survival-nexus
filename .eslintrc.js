module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'prettier'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'array-bracket-spacing': ['error', 'never'],
        curly: ['error', 'all'],
        'block-scoped-var': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            singleline: {
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
  ],
};
