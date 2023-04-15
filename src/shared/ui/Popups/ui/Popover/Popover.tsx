import { Popover as PopoverHeadless } from '@headlessui/react';
import { FC, ReactNode, memo } from 'react';
import { DropDownDirection } from '../../../../types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popups.module.scss';
import cls from './Popover.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface IPopoverProps {
  className?: string;
  children: ReactNode;
  trigger: ReactNode;
  direction?: DropDownDirection;
}

export const Popover: FC<IPopoverProps> = memo(
  ({ className, children, trigger, direction = 'bottom left' }) => {
    const menuClasses = [mapDirectionClass[direction]];

    return (
      <PopoverHeadless
        className={classNames('', {}, [className, popupCls.popup])}
      >
        <PopoverHeadless.Button as='div' className={popupCls.trigger}>
          {trigger}
        </PopoverHeadless.Button>
        <PopoverHeadless.Panel
          className={classNames(cls.panel, {}, menuClasses)}
        >
          {children}
        </PopoverHeadless.Panel>
      </PopoverHeadless>
    );
  },
);
