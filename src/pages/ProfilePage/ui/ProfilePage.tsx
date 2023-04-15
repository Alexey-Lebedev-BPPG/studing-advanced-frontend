import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cls from './ProfilePage.module.scss';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

interface IProfilePageProps {
  className?: string;
}

const ProfilePage: FC<IProfilePageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page
      data-testid='ProfilePage'
      className={classNames(cls.profilePage, {}, [className])}
    >
      <VStack max gap='16'>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
