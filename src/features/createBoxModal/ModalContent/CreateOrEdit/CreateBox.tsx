import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ModalContent } from '../ModalContent';
import { getInitialBox } from '../helpers';

export const CreateBox: FC<{ setOpen: Dispatch<SetStateAction<boolean>> }> = ({
  setOpen,
}) => {
  const initialBox = getInitialBox();

  const [box, setBox] = useState(initialBox);
  const [files, setFile] = useState(['', '']);
  const [previewUrl, setPreviewUrl] = useState(['', '']);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'vertical',
  );
  const [isButtonActive, setIsButtonActive] = useState(false);

  const removeForm = () => {
    setBox(initialBox);
    setFile(['', '']);
    setPreviewUrl(['', '']);
  };

  const createProps = {
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
  };

  return (
    <ModalContent
      typeModal='create'
      box={box}
      createProps={createProps}
      setBox={setBox}
    />
  );
};
