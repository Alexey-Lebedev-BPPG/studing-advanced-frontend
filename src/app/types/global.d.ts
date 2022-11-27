// добавляем, чтоб typescript начал понимать модули
declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classes: IClassNames;
  export default classes;
}
