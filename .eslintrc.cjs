module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Prettier와 ESLint 통합
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/prop-types': 'off', // 이 줄을 추가하여 'react/prop-types' 규칙을 비활성화
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'prettier/prettier': ['error'], // Prettier 규칙을 ESLint에서 오류로 표시
    // 추가 규칙을 여기에 정의하세요.
  },
};
