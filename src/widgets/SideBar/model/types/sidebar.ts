import { VFC, SVGProps } from "react";

export interface SidebarItemType {
  path: string;
  text: string;
  // ввиду того, что компоненты пишутся с большой буквы, поле icon пишем также с большой буквы
  Icon: VFC<SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}
