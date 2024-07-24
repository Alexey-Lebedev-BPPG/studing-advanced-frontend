import { Dispatch, FC, SetStateAction } from 'react';
import { CreateBox } from './ModalContent/CreateOrEdit/CreateBox';
import { EditBox } from './ModalContent/CreateOrEdit/EditBox';
import { Modal } from '@/shared/ui/redesigned/Modal';

interface ICreateBoxesModalProps {
  id?: string;
  modalType?: 'create' | 'edit';
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateBoxModal: FC<ICreateBoxesModalProps> = ({
  id,
  modalType,
  open,
  setOpen,
}) => {
  const handleModalClose = () => setOpen(false);

  return (
    <Modal isOpen={open} onClose={handleModalClose}>
      {modalType === 'edit' ? (
        <EditBox setOpen={setOpen} />
      ) : (
        <CreateBox setOpen={setOpen} />
      )}
    </Modal>
  );
};
