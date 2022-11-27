// позволяет создавать объекты с ключом строки и значением строки или булевого типа
type Mods = Record<string, string | boolean>;

// принимает главный класс(rootCls), модификаторы(mods), массив доп. классов
export const classNames = (
  rootCls: string,
  mods: Mods = {},
  additional: string[] = []
): string => {
  return [
    // возвращаем главный класс
    rootCls,
    // проходим по объекту, преобразовываем его в массив, фильтруем по трушному value и возвращаем только иассив ключей
    ...Object.entries(mods)
      .filter(([classKey, classValue]) => Boolean(classValue))
      .map(([classKey, classValue]) => classKey),
    // добавляем доп. классы и фильтруем их от ложных значений
    ...additional.filter(Boolean),
    // склевиаем строку из массива по пробелу
  ].join(" ");
};

// пример вызова и результат
// classNames("remove-btn", { hovered: true, selectable: true, red: false }, [
//   "pdg",
// ]);
// вывод:
// "remove-btn hovered selectable pdg"
