module.exports = {
  stories: ["../../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // аддон, чтоб мокать запросы в сторибуке
    "storybook-addon-mock/register",
    // чтоб не заморачиваться с созданием разных кнопок для разных тем, можно поставить аддон: https://storybook.js.org/addons/@dhruvkb/storybook-addon-themes
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  // чтоб переводы работали корректно
  staticDirs: ["../../public"],
};
