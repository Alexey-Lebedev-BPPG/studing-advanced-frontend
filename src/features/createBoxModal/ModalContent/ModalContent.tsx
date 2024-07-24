import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { isBoxValid } from './ModalContentItems/helpers';
import { newBoxInFormData } from './helpers';
import { IBox, ICreateBoxProps, IFormDataCreateBox } from './types';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// import { FileUploader } from 'react-drag-drop-files';

interface IModalContentProps {
  box: IBox;
  createProps: ICreateBoxProps;
  setBox: Dispatch<SetStateAction<IBox>>;
  typeModal: 'create' | 'edit';
}

export const ModalContent: FC<IModalContentProps> = ({
  box,
  createProps,
  setBox,
  typeModal,
}) => {
  const dispatch = useAppDispatch();

  const isNew = typeModal === 'create';
  let delay: NodeJS.Timeout;
  const {
    files,
    isButtonActive,
    orientation,
    previewUrl,
    removeForm,
    setFile,
    setIsButtonActive,
    setOpen,
    setOrientation,
    setPreviewUrl,
  } = createProps;

  const role = 'admin';
  const roleAdmin = role === 'admin';

  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [valueInput, setValueInput] = useState<string[]>(['', '']);

  const changeState = (param: string, value: string | boolean | string[]) => {
    if (param === 'ownerEmail') setOwnerEmail(`${value}`);
    if (param === 'ownerId') setOwnerId(`${value}`);
    setBox((prev: IBox) => ({ ...prev, [param]: value }));
  };

  const handleFile = (file: any, index: number) => {
    if (file.length > 0) {
      setFile(prev => {
        const array = [...prev];
        // eslint-disable-next-line prefer-destructuring
        array[index] = file[0];
        return array;
      });
      setPreviewUrl(() => {
        const array = [...previewUrl];
        array[index] = window.URL.createObjectURL(
          new Blob(file, { type: file.type }),
        );
        return array;
      });
    }
  };

  const onCreateCard = (typeOfEvent: string, typeSave: 'create' | 'edit') => {
    const data = new FormData();
    const newCard: IFormDataCreateBox = newBoxInFormData(box, ownerId);
    const testArray = Object.keys(newCard) as (keyof typeof newCard)[];

    testArray?.forEach(
      key => newCard[key] && data.append(key, newCard[key] as string),
    );
    data.append('orientation', orientation);
    data.append('type', 'Sealed Box');
    data.append('location', box.location ? box.location?.join(' | ') : '');

    data.append('frontImage', files[0] === '' ? previewUrl[0] : files[0]);
    previewUrl[1] !== '' &&
      data.append('backImage', files[1] === '' ? previewUrl[1] : files[1]);

    setOpen(false);

    if (typeSave === 'create') {
      // создание бокса
      // dispatch(createBoxAction({ data }));
      if (typeOfEvent === 'multiSave') {
        removeForm && removeForm();
        delay = setTimeout(() => setOpen(true), 1000);
      }
    } else {
      // редактирование бокса
      // dispatch(editBoxAction({ data, id: box.id }))
    }
  };

  const selectFile = ['Front Side', 'Back Side'];

  const calculateSizes = (
    currentWidth: number,
    currentHeight: number,
    index: number,
    setOrientationLocal: Dispatch<SetStateAction<'horizontal' | 'vertical'>>,
  ) => {
    if (setOrientationLocal && index === 0)
      currentWidth > currentHeight
        ? setOrientationLocal('horizontal')
        : setOrientationLocal('vertical');
  };

  const changeValueInput = (value: string, index: number) => {
    setValueInput(prev => {
      const array = [...prev];
      array[index] = value;
      return array;
    });
  };

  const addValueInputInPreview = (value: string[], index: number) => {
    setPreviewUrl &&
      setPreviewUrl(prev => {
        const array = [...prev];
        array[index] = value[index];
        return array;
      });
    setFile &&
      setFile(prev => {
        const array = [...prev];
        array[index] = value[index];
        return array;
      });
  };

  useEffect(() => {
    isBoxValid(box, setIsButtonActive, files, ownerEmail);

    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box, files, ownerEmail, setIsButtonActive]);

  return (
    <div>
      {selectFile.map((item, index) => (
        <div key={item}>
          <img
            src={!!previewUrl && previewUrl[index]}
            alt=''
            onLoad={event =>
              calculateSizes(
                event.currentTarget.naturalWidth,
                event.currentTarget.naturalHeight,
                index,
                setOrientation,
              )
            }
          />
          <div>{item}</div>
          {/* <FileUploader
            multiple
            name='file'
            disabled={!roleAdmin}
            types={fileTypes as string[]}
            hoverTitle='Drop here'
            label='Drag and drop file here'
            handleChange={(file: any) => handleFile && handleFile(file, index)}
          /> */}
          <input
            id='input-files'
            value={valueInput[index]}
            disabled={!roleAdmin}
            autoComplete='off'
            onChange={event => changeValueInput(event.target.value, index)}
          />
          <button
            type='button'
            disabled={valueInput[index] === '' || !roleAdmin}
            onClick={() => {
              addValueInputInPreview(valueInput, index);
            }}
          >
            {'ADD'}
          </button>
        </div>
      ))}
      {!!roleAdmin && (
        <button
          type='button'
          // onClick={() => onCreateCard('onlySave', isNew ? 'create' : 'edit')}
          onClick={() => onCreateCard('multiSave', 'create')}
        >
          {'save'}
        </button>
      )}
    </div>
  );
};
