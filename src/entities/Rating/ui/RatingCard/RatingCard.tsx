import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./RatingCard.module.scss";
import Card from "@/shared/ui/Card/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input/Input";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { useDetectDevice } from "@/shared/lib/hooks/useDetectDevice/useDetectDevice";
import { Drawer } from "@/shared/ui/Drawer/Drawer";

export interface IRatingCardProps {
  className?: string;
  title: string;
  // отзыв, который будем писать внутри модального окна
  feedbackTitle: string;
  // указывает, нужно ли будет писать отзыв
  hasFeedback?: boolean;
  // отправить/отменить отзыв
  onAccept?: (starCount: number, feedback?: string) => void;
  onCancel?: (starCount: number) => void;
}

export const RatingCard: FC<IRatingCardProps> = memo(
  ({ className, title, feedbackTitle, hasFeedback, onAccept, onCancel }) => {
    const { t } = useTranslation();
    const isMobile = useDetectDevice();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState("");

    const onSelectStars = useCallback(
      (selectedStarCount: number) => {
        setStarsCount(selectedStarCount);
        // eslint-disable-next-line no-unused-expressions
        hasFeedback ? setIsOpenModal(true) : onAccept?.(selectedStarCount);
      },
      [hasFeedback, onAccept]
    );

    const acceptHandle = useCallback(() => {
      setIsOpenModal(false);
      onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
      setIsOpenModal(false);
      onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
      <>
        <Text title={feedbackTitle} />
        <Input
          value={feedback}
          onChange={setFeedback}
          placeholder={t("Ваш отзыв")}
        />
      </>
    );
    return (
      <Card className={classNames(cls.rating, {}, [className])}>
        <VStack gap="8" align="center">
          <Text title={title} />
          <StarRating size={40} onSelect={onSelectStars} />
          {isMobile ? (
            <Drawer isOpen={isOpenModal} onClose={cancelHandle}>
              <VStack gap="32">
                {modalContent}
                <Button fullWidth onClick={acceptHandle} size={ButtonSize.L}>
                  {t("Отправить")}
                </Button>
              </VStack>
            </Drawer>
          ) : (
            <Modal isOpen={isOpenModal}>
              <VStack gap="32" max>
                {modalContent}
                <HStack gap="16" max justify="end">
                  <Button
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={cancelHandle}
                  >
                    {t("Закрыть")}
                  </Button>
                  <Button onClick={acceptHandle}>{t("Отправить")}</Button>
                </HStack>
              </VStack>
            </Modal>
          )}
        </VStack>
      </Card>
    );
  }
);
