import { Listbox as HListbox } from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";
import { classNames } from "../../../../lib/classNames/classNames";
import { DropDownDirection } from "../../../../types/ui";
import { Button } from "../../../Button/Button";
import { HStack } from "../../../Stack";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popups.module.scss";
import cls from "./ListBox.module.scss";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface IListBoxProps {
  className?: string;
  items?: ListBoxItem[];
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropDownDirection;
  label?: string;
}

export const ListBox: FC<IListBoxProps> = ({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = "bottom left",
  label,
}) => {
  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListbox
        as="div"
        disabled={readonly}
        className={classNames("", {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <HListbox.Button disabled={readonly} className={popupCls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListbox.Button>
        <HListbox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListbox.Option
              key={item.value}
              value={item.value}
              // делаем как фрагмент элемент, чотб не создавать новые ноды
              as={Fragment}
              disabled={item.disabled}
            >
              {/* selected - выбранный элемент, а active - ховер элемент */}
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                  })}
                >
                  {selected && "!!!"}
                  {item.content}
                </li>
              )}
            </HListbox.Option>
          ))}
        </HListbox.Options>
      </HListbox>
    </HStack>
  );
};
