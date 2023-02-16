import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Loader } from "shared/ui/Loader/Loader";
import cls from "./PageLoader.module.scss";

interface IPageLoaderProps {
  className?: string;
}

export const PageLoader: FC<IPageLoaderProps> = ({ className }) => (
  <div className={classNames(cls.pageLoader, {}, [className])}>
    <Loader />
  </div>
);
