// добавляем, чтоб typescript начал понимать модули
declare module '*.module.scss' {
  const value: Record<string, string>;
  export default value;
}

declare module '*.module.sass' {
  const value: Record<string, string>;
  export default value;
}

declare module '*.module.css' {
  const value: Record<string, string>;
  export default value;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.webp';
declare module '*.avif';
declare module '*.bmp';
declare module '*.gif';

declare module '*.svg' {
  import { SVGProps, FunctionComponent } from 'react';

  const SVG: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
  export default SVG;
}

// декларируем константу из вебпака
declare const __IS_DEV__: boolean;
declare const __IS_DEV_DEBUG__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

// используем глобальный тип для DeepPartial по всему проекту
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

// кастомный тип для обычного рекорда, в котором ключ не обязателен
type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

type ValidRowModel = {
  [key: string]: any;
};

// кастомный тип для обработки блоб файлов
interface Navigator {
  msSaveOrOpenBlob?: (blobOrBase64: Blob | string, filename: string) => void;
}

// service
interface IResponse<R = unknown> {
  data: R;
  status: number;
  success?: boolean;
}

interface IAction<P = unknown> {
  payload?: P;
  type: string;
}

interface IMessage {
  message: string;
}

interface IErrorMessage extends IMessage {
  error: string;
  statusCode: number;
}

type RefDiv = HTMLDivElement;
type RefBTN = HTMLButtonElement;
type RefInput = HTMLInputElement;
type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
