// чтоб появился этот файл делаем npm init @eslint/config
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  // расширяем стандартный плагин для реакта и подключаем модуль стандарта тайпскрипта и airbnb + автоматом добавился сторибук
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:i18next/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "i18next"],
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
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
    "linebreak-style": 0,
    "no-underscore-dangle": "off",
    // прописываем, чтоб ругался на необработанные слова + отключаем плагин для атрибутов
    // "i18next/no-literal-string": ["error", { markupOnly: true, ignoreAttribute: ["data-testid", "to"] }],
    // отключаем, чтоб не ругался на необработанные слова
    "i18next/no-literal-string": 0,
    "new-cap": "off",
  },
  globals: {
    __IS_DEV__: true,
  },
  // отключаем проверку необработанных слов в тестовых файлах
  overrides: [
    {
      files: ["**/src/**/*.test.{ts, tsx}"],
      rules: {
        "i18next/no-literal-string": "off",
      },
    },
  ],
};
