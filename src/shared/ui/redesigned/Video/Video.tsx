import { FC, SourceHTMLAttributes, VideoHTMLAttributes, memo } from 'react';
import cls from './Video.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IVideo
  extends VideoHTMLAttributes<HTMLVideoElement>,
    Pick<SourceHTMLAttributes<HTMLSourceElement>, 'type'> {
  bottom?: number;
  height?: number | string;
  left?: number;
  position?: 'absolute' | 'relative' | 'static' | 'fixed';
  right?: number;
  top?: number;
  width?: number | string;
}

export const Video: FC<IVideo> = memo(props => {
  const {
    autoPlay = true,
    bottom,
    className,
    height,
    left,
    loop = true,
    muted = true,
    position,
    right,
    src,
    top,
    type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
    width,
    ...otherProps
  } = props;

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      muted={muted}
      loop={loop}
      autoPlay={autoPlay}
      width={width}
      height={height}
      className={classNames(cls.video, {}, [className])}
      style={{ bottom, left, position, right, top }}
      {...otherProps}
    >
      <source src={src} type={type} />
    </video>
  );
});
