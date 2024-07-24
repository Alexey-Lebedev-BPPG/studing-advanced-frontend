import { forwardRef } from 'react';
import { Flex, IFlexProps } from '../Flex/Flex';

type IHStackProps = Omit<IFlexProps, 'direction'>;

export const HStack = forwardRef<RefDiv, IHStackProps>((props, ref) => (
  <Flex ref={ref} direction='row' {...props} />
));
