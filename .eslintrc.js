// eslint-disable-next-line no-undef
module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  plugins: ['import', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.tsx', '.ts'],
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.tsx', '.ts'] },
      alias: {
        map: [['src', './src']],
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    },
  },
  rules: {
    'comma-dangle': 'off', // 关闭逗号结尾规则
    'linebreak-style': 'off', // 关闭换行风格规则
    'object-curly-spacing': 'off', // 关闭对象大括号内的空格规则
    'no-shadow': 'off', // 关闭变量声明遮蔽检查
    'default-param-last': 'off', // 关闭默认参数在最后的规则
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'warn',
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    'no-nested-ternary': 'off',
  },
};
