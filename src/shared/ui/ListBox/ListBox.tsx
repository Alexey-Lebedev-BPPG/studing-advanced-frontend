import { FC, Fragment, ReactNode } from "react";
import { Listbox as HListbox } from "@headlessui/react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ListBox.module.scss";
import { Button } from "../Button/Button";
import { HStack } from "../Stack";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropDownDirection = "top" | "bottom";

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

const mapDirectionClass: Record<DropDownDirection, string> = {
  top: cls.optionsTop,
  bottom: cls.optionsBottom,
};

export const ListBox: FC<IListBoxProps> = ({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = "bottom",
  label,
}) => {
  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListbox
        as="div"
        disabled={readonly}
        className={classNames(cls.listBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListbox.Button disabled={readonly} className={cls.trigger}>
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
                    [cls.active]: active,
                    [cls.disabled]: item.disabled,
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
