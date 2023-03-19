const fs = require("fs/promises");
const resolveRoot = require("../resolveRoot");
const reduxSliceTemplate = require("./reduxSliceTemplate");
const schemaTypeTemplate = require("./schemaTypeTemplate");

module.exports = async (layer, sliceName) => {
  // получаем путь до модели, указав слой и слайс
  const resolveModelPath = (...segments) =>
    resolveRoot("src", layer, sliceName, "model", ...segments);

  const createModelStructure = async () => {
    try {
      // внутри папки model создаем другие папки (types, slices, selectors, services)
      await fs.mkdir(resolveModelPath());
      await fs.mkdir(resolveModelPath("types"));
      await fs.mkdir(resolveModelPath("slices"));
      await fs.mkdir(resolveModelPath("selectors"));
      await fs.mkdir(resolveModelPath("services"));
    } catch (e) {
      console.log(
        `Не удалось создать model сегмент для слайса ${sliceName}`,
        e
      );
    }
  };

  // функция создания файла слайса
  const createReduxSlice = async () => {
    try {
      await fs.writeFile(
        // указываем путь создания
        resolveModelPath("slices", `${sliceName}Slice.ts`),
        // создаем файл слайса по шаблону
        reduxSliceTemplate(sliceName)
      );
    } catch (e) {
      console.log("Не удалось создать редакс слайс", e);
    }
  };

  // функция создания файла схемы стейта
  const createSchemaType = async () => {
    try {
      await fs.writeFile(
        resolveModelPath("types", `${sliceName}Schema.ts`),
        schemaTypeTemplate(sliceName)
      );
    } catch (e) {
      console.log("Не удалось создать тип схемы стейта", e);
    }
  };

  await createModelStructure();
  await createReduxSlice();
  await createSchemaType();
};
