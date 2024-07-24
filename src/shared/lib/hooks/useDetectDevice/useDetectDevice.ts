// один из вариантов вычисления, когда сайт открыт на мобильной версии, можно использовать библу react-device-detect. Но лучше использовать функцию detectDevice как здесь (https://github.com/jepser/use-match-media/blob/master/src/use-match-media.ts)
export const useDetectDevice = () => {
  const isMobile = window.matchMedia;
  if (!isMobile) return false;

  const device = isMobile('(pointer:coarse)');
  return device.matches;
};

// другой вариант
// export const useDetectDevice = () => {
//   if (!window || !window.matchMedia)
//     return {
//       isDesktop: false,
//       isMobile: false,
//       isTablet: false,
//       isTabletHorizontal: false,
//     };

//   const currentMatchMedia = window.matchMedia;

//   const deviceTabletHorizontal = currentMatchMedia(
//     '(width < 1440px) and (width > 1024px)',
//   );
//   const isTabletHorizontal = deviceTabletHorizontal.matches;

//   const deviceTablet = currentMatchMedia(
//     '(width <= 1024px) and (width >= 768px)',
//   );
//   const isTablet = deviceTablet.matches;

//   const deviceMobile = currentMatchMedia('(width < 768px)');
//   const isMobile = deviceMobile.matches;

//   return {
//     isDesktop: !isMobile && !isTablet && !isTabletHorizontal,
//     isMobile,
//     isTablet,
//     isTabletHorizontal,
//   };
// };
// здесь мы задаем параметры и вызываем хук где необходимо, доставая необходимые параметры
