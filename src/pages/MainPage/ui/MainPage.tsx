import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './mainPage.module.css';
import { getArticleDetailsData } from '@/entities/Article';
import { Counter } from '@/entities/Counter';
import { HightRes } from '@/features/ModalWithZoom';
import { CreateBoxModal } from '@/features/createBoxModal';
import Review1Desktop from '@/shared/assets/images/Desktop/Reviews/EnVersion/Review1_Desktop.avif';
import Review2Desktop from '@/shared/assets/images/Desktop/Reviews/EnVersion/Review2_Desktop.avif';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { GamesCard } from '@/shared/ui/GamesCard/GamesCard';
import { AccordionSlider } from '@/shared/ui/redesigned/AccordionSlider/AccordionSlider';
import { AnalogClock } from '@/shared/ui/redesigned/AnalogClock/AnalogClock';
import { AnimatedMoon } from '@/shared/ui/redesigned/AnimatedMoon/AnimatedMoon';
import { AvatarForProfileWithChangePhoto } from '@/shared/ui/redesigned/Avatar';
import {
  Checkbox,
  CopyButton,
  ExportCSV,
  ExportJSON,
} from '@/shared/ui/redesigned/Button';
import { CSSTypingTextEffect } from '@/shared/ui/redesigned/CSSTypingTextEffect/CSSTypingTextEffect';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { showSnackbar } from '@/shared/ui/redesigned/Snackbars/Snackbars';
import { StatusNetwork } from '@/shared/ui/redesigned/StatusNetwork/StatusNetwork';
import { Page } from '@/widgets/Page';
import { BugButton } from '@/widgets/PageError';

const MainPage: FC = () => {
  const { t } = useTranslation();
  const article = useAppSelector(getArticleDetailsData);

  const [value, setValue] = useState('');
  const [checkboxLocal, setCheckboxLocal] = useState(false);

  const onChange = (val: string) => setValue(val);

  const [openModalBox, setOpenModalBox] = useState(false);
  const [openModalSlider, setOpenModalSlider] = useState(false);

  const closeModalSlider = () => setOpenModalSlider(false);

  const [changePhotoAvatar, setChangePhotoAvatar] = useState(true);

  const change = () => {
    console.log('test');
    showSnackbar('tetttttttttttttttttst', 'error', 'ru');
  };

  const showNotificationInBrowser = async () => {
    // eslint-disable-next-line no-new
    if (Notification.permission === 'granted') new Notification('hello world!');
    else {
      const permission = await Notification.requestPermission();
      // eslint-disable-next-line no-new
      if (permission === 'granted') new Notification('hello world!');
    }
  };

  return (
    <Page data-testid='MainPage' className={cls['main-page']}>
      {/* компонент для тестирования создания ошибки */}
      <BugButton />
      <AnimatedMoon />
      <StatusNetwork />
      <AnalogClock />
      <AccordionSlider />
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
      <button type='button' onClick={() => setOpenModalSlider(true)}>
        {'open modal slider'}
      </button>
      <button type='button' onClick={showNotificationInBrowser}>
        {'show notification in browser'}
      </button>
      <CSSTypingTextEffect />
      {!!openModalSlider && (
        <Modal isOpen={openModalSlider} onClose={closeModalSlider}>
          <div className={cls.slider}>
            <div className={cls.slide}>{'Slide1'}</div>
            <div className={cls.slide}>{'Slide2'}</div>
            <div className={cls.slide}>{'Slide3'}</div>
            <div className={cls.slide}>{'Slide4'}</div>
            <div className={cls.slide}>{'Slide5'}</div>
          </div>
        </Modal>
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
      <Input
        isAnimatedPlaceholder
        label={'анимированный label'}
        placeholder='placeholder'
      />
      <GamesCard />
    </Page>
  );
};

export default MainPage;
