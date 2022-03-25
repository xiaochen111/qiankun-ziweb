module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    semi: [2, 'always'], // 语句可以不需要分号结尾
    'no-var': 'error', //不能使用var
    'comma-dangle': ['off'], //对象字面量项尾必须有逗号
    indent: ['error', 2], //缩进2个空格
    'react/jsx-indent': 0,
    'prettier/prettier': 'error',
    'semi-spacing': ['error', { before: false, after: true }],
    quotes: [1, 'single'], //引号风格
    'key-spacing': [2, { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
    'no-spaced-func': 2,
    eqeqeq: 2, //必须使用全等
    'always-multiline': 0, //多行模式必须带逗号，单行模式不能带逗号
    'jsx-a11y/heading-has-content': 0, //标题要有内容
    'comma-spacing': 2, //控制逗号前后的空格
    'newline-after-var': 2, //变量声明后是否需要空一行
    'space-in-parens': [2, 'never'], //小括号里面要不要有空格
    'object-curly-spacing': ['error', 'always'], //大括号内是否允许不必要的空格
    'space-infix-ops': 'error', //中缀操作符周围要不要有空格
    'jsx-quotes': 2, //jsx中 引号风格
    'block-spacing': 2, // 规则在打开的块令牌内和同一行上的下一个令牌内强制执行一致的间距。此规则还会在同一行中的关闭块标记和以前的标记内强制实施一致的间距。
    'arrow-spacing': 2, //=>的前/后括号
    'keyword-spacing': ['error', { before: true }], //此规则强制执行围绕关键字和关键字标记的一致空格
    'no-trailing-spaces': 'error', //一行结束后面不要有空格
    'react-hooks/rules-of-hooks': 0,
    'no-console': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0, //不改变原对象(数组)并重新给字段赋值
    'no-useless-escape': 0,
    'no-underscore-dangle': 0, // 是否能使用下划线前缀变量
    'no-nested-ternary': 0,
    'consistent-return': 0,
    'prefer-destructuring': 0,
    'global-require': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-shadow': 0,
    'import/no-dynamic-require': 0,
    'no-plusplus': 0,
    'react-hooks/exhaustive-deps': 0,
  },
  //https://stackoverflow.com/questions/61956555/why-is-typescript-eslint-parser-including-files-outside-of-those-configured-in
  ignorePatterns: ['.eslintrc.js', 'public/*'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        indent: 'off',
      },
    },
  ],
};
