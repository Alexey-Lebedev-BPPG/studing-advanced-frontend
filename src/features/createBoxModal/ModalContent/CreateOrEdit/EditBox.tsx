import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { ModalContent } from '../ModalContent';
import { getInitialBox } from '../helpers';
import { IBox } from '../types';

export const EditBox: FC<{ setOpen: Dispatch<SetStateAction<boolean>> }> = ({
  setOpen,
}) => {
  const selectedBox: IBox = useMemo(
    () => ({
      address: 'addressEdit',
      category: 'categoryEdit',
      createdAt: 'createdAtEdit',
      description: 'descriptionEdit',
      frontImage: 'frontImageEdit',
      frontImageM: 'frontImageMEdit',
      frontImageS: 'frontImageSEdit',
      id: 'idEdit',
      insuredValue: 'insuredValueEdit',
      location: [
        'PWCC Vault: Collector Crypt #732795',
        '7560 SW Durham Rd',
        'Tigard, OR 97224',
      ],
      name: 'nameEdit',
      qty: 0,
      status: 'Ready',
      type: 'typeEdit',
      updatedAt: 'updatedAtEdit',
      vault: 'vaultEdit',
      vaultId: 'vaultIdEdit',
      year: 0,
    }),
    [],
  );
  const initialFrontImage = useMemo(
    () => (selectedBox?.frontImage ? selectedBox.frontImage : ''),
    [selectedBox],
  );
  const initialBackImage = useMemo(
    // @ts-ignore
    () => (selectedBox?.backImage ? selectedBox.backImage : ''),
    [selectedBox],
  );
  const initialOrientation = useMemo(
    // @ts-ignore
    () => (selectedBox?.orientation ? selectedBox.orientation : 'vertical'),
    [selectedBox],
  );

  const [box, setBox] = useState(selectedBox || getInitialBox());
  const [files, setFile] = useState([initialFrontImage, initialBackImage]);
  const [previewUrl, setPreviewUrl] = useState([
    initialFrontImage,
    initialBackImage,
  ]);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    initialOrientation,
  );

  const [isButtonActive, setIsButtonActive] = useState(false);

  const createProps = {
    files,
    isButtonActive,
    orientation,
    previewUrl,
    setFile,
    setIsButtonActive,
    setOpen,
    setOrientation,
    setPreviewUrl,
  };

  return (
    <ModalContent
      typeModal='edit'
      box={box}
      createProps={createProps}
      setBox={setBox}
    />
  );
};
