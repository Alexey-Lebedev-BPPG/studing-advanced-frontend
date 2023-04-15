import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from "./RatingCard.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useDetectDevice } from "@/shared/lib/hooks/useDetectDevice/useDetectDevice";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Drawer } from "@/shared/ui/Drawer";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { HStack, VStack } from "@/shared/ui/Stack";
import { StarRating } from "@/shared/ui/StarRating";
import { Text } from "@/shared/ui/Text";

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
  // количество звезд, которое юзер оставил ранее
  rate?: number;
}

export const RatingCard: FC<IRatingCardProps> = memo(
  ({
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    rate = 0,
  }) => {
    const { t } = useTranslation();
    const isMobile = useDetectDevice();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
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
          data-testId="RatingCard.Input"
          value={feedback}
          onChange={setFeedback}
          placeholder={t("Ваш отзыв")}
        />
      </>
    );
    return (
      <Card
        fullWidth
        className={classNames(cls.rating, {}, [className])}
        data-testid="RatingCard"
      >
        <VStack gap="8" align="center" max>
          <Text title={starsCount ? t("Спасибо за оценку!") : title} />
          <StarRating
            selectedStars={starsCount}
            size={40}
            onSelect={onSelectStars}
          />
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
                    data-testid="RatingCard.Close"
                  >
                    {t("Закрыть")}
                  </Button>
                  <Button onClick={acceptHandle} data-testid="RatingCard.Send">
                    {t("Отправить")}
                  </Button>
                </HStack>
              </VStack>
            </Modal>
          )}
        </VStack>
      </Card>
    );
  }
);
