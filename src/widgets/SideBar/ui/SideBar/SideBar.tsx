import { FC, memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from './SideBar.module.scss';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/Stack';
import { AppLogo } from '@/shared/ui/deprecated/AppLogo';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';

interface ISideBarProps {
  className?: string;
}

export const SideBar: FC<ISideBarProps> = memo(({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed(prev => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map(item => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} />
      )),
    [collapsed, sidebarItemsList],
  );

  return (
    <ToggleFeatures
      nameFeatures='isAppRedesigned'
      on={
        <aside
          data-testid='sidebar'
          className={classNames(
            cls.sideBarRedesigned,
            { [cls.collapsed]: collapsed },
            [className],
          )}
        >
          <AppLogo className={cls.appLogo} />
        </aside>
      }
      off={
        <aside
          data-testid='sidebar'
          className={classNames(cls.sideBar, { [cls.collapsed]: collapsed }, [
            className,
          ])}
        >
          <Button
            square
            type='button'
            data-testid='sidebar-toggle'
            className={cls.collapsedBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            onClick={onToggle}
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role='navigation' gap='8' className={cls.items}>
            {/* рендерим наши ссылки сайдбара */}
            {itemsList}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
    />
  );
});
