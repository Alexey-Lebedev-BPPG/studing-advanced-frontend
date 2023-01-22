import { profileReducer } from "entities/Profile";
import { t } from "i18next";
import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import cls from "./ProfilePage.module.scss";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface IProfilePageProps {
  className?: string;
}

const ProfilePage: FC<IProfilePageProps> = ({ className }) => (
  <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
    <div className={classNames(cls.profilePage, {}, [className])}>
      {t("Profile Page")}
    </div>
  </DynamicModuleLoader>
);

export default ProfilePage;
