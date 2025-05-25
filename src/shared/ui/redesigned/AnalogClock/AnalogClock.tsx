import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import cls from './analogClock.module.css';

interface AnalogIClockProps {
  className?: string;
}

const deg = 6;

export const AnalogClock: FC<AnalogIClockProps> = memo(props => {
  const { className } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const day = new Date();
  const hh = useMemo(() => day.getHours() * 30, [day]);
  const mm = useMemo(() => day.getMinutes() * deg, [day]);
  const ss = useMemo(() => day.getSeconds() * deg, [day]);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [transformHour, setTransformHour] = useState({});
  const [transformMin, setTransformMin] = useState({});
  const [transformSec, setTransformSec] = useState({});

  const setClock = useCallback(() => {
    setTransformHour(prev => ({
      ...prev,
      transform: `rotateZ(${hh + mm / 12}deg)`,
    }));
    setTransformMin(prev => ({ ...prev, transform: `rotateZ(${mm}deg)` }));
    setTransformSec(prev => ({ ...prev, transform: `rotateZ(${ss}deg)` }));
  }, [hh, mm, ss]);

  const switchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'light' ? 'dark' : 'light',
    );
  };

  document.documentElement.setAttribute('data-theme', theme);

  useEffect(() => {
    const interval = setInterval(setClock, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className={cls.body}>
      <div className={cls.clock}>
        <div className={cls.hour} style={transformHour} />
        <div className={cls.min} style={transformMin} />
        <div className={cls.sec} style={transformSec} />
      </div>
      <button
        type='button'
        className={cls['switch-button']}
        onClick={switchTheme}
      >
        {theme === 'light' ? 'dark' : 'light'}
      </button>
    </div>
  );
});
