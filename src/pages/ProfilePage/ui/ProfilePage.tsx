import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import Page from "widgets/Page/Page";
import { VStack } from "shared/ui/Stack";
import { EditableProfileCard } from "features/EditableProfileCard";
import { useParams } from "react-router-dom";
import { Text } from "shared/ui/Text/Text";
import cls from "./ProfilePage.module.scss";

interface IProfilePageProps {
  className?: string;
}

const ProfilePage: FC<IProfilePageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <Text text="Профиль не найден" />;

  return (
    <Page className={classNames(cls.profilePage, {}, [className])}>
      <VStack max gap="16">
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
