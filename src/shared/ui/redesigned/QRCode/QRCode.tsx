import QRCodeStyling, { Options } from 'qr-code-styling';
import { CSSProperties, FC, memo, useEffect, useMemo, useRef } from 'react';
import cls from './qrCode.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
// import {
//   useQRCodeStylingLibs,
//   QRCodeStylingProvider,
//   Options,
// } from '@/shared/lib/components/QRCodeStylingProvider';

export interface IGetOptionsProps {
  backgroundColor?: string;
  circleColor?: string;
  className?: string;
  cornersColor?: string;
  dotsColor?: string;
  height?: number;
  width?: number;
}

export interface IQRCodeProps extends IGetOptionsProps {
  id: string;
  style?: CSSProperties;
  value: string;
}

export const QRCode: FC<IQRCodeProps> = memo(props => {
  const {
    backgroundColor = '#121212',
    circleColor = '#dbdbdb',
    className,
    cornersColor = '#dbdbdb',
    dotsColor = '#828585',
    height = 200,
    id,
    style,
    value,
    width = 200,
  } = props;

  // const { QRCodeStyling } = useQRCodeStylingLibs();
  const ref = useRef(null);

  const getOptions = useMemo(
    (): Partial<Options> => ({
      backgroundOptions: { color: backgroundColor },
      cornersDotOptions: { color: circleColor, type: 'dot' },
      cornersSquareOptions: { color: cornersColor, type: 'extra-rounded' },
      dotsOptions: { color: dotsColor, type: 'dots' },
      height,
      qrOptions: { errorCorrectionLevel: 'L', mode: 'Byte', typeNumber: 0 },
      width,
    }),
    [backgroundColor, circleColor, cornersColor, dotsColor, height, width],
  );

  useEffect(() => {
    const qrCode = new QRCodeStyling(getOptions);
    ref?.current && qrCode.append(ref.current);
    qrCode.update({ data: value });
    if (qrCode._canvas) qrCode._canvas.id = id;
  }, [getOptions, id, value]);

  return (
    <div
      ref={ref}
      className={classNames(cls['qr-code'], {}, [className])}
      style={style}
    />
  );
});

// const QRCodeAsync = (props: IQRCodeProps) => {
//   const { isLoaded } = useQRCodeStylingLibs();

//   if (!isLoaded) return null;

//   return <QRCodeContent {...props} />;
// };

// export const QRCode = (props: IQRCodeProps) => (
//   <QRCodeStylingProvider>
//     <QRCodeAsync {...props} />
//   </QRCodeStylingProvider>
// );
