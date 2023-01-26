// добавляем, чтоб typescript начал понимать модули
declare module "*.module.scss" {
  const value: Record<string, string>;
  export default value;
}

declare module "*.module.sass" {
  const value: Record<string, string>;
  export default value;
}

declare module "*.module.css" {
  const value: Record<string, string>;
  export default value;
}

declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";

declare module "*.svg" {
  import React from "react";

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

// декларируем константу из вебпака
declare const __IS_DEV__: boolean;
declare const __IS_DEV_DEBUG__: boolean;
declare const __API__: string;

// используем глобальный тип для DeepPartial по всему проекту
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
