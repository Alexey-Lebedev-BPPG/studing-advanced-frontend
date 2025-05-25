import { FC, memo, useEffect, useState } from 'react';
import cls from './CSSTypingTextEffect.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ICSSTypingTextEffectProps {
  className?: string;
}

const words = ['hard', 'fun', 'a journey', 'life'];

const delay = {
  erasing: 100,
  keeping: 1000,
  typing: 200,
  word: 2000,
};

export const CSSTypingTextEffect: FC<ICSSTypingTextEffectProps> = memo(
  props => {
    const { className } = props;

    const [typingClass, setTypingClass] = useState(false);

    const [textTyping, setTextTyping] = useState('');

    const sleep = (ms: number) =>
      new Promise(resolve => {
        setTimeout(resolve, ms);
      });

    const type = async (word: string) => {
      setTypingClass(true);
      // eslint-disable-next-line no-restricted-syntax
      for (const char of word) {
        setTextTyping(prevText => prevText + char);
        // eslint-disable-next-line no-await-in-loop
        await sleep(delay.typing);
      }
      setTypingClass(false);
      await sleep(delay.keeping);

      for (let i = 0; i <= word.length; i++) {
        setTextTyping(word.substring(0, word.length - i));
        // eslint-disable-next-line no-await-in-loop
        await sleep(delay.erasing);
      }
    };

    const loop = async (wordIndex = 0) => {
      await type(words[wordIndex % words.length]);

      setTimeout(async () => {
        await loop(wordIndex + 1);
      }, delay.word);
    };

    useEffect(() => {
      loop();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        className={classNames(cls['css-typing-text-effect'], {}, [className])}
      >
        <p>
          {'Coding is'} <span className={cls['typing-text']}>{textTyping}</span>
          <span
            className={classNames(cls.cursor, {
              [cls.typing]: typingClass,
            })}
          >
            &nbsp;
          </span>
        </p>
      </div>
    );
  },
);
