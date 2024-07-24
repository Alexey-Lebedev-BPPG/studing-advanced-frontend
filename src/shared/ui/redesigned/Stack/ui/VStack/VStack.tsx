import { forwardRef } from 'react';
import { Flex, IFlexProps } from '../Flex/Flex';

type VStackProps = Omit<IFlexProps, 'direction'>;

export const VStack = forwardRef<RefDiv, VStackProps>((props, ref) => {
  const { align = 'start' } = props;
  return <Flex ref={ref} direction='column' align={align} {...props} />;
});
