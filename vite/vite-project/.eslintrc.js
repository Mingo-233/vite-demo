module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    // 1. 接入 prettier 的规则
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    // 这个配置和 Acron 的 ecmaVersion 是兼容的，可以配置 ES + 数字(如 ES6)或者ES + 年份(如 ES2015)，也可以直接配置为latest，启用最新的 ES 语法。
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    // sourceType: 默认为script，如果使用 ES Module 则应设置为module
    sourceType: 'module'
    // ecmaFeatures: 为一个对象，表示想使用的额外语言特性，如开启 jsx。
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  globals: {
    // 全局变量
    //     "writable"或者 true，表示变量可重写；
    // "readonly"或者false，表示变量不可重写；
    // "off"，表示禁用该全局变量。
    $: false,
    jQuery: false
  },
  rules: {
    'prettier/prettier': 'error',
    'vue/no-multiple-template-root': 0,
    'no-unused-vars': 1,
    'vue/multi-word-component-names': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 1
  }
};
