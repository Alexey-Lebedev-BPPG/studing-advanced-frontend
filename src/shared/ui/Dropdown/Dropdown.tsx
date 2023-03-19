import { FC, Fragment, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Menu } from "@headlessui/react";
import { DropDownDirection } from "shared/types/ui";
import cls from "./Dropdown.module.scss";
import { AppLink } from "../AppLink/AppLink";

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

const mapDirectionClass: Record<DropDownDirection, string> = {
  "top left": cls.menuTopLeft,
  "top right": cls.menuTopRight,
  "bottom left": cls.menuBottomLeft,
  "bottom right": cls.menuBottomRight,
};

export const Dropdown: FC<IDropdownProps> = ({
  className,
  items,
  trigger,
  direction = "bottom left",
}) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames(cls.dropdown, {}, [className])}>
      <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map(({ disabled, onClick, content, href }, index) => {
          const contentMenuItem = ({ active }: { active: boolean }) => (
            <button
              type="button"
              disabled={disabled}
              className={classNames(cls.item, { [cls.active]: active })}
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
