import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

interface IDetailsContainerProps {
  className?: string;
}

export const DetailsContainer: FC<IDetailsContainerProps> = memo(props => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Card
      fullHeight
      fullWidth
      border='round'
      className={className}
      padding='24'
    >
      <ArticleDetails id={id} />
    </Card>
  );
});
