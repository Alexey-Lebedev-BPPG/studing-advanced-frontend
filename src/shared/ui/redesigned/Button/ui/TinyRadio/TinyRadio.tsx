import { RadioGroup } from '@headlessui/react';
import { FC, memo, ReactNode, useMemo, useState } from 'react';
import cls from './tinyRadio.module.scss';
import ActiveSignalSVG from '@/shared/assets/icons/Info.svg';
import PastSignalSVG from '@/shared/assets/icons/about-20-20.svg';

type IInboundShipmentTinyRadio = 'Active' | 'Past' | 'Draft';

type ITinyItem = { name: IInboundShipmentTinyRadio; svg: ReactNode };

interface ITinyRadioProps {
  setValue: (value: IInboundShipmentTinyRadio) => void;
  value: IInboundShipmentTinyRadio;
}

export const TinyRadio: FC<ITinyRadioProps> = memo(props => {
  const { setValue, value } = props;

  const items: ITinyItem[] = useMemo(
    () => [
      {
        name: 'Active',
        svg: <ActiveSignalSVG />,
      },
      {
        name: 'Past',
        svg: <PastSignalSVG />,
      },
      // {
      //   name: 'Draft',
      //   svg: <DraftsSignalSVG />,
      // },
    ],
    [],
  );
  const defaultValue = useMemo(
    () => items.filter(item => item.name === value),
    [items, value],
  );

  const [selected, setSelected] = useState(defaultValue[0]);

  const handleChange = (newAlignment: ITinyItem) => {
    setSelected(newAlignment);
    setValue(newAlignment.name);
  };

  return (
    <div className={cls['tiny-radio']}>
      <RadioGroup value={selected} onChange={handleChange}>
        <div className={cls.wrapper}>
          {items.map((item, index) => (
            <RadioGroup.Option key={item.name} value={item}>
              {({ active, checked }) => (
                <div
                  className={cls['tiny-item']}
                  style={{
                    fill: item.name === selected.name ? '#2EF098' : '#828585',
                  }}
                >
                  {item.svg}
                  <p>{item.name}</p>
                  {index !== items.length - 1 && (
                    <div className={cls.separator} />
                  )}
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
});
