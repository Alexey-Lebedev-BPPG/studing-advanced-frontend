import { DropDownDirection } from "../../../types/ui";
import cls from "./popups.module.scss";

export const mapDirectionClass: Record<DropDownDirection, string> = {
  "top left": cls.menuTopLeft,
  "top right": cls.menuTopRight,
  "bottom left": cls.menuBottomLeft,
  "bottom right": cls.menuBottomRight,
};
