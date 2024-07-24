import { ImgHTMLAttributes, memo } from 'react';
import { AppImage } from '../AppImage';
import { IAppImageProps } from '../AppImage/ui/AppImage';

interface ItemSource {
  /**
   * here the <media> parameter is specified for the <source> tag of the avif format. If a number is passed, then min-width is applied. If a string is passed, it is applied
   */
  media?: number;
  src: string;
}

type BaseImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height'
> &
  Omit<IAppImageProps, 'alt' | 'src'>;

interface PicturesProps extends BaseImageProps {
  className?: string;
  format?: string;
  /**
   * the parameter accepts images as an array, and they are specified in descending order from the largest to the smallest
   * for example: [
   *  {src: '/image-1280.avif', media: '1280'},
   *  {src: '/image-640.avif', media: '640'},
   *  {src: '/image-320.avif', media: '320'}
   * ]
   */
  srcAvif?: ItemSource[];
  /**
   * the parameter accepts images as an array, and they are specified in descending order from the largest to the smallest
   * for example: [
   *  {src: '/image-1280.png', media: '1280'},
   *  {src: '/image-640.png', media: '640'},
   *  {src: '/image-320.png', media: '320'}
   * ]
   */
  srcImage?: ItemSource[];
  /**
   * the parameter accepts images as an array, and they are specified in descending order from the largest to the smallest
   * for example: [
   *  {src: '/image-1280.webp', media: '1280'},
   *  {src: '/image-640.webp', media: '640'},
   *  {src: '/image-320.webp', media: '320'}
   * ]
   */
  srcWebp?: ItemSource[];
}

// example of use in src/pages/HomePage/ui/AppsBlock/AppsBlock.tsx
export const Pictures = memo((props: PicturesProps) => {
  const {
    alt = 'Image',
    className,
    format = 'png',
    srcAvif,
    srcImage,
    srcWebp,
    ...otherProps
  } = props;

  const currentMedia = (media?: number | string) => {
    if (media)
      return typeof media === 'number' ? `(min-width: ${media}px)` : media;

    return '';
  };

  const currentSources = (typeFormat: string, arr?: ItemSource[]) =>
    arr?.length
      ? arr?.map(item => (
          <source
            key={`${item.src} + ${item.media}`}
            srcSet={item.src}
            type={`image/${typeFormat}`}
            media={currentMedia(item?.media)}
          />
        ))
      : null;

  return (
    <picture>
      {!!srcAvif?.length && currentSources('avif', srcAvif)}
      {!!srcWebp?.length && currentSources('webp', srcWebp)}
      {!!srcImage?.length && currentSources(format, srcImage)}
      <AppImage
        className={className}
        decoding='async'
        loading='lazy'
        src={srcImage?.[0].src || ''}
        alt={alt}
        {...otherProps}
      />
    </picture>
  );
});
