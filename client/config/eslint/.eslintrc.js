module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': [
      'warn',
      {
        prefixWithI: 'always',
        allowUnderscorePrefix: false,
      },
    ],
    'prettier/prettier': 'error',
    'semi': ['error', 'never'],
    'sort-imports': ['error', {
        'ignoreCase': false,
        'ignoreDeclarationSort': false,
        'ignoreMemberSort': false,
        'memberSyntaxSortOrder': ['multiple', 'single', 'all', 'none']
    }],
    'sort-keys': ['error', 'asc', {caseSensitive: false}]
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
