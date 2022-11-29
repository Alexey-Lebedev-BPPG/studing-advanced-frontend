// чтоб появился этот файл делаем npm init @eslint/config
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // расширяем стандартный плагин для реакта и подключаем модуль стандарта тайпскрипта и airbnb
  extends: ["plugin:react/recommended", "airbnb"],
  // extends: ["plugin:react/recommended", "standard-with-typescript", "airbnb"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "import/no-unresolved": "off",
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "max-len": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-unused-vars": "warn",
    "implicit-arrow-linebreak": "off",
    "comma-dangle": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": "off",
    "react/jsx-props-no-spreading": "warn",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "operator-linebreak": "off",
    "no-underscore-dangle": "off",
    "new-cap": "off",
  },
  globals: {
    __IS_DEV__: true,
  },
};
