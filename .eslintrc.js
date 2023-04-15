// чтоб появился этот файл делаем npm init @eslint/config
module.exports = {
  env: { browser: true, es2021: true, jest: true },
  // расширяем стандартный плагин для реакта и подключаем модуль стандарта тайпскрипта и airbnb + автоматом добавился сторибук
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:i18next/recommended",
    "plugin:storybook/recommended",
    "plugin:import/warnings",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "i18next",
    // чтоб зависимости useeffect подсвечивались
    "react-hooks",
    // кастомный плагин для импортов
    "path-checher-ulbi-example",
    // неиспользуемые импорты
    "unused-imports",
    // например настроить импорты по алфавиту
    "import",
  ],
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    // "max-length": ["warn", { code: 80, comments: 40 }],
    "unused-imports/no-unused-imports": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "import/no-unresolved": "off",
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "max-len": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "implicit-arrow-linebreak": "off",
    "comma-dangle": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": "off",
    "react/jsx-props-no-spreading": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "operator-linebreak": "off",
    "no-underscore-dangle": "off",
    // прописываем, чтоб ругался на необработанные слова + отключаем плагин для атрибутов
    // "i18next/no-literal-string": ["error", { markupOnly: true, ignoreAttribute: ["data-testid", "to"] }],
    // отключаем, чтоб не ругался на необработанные слова
    "i18next/no-literal-string": 0,
    "new-cap": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unused-prop-types": "warn",
    "no-param-reassign": "off",
    "no-console": "off",
    "react/prop-types": "off",
    "object-curly-newline": "off",
    // отключаем запрет на использование глобальых переменных
    "no-undef": "off",
    "nonblock-statement-body-position": "off",
    curly: "off",
    "react/no-array-index-key": "off",
    "no-plusplus": "off",
    "no-unused-expressions": "off",
    // прокидываем наш алиас в плагин линтера импортов (каcтомный)
    "path-checher-ulbi-example/path-checker": ["warn", { alias: "@" }],
    "path-checher-ulbi-example/public-api-imports": [
      "warn",
      // указываем testFilesPatterns для паблик апи только для тестов
      {
        alias: "@",
        testFilesPatterns: [
          "**/*.test.*",
          "**/*.stories.*",
          "**/StoreDecorator.tsx",
        ],
      },
    ],
    "path-checher-ulbi-example/layer-imports": [
      "warn",
      // указываем файлы, которые будем игнорировать
      { alias: "@", ignoreImportPatterns: ["**/StoreProvider", "**/testing"] },
    ],
    // настройка, что импорты были по алфавиту
    "import/order": [
      "warn",
      {
        pathGroups: [{ pattern: "@/**", group: "internal", position: "after" }],
        alphabetize: { order: "asc", caseInsensitive: false },
      },
    ],
  },
  globals: {
    __IS_DEV__: true,
    __IS_DEV_DEBUG__: true,
    __API__: true,
    __PROJECT__: true,
  },
  // отключаем проверку необработанных слов в тестовых файлах
  overrides: [
    {
      files: ["**/src/**/*.{test,stories}.{ts, tsx}"],
      rules: { "i18next/no-literal-string": "off" },
    },
  ],
};
