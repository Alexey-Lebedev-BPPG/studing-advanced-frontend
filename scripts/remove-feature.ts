// позволяет удалить лишние фичи-флаги. запускается командой npx ts-node remove-feature.ts [название фичи] [метод] (npx ts-node remove-feature.ts isCounterEnabled off)

// библиотека позволяет редактировать .ts файлы
import { Node, Project, SyntaxKind } from 'ts-morph';

// из аргументов достаем название фичи (например, isCounterEnabled)
const removedFeatureName = process.argv[2];
// из аргументов достаем функцию, которую нужно выполнить (например, on/off)
const featureState = process.argv[3];

// указываем ошибку, если название фичи не передали
if (!removedFeatureName) throw new Error('Укажите название фичи-флага');
// указываем ошибку, если название функции не передали
if (!featureState) throw new Error('Укажите состояние фичи-флага');
// указываем ошибку, если название функции некорректно
if (featureState !== 'on' && featureState !== 'off')
  throw new Error(
    'Некорректное значение состояния фичи (только "on" или "off")',
  );

const project = new Project({});

// добавляем файлы, с которыми будем работать
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все файлы проекта
const files = project.getSourceFiles();

const isToggleFunction = (node: Node): boolean => {
  // переменная, показывающая, что вызов функции совпадает с названием toggleFeatures
  let isToggleFeatures = false;

  // для этого пробегаемся по всем детям
  node.forEachChild(child => {
    // находим идентификатор и проверяем, что он называется, как нам нужно
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === 'toggleFeatures'
    ) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
};

// итерируем по файлам
files.forEach(sourceFile => {
  // обходим всех потомков
  sourceFile.forEachDescendant(node => {
    // находим тип функции (можно посмотреть в АСД) и проверяем, что вызов функции совпадает с названием toggleFeatures
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      // получаем объект аргументов из нашей функции
      const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
      );

      // выходим из цикла, если у нас нет аргументов
      if (!objectOptions) return;

      // получаем все наши аргументы
      const onFunctionProperty = objectOptions.getProperty('on'); // получаем on: () => <CounterRedesigned />
      const offFunctionProperty = objectOptions.getProperty('off'); // получаем off: () => <Counter />
      const featureNameProperty = objectOptions.getProperty('name'); // получаем name: 'isCounterEnabled'

      // получаем конкретные значения
      const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      ); // получаем () => <CounterRedesigned />
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      ); // получаем () => <Counter />
      const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1); // получаем isCounterEnabled

      // проверяем, что если название фичи из аргументов не совпадает с названием, которое мы нашли, то прекращаем скрипт
      if (featureName !== removedFeatureName) return;

      // если у нас передана функция on
      if (featureState === 'on') {
        // получаем то, что функция должна вернуть и перезаписываем в элементе
        node.replaceWithText(onFunction?.getBody().getText() || '');
      }
      // если у нас передана функция off
      if (featureState === 'off') {
        // получаем то, что функция должна вернуть и перезаписываем в элементе
        node.replaceWithText(offFunction?.getBody().getText() || '');
      }
    }
  });
});

// сохраняем результат проекта
project.save().then(() => console.log('Done!'));
