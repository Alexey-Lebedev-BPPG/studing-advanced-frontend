export const buildFileLoader = () => ({
  test: /\.(png|jpe?g|gif)$/i,
  // исключаем node_modules
  exclude: /node_modules/,
  use: [
    {
      loader: "file-loader",
    },
  ],
});
