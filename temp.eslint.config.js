// // вместо eslint/recommended
// // import js from '@eslint/js');
// const typeScriptEslint = require('@typescript-eslint/eslint-plugin');
// const typeScriptEslintParser = require('@typescript-eslint/parser');
// const airbnb = require('eslint-config-airbnb');
// const i18Next = require('eslint-plugin-i18next');
// const imports = require('eslint-plugin-import');
// const pathChecker = require('eslint-plugin-path-checher-ulbi-example');
// const prettier = require('eslint-plugin-prettier');
// const eslintPluginReact = require('eslint-plugin-react');
// const reactHooks = require('eslint-plugin-react-hooks');
// const destrSortKeys = require('eslint-plugin-sort-destructure-keys');
// const sortKeys = require('eslint-plugin-sort-keys-fix');
// const storybook = require('eslint-plugin-storybook');
// const tsSortKeys = require('eslint-plugin-typescript-sort-keys');
// const unusedImports = require('eslint-plugin-unused-imports');
// const globals = require('globals');
// const tseslint = require('typescript-eslint');

// /** @type {import('eslint').Linter.FlatConfig[]} */
// module.exports = tseslint.config(
//   // расширяем стандартный плагин для реакта и подключаем модуль стандарта тайпскрипта и airbnb + автоматом добавился сторибук
//   {
//     plugins: {
//       '@typescript-eslint': typeScriptEslint,

//       airbnb,
//       // i18next: i18Next.configs.recommended,
//       // import: imports.configs.warnings,
//       // вместо eslint/recommended
//       // js.configs.recommended,
//       prettier,
//       'path-checher-ulbi-example': pathChecker,
//       storybook: storybook.configs.recommended,
//     },
//   },
//   { settings: { react: { version: 'detect' } } },
//   {
//     languageOptions: {
//       // ecmaFeatures: { jsx: true },
//       ecmaVersion: 'latest',
//       // env: { browser: true, es2021: true, jest: true, node: true },
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//         ...globals.es2021,
//         __API__: true,
//         __IS_DEV__: true,
//         __IS_DEV_DEBUG__: true,
//         __PROJECT__: true,
//       },
//       // parser: typeScriptEslintParser,
//       parserOptions: {
//         ecmaFeatures: { jsx: true },
//         project: ['tsconfig.json'],
//       },
//       sourceType: 'module',
//     },
//   },
//   {
//     ignores: [
//       'build',
//       'build-esbuild',
//       'dist',
//       '.loki',
//       'node_modules',
//       '.git',
//       '.idea',
//       '.vscode',
//       '.github',
//       'storybook-static',
//       'reports',
//       'coverage',
//       'json-server',
//       '.dependency-cruiser.js',
//     ],
//   },
//   // {
//   //   plugins: { react: eslintPluginReact },
//   //   rules: {
//   //     'react/function-component-definition': 'off',
//   //     'react/jsx-child-element-spacing': 'off',
//   //     'react/jsx-curly-brace-presence': 'off',
//   //     'react/jsx-curly-newline': 'off',
//   //     'react/jsx-filename-extension': [
//   //       2,
//   //       { extensions: ['.js', '.jsx', '.tsx', '.ts'] },
//   //     ],
//   //     'react/jsx-newline': [1, { allowMultilines: false, prevent: true }],
//   //     'react/jsx-no-leaked-render': [
//   //       1,
//   //       { validStrategies: ['coerce', 'ternary'] },
//   //     ],
//   //     'react/jsx-no-literals': [
//   //       1,
//   //       { ignoreProps: true, noAttributeStrings: true, noStrings: false },
//   //     ],
//   //     'react/jsx-one-expression-per-line': 'off',
//   //     'react/jsx-props-no-spreading': 'off',
//   //     'react/jsx-sort-props': [
//   //       1,
//   //       {
//   //         callbacksLast: true,
//   //         ignoreCase: true,
//   //         multiline: 'last',
//   //         noSortAlphabetically: true,
//   //         reservedFirst: true,
//   //         shorthandFirst: true,
//   //         shorthandLast: true,
//   //       },
//   //     ],
//   //     'react/no-array-index-key': 'off',
//   //     'react/no-typos': 'warn',
//   //     // позволяет создавать компоненты перед рендером родительского (где стейты)
//   //     'react/no-unstable-nested-components': 'warn',
//   //     'react/no-unused-prop-types': 'warn',
//   //     'react/prop-types': 'off',
//   //     'react/react-in-jsx-scope': 'off',
//   //     'react/require-default-props': 'off',
//   //   },
//   // },
//   // {
//   //   plugins: { '@typescript-eslint': typeScriptEslint },
//   //   rules: {
//   //     '@typescript-eslint/no-restricted-imports': [
//   //       'warn',
//   //       {
//   //         importNames: ['useSelector', 'useDispatch'],
//   //         message:
//   //           'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
//   //         name: 'react-redux',
//   //       },
//   //     ],
//   //     '@typescript-eslint/no-shadow': 'error',
//   //     '@typescript-eslint/no-unused-vars': 'off',
//   //   },
//   // },
//   // {
//   //   plugins: { i18next: i18Next },
//   //   rules: {
//   //     // чтоб ругался на необработанные слова + отключаем плагин для атрибутов
//   //     'i18next/no-literal-string': [
//   //       'error',
//   //       { ignoreAttribute: ['data-testid', 'to'], markupOnly: true },
//   //     ],
//   //     // отключаем, чтоб не ругался на необработанные слова
//   //     // 'i18next/no-literal-string': 0,
//   //     // отключаем проверку необработанных слов в тестовых файлах
//   //     // overrides: [
//   //     //   {
//   //     //     files: ['**/src/**/*.{test,stories}.{ts, tsx}'],
//   //     //     rules: { 'i18next/no-literal-string': 'off' },
//   //     //   },
//   //     // ],
//   //   },
//   // },
//   {
//     plugins: { prettier: prettier },
//     rules: {
//       'prettier/prettier': [
//         'error',
//         { endOfLine: 'auto' },
//         { usePrettierrc: true },
//       ],
//     },
//   },
//   {
//     // чтоб зависимости useEffect подсвечивались
//     plugins: { 'react-hooks': reactHooks },
//     rules: {
//       'react-hooks/exhaustive-deps': 'warn',
//       'react-hooks/rules-of-hooks': 'error',
//     },
//   },
//   // {
//   //   // кастомный плагин для импортов
//   //   plugins: { 'path-checher-ulbi-example': pathChecker },
//   //   rules: {
//   //     'path-checher-ulbi-example/layer-imports': [
//   //       'warn',
//   //       {
//   //         alias: '@',
//   //         ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
//   //       },
//   //     ],
//   //     'path-checher-ulbi-example/path-checker': ['warn', { alias: '@' }],
//   //     'path-checher-ulbi-example/public-api-imports': [
//   //       'warn',
//   //       {
//   //         alias: '@',
//   //         testFilesPatterns: [
//   //           '**/*.test.*',
//   //           '**/*.stories.*',
//   //           '**/StoreDecorator.tsx',
//   //         ],
//   //       },
//   //     ],
//   //   },
//   // },
//   {
//     // неиспользуемые импорты
//     plugins: { 'unused-imports': unusedImports },
//     rules: {
//       'unused-imports/no-unused-imports': 'warn',
//     },
//   },
//   {
//     // например настроить импорты по алфавиту
//     plugins: { import: imports },
//     rules: {
//       'import/extensions': 'off',
//       'import/no-extraneous-dependencies': 'off',
//       'import/no-unresolved': 'off',
//       'import/order': [
//         'warn',
//         {
//           alphabetize: { order: 'asc' },
//           groups: [
//             'builtin',
//             'external',
//             'index',
//             'type',
//             'sibling',
//             'parent',
//             'internal',
//             'object',
//           ],
//           pathGroups: [
//             { group: 'internal', pattern: '@/**', position: 'after' },
//           ],
//         },
//       ],
//       'import/prefer-default-export': 'off',
//     },
//   },
//   {
//     plugins: { 'sort-keys-fix': sortKeys },
//     rules: {
//       // сортировка ключей объекта по алфавиту.
//       'sort-keys-fix/sort-keys-fix': [
//         'warn',
//         'asc',
//         { caseSensitive: true, natural: true },
//       ],
//     },
//   },
//   {
//     plugins: { 'typescript-sort-keys': tsSortKeys },
//   },
//   {
//     plugins: { 'sort-destructure-keys': destrSortKeys },
//     rules: {
//       'sort-destructure-keys/sort-destructure-keys': [
//         2,
//         { caseSensitive: false },
//       ],
//     },
//   },
//   {
//     rules: {
//       '@typescript-eslint/no-restricted-imports': [
//         'warn',
//         {
//           importNames: ['useSelector', 'useDispatch'],
//           message:
//             'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
//           name: 'react-redux',
//         },
//       ],
//       '@typescript-eslint/no-shadow': 'error',
//       '@typescript-eslint/no-unused-vars': 'off',
//       camelcase: ['warn', { properties: 'always' }],
//       'comma-dangle': ['warn', 'only-multiline'],
//       'consistent-return': 'off',
//       curly: ['warn', 'multi'],
//       'jsx-a11y/click-events-have-key-events': 'off',
//       'jsx-a11y/no-noninteractive-element-interactions': 'off',
//       'jsx-a11y/no-static-element-interactions': 'off',
//       'no-console': 'off',
//       'no-debugger': 'warn',
//       'no-param-reassign': 'off',
//       'no-plusplus': 'off',
//       'no-restricted-imports': 'off',
//       'no-shadow': 'off',
//       'no-undef': 'off',
//       'no-underscore-dangle': 'off',
//       'no-unused-expressions': 'off',
//       'no-unused-vars': 'off',
//       'nonblock-statement-body-position': 'off',
//       'object-curly-newline': 'off',
//       'operator-linebreak': 'off',
//       quotes: [2, 'single', { avoidEscape: true }],
//       radix: 'off',
//       'path-checher-ulbi-example/layer-imports': [
//         'warn',
//         {
//           alias: '@',
//           ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
//         },
//       ],
//       'path-checher-ulbi-example/path-checker': ['warn', { alias: '@' }],
//       'path-checher-ulbi-example/public-api-imports': [
//         'warn',
//         {
//           alias: '@',
//           testFilesPatterns: [
//             '**/*.test.*',
//             '**/*.stories.*',
//             '**/StoreDecorator.tsx',
//           ],
//         },
//       ],
//     },
//   },
// );
