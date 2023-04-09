import { FC } from "react";
import { useParams } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import Page from "@/widgets/Page/Page";
import { VStack } from "@/shared/ui/Stack";
import { EditableProfileCard } from "@/features/EditableProfileCard";
import cls from "./ProfilePage.module.scss";

interface IProfilePageProps {
  className?: string;
}

const ProfilePage: FC<IProfilePageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page className={classNames(cls.profilePage, {}, [className])}>
      <VStack max gap="16">
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
