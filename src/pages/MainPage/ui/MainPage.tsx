import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getArticleDetailsData } from '@/entities/Article';
import { Counter } from '@/entities/Counter';
import { HightRes } from '@/features/ModalWithZoom';
import { CreateBoxModal } from '@/features/createBoxModal';
import Review1Desktop from '@/shared/assets/images/Desktop/Reviews/EnVersion/Review1_Desktop.avif';
import Review2Desktop from '@/shared/assets/images/Desktop/Reviews/EnVersion/Review2_Desktop.avif';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { Input } from '@/shared/ui/deprecated/Input';
import { AvatarForProfileWithChangePhoto } from '@/shared/ui/redesigned/Avatar';
import {
  Checkbox,
  CopyButton,
  ExportCSV,
  ExportJSON,
} from '@/shared/ui/redesigned/Button';
import { showSnackbar } from '@/shared/ui/redesigned/Snackbars/Snackbars';
import { Page } from '@/widgets/Page';
import { BugButton } from '@/widgets/PageError';

const MainPage: FC = () => {
  const { t } = useTranslation();
  const article = useAppSelector(getArticleDetailsData);

  const [value, setValue] = useState('');
  const [checkboxLocal, setCheckboxLocal] = useState(false);

  const onChange = (val: string) => setValue(val);

  const [openModalBox, setOpenModalBox] = useState(false);

  const [changePhotoAvatar, setChangePhotoAvatar] = useState(true);

  const change = () => {
    console.log('test');
    showSnackbar('tetttttttttttttttttst', 'error', 'ru');
  };

  return (
    <Page data-testid='MainPage'>
      {/* компонент для тестирования создания ошибки */}
      <BugButton />
      <Input value={value} placeholder='Введите текст' onChange={onChange} />
      <p>{t('Главная страница')}</p>
      <Counter />
      <button type='button' onClick={change}>
        {'open toast message'}
      </button>
      <p>{'modal for zoom images '}</p>
      <HightRes
        cardName='test'
        backImage={Review2Desktop}
        frontImage={Review1Desktop}
      />
      <button type='button' onClick={() => setOpenModalBox(prev => !prev)}>
        {'open modal box'}
      </button>
      {!!openModalBox && (
        <CreateBoxModal
          open={openModalBox}
          setOpen={setOpenModalBox}
          modalType='create'
        />
      )}
      <AvatarForProfileWithChangePhoto
        isChanges={changePhotoAvatar}
        photo={
          'https://yastatic.net/naydex/yandex-search/suUP86v80/4cdb208iK/tMcr2RymAeMaslqO-1Eynd30vXpEsz2PH3Hbl0Ai-4ImVzt3uVRLneJPL7SX7plVdcEyhbGZll6nwzTW0f7huqiXJugttx2Oa_tK46txPonVgch2AMJVnmsY0ud9O5-2HwMrh1XBqxxO_q8FagNoeDC0fpix-JtOTzg'
        }
      />
      <Checkbox
        id='test'
        checked={checkboxLocal}
        onChange={() => setCheckboxLocal(prev => !prev)}
      >
        {'checkbox'}
      </Checkbox>
      <CopyButton value='copy text' />
      <ExportCSV />
      <ExportJSON />
    </Page>
  );
};

export default MainPage;
