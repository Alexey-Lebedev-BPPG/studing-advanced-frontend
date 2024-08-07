import { FC, memo, useState } from 'react';
import { getUserAuthData } from '@/entities/User';
import { getFeatureFlags, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface IUiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher: FC<IUiDesignSwitcherProps> = memo(props => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const forceUpdate = useForceUpdate();

  const isAppRedesign = getFeatureFlags('isAppRedesigned');
  const authData = useAppSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  const items = [
    { content: 'Новый', valueOpt: 'new' },
    { content: 'Старый', valueOpt: 'old' },
  ];

  // ввиду того, что изменение фичи-флага это асинхронное действие, делаем функцию асинхронной и с помощью unwrap считываем результат
  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlags({
          newFeatureFlag: { isAppRedesigned: value === 'new' },
          userId: authData.id,
        }),
      ).unwrap();
      setIsLoading(false);
      // перерисовываем все приложение
      forceUpdate();
    }
  };

  return (
    <HStack>
      <Text variant='accent' text='Вариант интерфейса' />
      {isLoading ? (
        <Skeleton width={120} height={40} />
      ) : (
        <ListBox
          items={items}
          value={isAppRedesign ? 'new' : 'old'}
          className={className}
          onChange={onChange}
        />
      )}
    </HStack>
  );
});
