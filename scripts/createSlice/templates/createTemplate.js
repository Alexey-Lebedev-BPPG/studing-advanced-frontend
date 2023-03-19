const fs = require("fs/promises");
const resolveRoot = require("../resolveRoot");
const createModel = require("./createModel");
const createUI = require("./createUI");
const createPublicApi = require("./createPublicApi");

module.exports = async (layer, sliceName) => {
  try {
    // создаем папку для слоя и слайса
    await fs.mkdir(resolveRoot("src", layer, sliceName));
  } catch (e) {
    console.log(`не удалось создать директорию для слайса${sliceName}`);
  }

  // последовательно создаем папки с файлами (model, ui, api)
  await createModel(layer, sliceName);
  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
};
