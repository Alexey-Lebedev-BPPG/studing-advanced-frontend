interface ICalcsSkeletonSizes {
  firstRow: { height: number };
  fourthRow: {
    firstBlock: { height: number };
    secondBlock: { height: number };
  };
  secondRow: {
    firstBlock: { height: number };
    secondBlock: { height: number };
  };
  thirdRow: { firstBlock: { height: number }; secondBlock: { height: number } };
}

export const calcSkeletonSizes = (
  isMobile: boolean,
  isTablet: boolean,
): ICalcsSkeletonSizes => {
  if (isMobile)
    return {
      firstRow: { height: 79 },
      fourthRow: { firstBlock: { height: 20 }, secondBlock: { height: 33 } },
      secondRow: { firstBlock: { height: 20 }, secondBlock: { height: 33 } },
      thirdRow: { firstBlock: { height: 20 }, secondBlock: { height: 33 } },
    };

  if (isTablet)
    return {
      firstRow: { height: 61 },
      fourthRow: { firstBlock: { height: 20 }, secondBlock: { height: 33 } },
      secondRow: { firstBlock: { height: 20 }, secondBlock: { height: 33 } },
      thirdRow: { firstBlock: { height: 20 }, secondBlock: { height: 33 } },
    };

  return {
    firstRow: { height: 69 },
    fourthRow: { firstBlock: { height: 20 }, secondBlock: { height: 33 } },
    secondRow: { firstBlock: { height: 20 }, secondBlock: { height: 33 } },
    thirdRow: { firstBlock: { height: 20 }, secondBlock: { height: 33 } },
  };
};
