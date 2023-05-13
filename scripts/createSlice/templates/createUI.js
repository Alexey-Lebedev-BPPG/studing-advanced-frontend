const fs = require('fs/promises');
const componentTemplate = require('./componentTemplate');
const storyTemplate = require('./storyTemplate');
const styleTemplate = require('./styleTemplate');
const firstCharUpperCase = require('../firstCharUpperCase');
const resolveRoot = require('../resolveRoot');

module.exports = async (layer, sliceName) => {
  const resolveUIPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'ui', ...segments);

  // создаем папку ui
  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (e) {
      console.log('Не удалось создать UI директорию');
    }
  };

  // создаем файлы по шаблонам
  const createComponent = async () => {
    try {
      // преобразовываем название в апперкейс
      const componentName = firstCharUpperCase(sliceName);
      // создаем путь к компоненту
      await fs.mkdir(resolveUIPath(componentName));
      // создаем файл компонента
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName),
      );
      // создаем файл сторибука
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.stories.tsx`),
        storyTemplate(layer, componentName),
      );
      // создаем файл стилей
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        styleTemplate(componentName),
      );
    } catch (e) {
      console.log('Не удалось создать компонент');
    }
  };

  await createUIDir();
  await createComponent();
};
