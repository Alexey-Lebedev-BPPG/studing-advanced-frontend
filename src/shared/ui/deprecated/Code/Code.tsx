import { FC, memo, useCallback } from 'react';
import cls from './Code.module.scss';
import { Button, ButtonTheme } from '../Button/Button';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ICodeProps {
  className?: string;
  text: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Code: FC<ICodeProps> = memo(({ className, text }) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    // pre позволяет сохранять пробелы и переносы для кода
    <pre className={classNames(cls.code, {}, [className])}>
      <Button
        className={cls.copyBtn}
        theme={ButtonTheme.CLEAR}
        onClick={onCopy}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
