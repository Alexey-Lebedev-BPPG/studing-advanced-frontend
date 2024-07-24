import { Disclosure } from '@headlessui/react';
import { FC, ReactNode, memo } from 'react';
import cls from './accordion.module.css';
import { VStack } from '../Stack';
// import { ArrowDownSVG, ArrowUpSVG } from '@/shared/assets/svg/Input';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IAccordionProps {
  children: ReactNode | ((open: boolean) => ReactNode);
  className?: string;
  titleContent?: ReactNode | ((open: boolean) => ReactNode);
  withButton?: boolean;
}

export const Accordion: FC<IAccordionProps> = memo(props => {
  const { children, className, titleContent, withButton } = props;

  return (
    <VStack className={classNames(cls.accordion, {}, [className])}>
      <Disclosure>
        {({ close, open }) => (
          <>
            <Disclosure.Button className={cls.button}>
              {typeof titleContent === 'function'
                ? titleContent(open)
                : titleContent}
              {/* {!!withButton && <Icon Svg={open ? ArrowUpSVG : ArrowDownSVG} />} */}
            </Disclosure.Button>
            <Disclosure.Panel>
              {typeof children === 'function' ? children(open) : children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </VStack>
  );
});
