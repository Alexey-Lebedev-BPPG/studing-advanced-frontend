import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cls from './cROBanner.module.css';
import { randomPackageName } from './randomPackageName';
import { BannerMessage } from '../BannerMessage/BannerMessage';
import CloseBtn from '@/shared/assets/svg/CROBanner/close-cro-banner.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ICroBanner {
  checkObserve: boolean;
  className?: string;
  onClose: () => void;
  once: boolean;
}

export const CroBanner: FC<ICroBanner> = memo(props => {
  const { checkObserve, className, once, onClose } = props;

  const [random, setRandom] = useState(
    Math.floor(1235 + Math.random() * (1423 - 1235)),
  );

  const [showUpAnimationForFirst, setShowUpAnimationForFirst] = useState(false);
  const [showUpAnimationForSecond, setShowUpAnimationForSecond] =
    useState(false);
  const [showUpAnimationForThird, setShowUpAnimationForThird] = useState(false);

  const timeoutUpAnimationForFirst = useRef<NodeJS.Timeout | null>(null);
  const timeoutUpAnimationForSecond = useRef<NodeJS.Timeout | null>(null);
  const timeoutDownAnimationForFirst = useRef<NodeJS.Timeout | null>(null);

  const [showDownAnimationForFirst, setShowDownAnimationForFirst] =
    useState(false);
  const [firsOperationObserver, setFirsOperationObserver] = useState(false);

  const toShowFirst = useCallback(() => {
    timeoutUpAnimationForFirst.current = setTimeout(() => {
      setShowUpAnimationForFirst(true);
      setRandom(random + 1);
      timeoutDownAnimationForFirst.current = setTimeout(() => {
        setShowDownAnimationForFirst(true);
      }, 10000);
    }, 10000);
  }, [random]);

  const toShowDouble = useCallback(() => {
    clearTimeout(timeoutUpAnimationForFirst.current as NodeJS.Timeout);
    clearTimeout(timeoutDownAnimationForFirst.current as NodeJS.Timeout);
    showUpAnimationForFirst && setShowDownAnimationForFirst(true);
    timeoutUpAnimationForSecond.current = setTimeout(() => {
      setFirsOperationObserver(true);
      setShowUpAnimationForSecond(true);
      setShowUpAnimationForThird(true);
      setRandom(prevState => prevState + 2);
    }, 3000);
  }, [showUpAnimationForFirst]);

  useEffect(() => {
    !once && toShowFirst();

    return () => {
      clearTimeout(timeoutUpAnimationForFirst.current as NodeJS.Timeout);
      clearTimeout(timeoutDownAnimationForFirst.current as NodeJS.Timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    !firsOperationObserver && checkObserve && toShowDouble();
    return () =>
      clearTimeout(timeoutUpAnimationForSecond.current as NodeJS.Timeout);
  }, [checkObserve, firsOperationObserver, toShowDouble]);

  const classNameFirstEl = useMemo(
    () =>
      classNames(
        '',
        {
          [cls['first-banner']]: showUpAnimationForFirst,
          [cls['hide-first-banner-forcibly']]: showDownAnimationForFirst,
        },
        [],
      ),
    [showDownAnimationForFirst, showUpAnimationForFirst],
  );

  const classNameSecondEl = useMemo(
    () =>
      classNames('', { [cls['second-banner']]: showUpAnimationForSecond }, []),
    [showUpAnimationForSecond],
  );

  const classNameThirdEl = useMemo(
    () =>
      classNames('', { [cls['third-banner']]: showUpAnimationForThird }, []),
    [showUpAnimationForThird],
  );

  return (
    <VStack className={cls.wrapper}>
      <HStack className={classNames(cls['cro-banner'], {}, [className])}>
        <Text className={cls.count} variant='accent' text={String(random)} />
        <Text
          variant='accent'
          className={cls.text}
          text={'Active users trade with Jerold signals'}
        />
        <Icon
          clickable
          color='#CCCACA'
          width={24}
          height={24}
          Svg={CloseBtn}
          className={cls['close-button']}
          onClick={onClose}
        />
      </HStack>
      <div className={classNames(cls['first-banner-wrapper'], {}, [])}>
        <BannerMessage
          text={`+1 ${'New user added to '} ${randomPackageName(1)} ${'channel'}`}
          className={classNameFirstEl}
        />
      </div>
      <BannerMessage
        text={`+1 ${'New user added to '} ${randomPackageName(2)} ${'channel'}`}
        className={classNameThirdEl}
      />
      <BannerMessage
        text={`+1 ${'New user added to '} ${randomPackageName(3)} ${'channel'}`}
        className={classNameSecondEl}
      />
    </VStack>
  );
});
