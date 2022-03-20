module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:tailwindcss/recommended',
    'prettier',
    'react-app'
  ],
  parser: '@typescript-eslint/parser',
  files: ['*.ts', '*.tsx'],
  
  parserOptions: {
    project: './tsconfig.json',
    
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'tailwindcss',
    'prettier'
  ],
  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  },

  rules: {
    "react/react-in-jsx-scope": "off",
    "no-param-reassign": [2, { "props": false }]
  },
};
