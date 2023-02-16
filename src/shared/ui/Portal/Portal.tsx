import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface IPortalProps {
  // то, что будем телепортировать
  children?: ReactNode;
  // то, куда будем телепортировать
  element?: HTMLElement;
}

export const Portal: FC<IPortalProps> = ({
  children,
  element = document.body,
}) => createPortal(children, element);
