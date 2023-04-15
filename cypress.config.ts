import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    // позволяет задать базовый урл, чтоб уже в самих тестах делать относительные пути
    baseUrl: 'http://localhost:3000/',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});
