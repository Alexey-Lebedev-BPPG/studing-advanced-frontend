import { Listbox as HListbox } from '@headlessui/react';
import { FC, Fragment, ReactNode } from 'react';
import cls from './ListBox.module.scss';
import { classNames } from '../../../../../lib/classNames/classNames';
import { DropDownDirection } from '../../../../../types/ui';
import { HStack } from '../../../../redesigned/Stack';
import { Button } from '../../../Button/Button';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popups.module.scss';

export interface ListBoxItem {
  content: ReactNode;
  disabled?: boolean;
  value: string;
}

interface IListBoxProps {
  className?: string;
  defaultValue?: string;
  direction?: DropDownDirection;
  items?: ListBoxItem[];
  label?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  value?: string;
}

export const ListBox: FC<IListBoxProps> = ({
  className,
  defaultValue,
  direction = 'bottom left',
  items,
  label,
  onChange,
  readonly,
  value,
}) => {
  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  return (
    <HStack gap='4'>
      {!!label && <span>{`${label}>`}</span>}
      <HListbox
        as='div'
        disabled={readonly}
        className={classNames('', {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <HListbox.Button as='div' className={popupCls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListbox.Button>
        <HListbox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map(item => (
            <HListbox.Option
              key={item.value}
              value={item.value}
              // делаем как фрагмент элемент, чтоб не создавать новые ноды
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
                  {selected ? '!!!' : null}
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
