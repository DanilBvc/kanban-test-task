module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'linebreak-style': 0,
    'lines-between-class-members': [
      'error', 'always',
      { exceptAfterSingleLine: true },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    indent: 'off',
    'no-shadow': 'off',
    'comma-dangle': 'off',
    semi: 'off',
    quotes: 'off',
    'padding-line-between-statements': 'off',
    'keyword-spacing': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/padding-line-between-statements': ['error', {
      blankLine: 'always',
      prev: '*',
      next: ['interface', 'type', 'function'],
    }],
    '@typescript-eslint/keyword-spacing': ['error'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    'react/jsx-filename-extension': ['error', {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }],
    'import/no-dynamic-require': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/self-closing-comp': 'off',
    'default-param-last': 'off',
  },
};
