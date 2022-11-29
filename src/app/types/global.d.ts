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
// eslint-disable-next-line no-unused-vars
declare const __IS_DEV__: boolean;
