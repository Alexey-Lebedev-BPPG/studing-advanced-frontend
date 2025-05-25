import { FC, memo } from 'react';
import cls from './accordionSlider.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IAccordionSliderProps {
  className?: string;
}

export const AccordionSlider: FC<IAccordionSliderProps> = memo(props => {
  const { className } = props;

  return (
    <div className={classNames(cls['accordion-slider'], {}, [className])}>
      <ul>
        <li>
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href='#'>
              <h2>{'Slide 1'}</h2>
              <p>{'description slide 1'}</p>
            </a>
          </div>
        </li>
        <li>
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href='#'>
              <h2>{'Slide 2'}</h2>
              <p>{'description slide 2'}</p>
            </a>
          </div>
        </li>
        <li>
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href='#'>
              <h2>{'Slide 3'}</h2>
              <p>{'description slide 3'}</p>
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
});
