import { Menu } from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";
import { AppLink } from "../../../AppLink/AppLink";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popups.module.scss";
import cls from "./Dropdown.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DropDownDirection } from "@/shared/types/ui";

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface IDropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropDownDirection;
}

export const Dropdown: FC<IDropdownProps> = ({
  className,
  items,
  trigger,
  direction = "bottom left",
}) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames("", {}, [className, popupCls.popup])}>
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map(({ disabled, onClick, content, href }, index) => {
          const contentMenuItem = ({ active }: { active: boolean }) => (
            <button
              type="button"
              disabled={disabled}
              className={classNames(cls.item, { [popupCls.active]: active })}
              onClick={onClick}
            >
              {content}
            </button>
          );

          if (href)
            return (
              <Menu.Item key={index} as={AppLink} to={href} disabled={disabled}>
                {contentMenuItem}
              </Menu.Item>
            );

          return (
            <Menu.Item key={index} as={Fragment} disabled={disabled}>
              {contentMenuItem}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
