import { useEffect, useState } from "react";
import * as S from "./SmokingLogModal.styles";
import Modal from "./Modal";
import PrimaryButton from "../common/PrimaryButton";
import { SMOKING_TRIGGER_OPTIONS, createSmokingRecord } from "../../api/record";
import { getHome } from "../../api/home";
import { useToast } from "../../contexts/ToastContext";
import useAsync from "../../hooks/useAsync";
import { debugError } from "../../api/debugLog";

function SmokingLogModal({
  isOpen,
  onClose,
  onSuccess,
  shouldRefreshHome = true,
}) {
  const [selectedId, setSelectedId] = useState("");
  const { showToast } = useToast();
  const { isLoading, execute, reset } = useAsync(createSmokingRecord, {
    immediate: false,
  });

  useEffect(() => {
    if (isOpen) return;
    setSelectedId("");
    reset();
  }, [isOpen, reset]);

  const now = new Date();
  const timeText = now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleModalClose = () => {
    if (isLoading) return;
    onClose();
  };

  const handleModalSubmit = async () => {
    if (isLoading) return;
    const record = await execute(selectedId || undefined);
    if (!record) return;
    onClose();
    showToast("기록했어요. 다음 추천에 반영할게요.");
    onSuccess?.(record);
    if (!shouldRefreshHome) return;
    try {
      const homeData = await getHome({ skipErrorToast: true });
      onSuccess?.(record, homeData);
    } catch (err) {
      debugError("record", "홈 데이터 갱신 실패", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <S.FormStack>
        <S.Title>방금 피운 담배를 기록할까요?</S.Title>
        <S.TimeBlock>
          <S.TimeLabel>기록 시각</S.TimeLabel>
          <S.Time>{timeText} (자동)</S.Time>
        </S.TimeBlock>
        <S.QuestionBlock>
          <S.QuestionLabel>어떤 상황이었나요? (선택)</S.QuestionLabel>
          <S.OptionGrid>
            {SMOKING_TRIGGER_OPTIONS.map((option) => (
              <S.OptionButton
                key={option.id}
                type="button"
                $active={selectedId === option.id}
                disabled={isLoading}
                onClick={() =>
                  setSelectedId((prev) => (prev === option.id ? "" : option.id))
                }
              >
                {option.label}
              </S.OptionButton>
            ))}
          </S.OptionGrid>
        </S.QuestionBlock>
        <S.ButtonBlock>
          <PrimaryButton
            type="button"
            disabled={isLoading}
            onClick={handleModalSubmit}
          >
            기록하기
          </PrimaryButton>
          <S.SkipButton type="button" onClick={handleModalClose}>
            취소
          </S.SkipButton>
        </S.ButtonBlock>
      </S.FormStack>
    </Modal>
  );
}

export default SmokingLogModal;
