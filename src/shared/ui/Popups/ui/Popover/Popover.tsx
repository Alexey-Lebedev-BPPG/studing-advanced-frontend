import { FC, ReactNode, memo } from "react";
import { Popover as PopoverHeadless } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Popover.module.scss";
import { mapDirectionClass } from "../../styles/consts";
import { DropDownDirection } from "../../../../types/ui";
import popupCls from "../../styles/popups.module.scss";

export interface IPopoverProps {
  className?: string;
  children: ReactNode;
  trigger: ReactNode;
  direction?: DropDownDirection;
}

export const Popover: FC<IPopoverProps> = memo(
  ({ className, children, trigger, direction = "bottom left" }) => {
    const menuClasses = [mapDirectionClass[direction]];

    return (
      <PopoverHeadless
        className={classNames("", {}, [className, popupCls.popup])}
      >
        <PopoverHeadless.Button as="div" className={popupCls.trigger}>
          {trigger}
        </PopoverHeadless.Button>
        <PopoverHeadless.Panel
          className={classNames(cls.panel, {}, menuClasses)}
        >
          {children}
        </PopoverHeadless.Panel>
      </PopoverHeadless>
    );
  }
);
