import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps {
  // то, что будем телепортировать
  children?: ReactNode;
  // то, куда будем телепортировать
  element?: HTMLElement;
}

export const Portal: FC<IPortalProps> = ({
  children,
  // указываем расположение внутри App, чтоб стили применялись адекватно
  element = document.getElementById('app') || document.body,
}) => createPortal(children, element);
