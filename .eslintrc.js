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
  plugins: [
    "react",
    "@typescript-eslint",
    "i18next",
    // чтоб зависимости useeffect подсвечивались
    "react-hooks",
  ],
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
  },
  globals: {
    __IS_DEV__: true,
    __IS_DEV_DEBUG__: true,
    __API__: true,
  },
  // отключаем проверку необработанных слов в тестовых файлах
  overrides: [
    {
      files: ["**/src/**/*.{test,stories}.{ts, tsx}"],
      rules: {
        "i18next/no-literal-string": "off",
      },
    },
  ],
};
