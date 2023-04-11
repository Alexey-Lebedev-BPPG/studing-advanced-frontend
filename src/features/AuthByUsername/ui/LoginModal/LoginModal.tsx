import React, { FC, Suspense } from "react";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import cls from "./LoginModal.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Loader } from "@/shared/ui/Loader";
import { Modal } from "@/shared/ui/Modal";

interface ILoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<ILoginModalProps> = ({
  className,
  isOpen,
  onClose,
}) => (
  <Modal
    className={classNames(cls.loginModal, {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
  >
    {/* Оборачиваем в Suspense, т.к. подгружаем асинхронно  */}
    <Suspense fallback={<Loader />}>
      <LoginFormAsync onSuccess={onClose} />
    </Suspense>
  </Modal>
);
