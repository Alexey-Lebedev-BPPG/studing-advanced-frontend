import { FC, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import CopyIcon from "shared/assets/icons/copy-20-20.svg";
import cls from "./Code.module.scss";
import { Button, ButtonTheme } from "../Button/Button";

interface ICodeProps {
  className?: string;
  text: string;
}

export const Code: FC<ICodeProps> = memo(({ className, text }) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    // pre позволяет сохранять пробелы и переносы для кода
    <pre className={classNames(cls.code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={cls.copyBtn}
        theme={ButtonTheme.CLEAR}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
