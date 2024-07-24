import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import cls from './tooltip.module.scss';
import { HStack } from '../../../Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PositionTooltip } from '@/shared/types/ui';

interface ITooltipProps {
  children?: ReactNode;
  classNameTextBlock?: string;
  classNameTooltip?: string;
  disableHover?: boolean;
  placement?: PositionTooltip;
  textWidth?: string | number;
  titleText: string | ReactNode;
}

export const Tooltip: FC<ITooltipProps> = props => {
  const {
    children,
    classNameTextBlock,
    classNameTooltip,
    disableHover,
    placement = 'top',
    textWidth,
    titleText,
  } = props;

  const [active, setActive] = useState(false);

  const handleChangeActive = useCallback(() => {
    if (disableHover) setActive(prev => !prev);
  }, [disableHover]);

  const modsTooltip = {
    [cls.hover]: !disableHover,
  };

  const content = useMemo(() => {
    const modsText = {
      [cls[placement]]: true,
      [cls.active]: disableHover && active,
    };

    return (
      <HStack
        justify='center'
        style={{ width: textWidth }}
        className={classNames(cls['tooltip-text'], modsText, [
          classNameTextBlock,
        ])}
      >
        <p>{titleText}</p>
      </HStack>
    );
  }, [
    active,
    classNameTextBlock,
    disableHover,
    placement,
    textWidth,
    titleText,
  ]);

  const renderContent = useCallback(() => {
    if (disableHover) if (active) return content;

    return content;
  }, [active, content, disableHover]);

  return (
    <div
      className={classNames(cls.tooltip, modsTooltip, [classNameTooltip])}
      onClick={handleChangeActive}
    >
      {children}
      {renderContent()}
    </div>
  );
};

export default Tooltip;
