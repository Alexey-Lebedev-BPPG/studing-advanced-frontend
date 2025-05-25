import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './gamesCard.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IGamesCardProps {
  className?: string;
}

export const GamesCard: FC<IGamesCardProps> = memo(props => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls['games-card'], {}, [className])}>
      <div className={cls.card}>
        <h3>{'4.9'}</h3>
        <i className='fa-regular fa-heart' />
        <div className={cls.image}>
          <img
            src='https://codetheworld.io/wp-content/uploads/2023/12/Dark-Souls.png'
            alt=''
          />
          <img
            className={cls.blur}
            src='https://codetheworld.io/wp-content/uploads/2023/12/Dark-Souls.png'
            alt=''
          />
        </div>
        <div className={cls.text}>
          <h2>{'Dark Souls'}</h2>
          <p>
            {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus harum
            ducimus amet possimus eos culpa dolorem minima vitae ipsam ut, dolor
            dignissimos nesciunt, error atque modi neque aspernatur impedit
            tenetur.`}
          </p>
        </div>
      </div>
      <div className={cls.card}>
        <h3>{'4.9'}</h3>
        <i className='fa-regular fa-heart' />
        <div className={cls.image}>
          <img
            src='https://codetheworld.io/wp-content/uploads/2023/12/Far-Cry-4.png'
            alt=''
          />
          <img
            className={cls.blur}
            src='https://codetheworld.io/wp-content/uploads/2023/12/Far-Cry-4.png'
            alt=''
          />
        </div>
        <div className={cls.text}>
          <h2>{'Far Cry 4'}</h2>
          <p>
            {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus harum
            ducimus amet possimus eos culpa dolorem minima vitae ipsam ut, dolor
            dignissimos nesciunt, error atque modi neque aspernatur impedit
            tenetur.`}
          </p>
        </div>
      </div>
    </div>
  );
});
