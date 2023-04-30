import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './AddCommentForm.module.scss';
import { getAddCommentFormText } from '../model/selectors/getAddCommentForm/getAddCommentForm';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../model/slice/addCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';

export interface IAddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<IAddCommentFormProps> = memo(
  ({ className, onSendComment }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const text = useSelector(getAddCommentFormText);

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setText(value));
      },
      [dispatch],
    );

    const onSendHandler = useCallback(() => {
      onSendComment(text || '');
      onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
      <DynamicModuleLoader reducers={reducers}>
        <HStack
          max
          justify='between'
          className={classNames(cls.addCommentForm, {}, [className])}
          data-testid='AddCommentForm'
        >
          <Input
            placeholder={`${t('Введите текст комментария')}`}
            value={text}
            className={cls.input}
            data-testid='AddCommentForm.Input'
            onChange={onCommentTextChange}
          />
          <Button data-testid='AddCommentForm.Button' onClick={onSendHandler}>
            {t('Отправить')}
          </Button>
        </HStack>
      </DynamicModuleLoader>
    );
  },
);

export default AddCommentForm;
