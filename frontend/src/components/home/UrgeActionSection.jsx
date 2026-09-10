import { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import SmokingLogModal from "../common/SmokingLogModal";
import * as S from "./UrgeActionSection.styles";

function UrgeActionSection({ onStartNextTime, onSmokingRecorded }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.Section>
      <S.TextBlock>
        <S.Title>담배가 생각나나요?</S.Title>
        <S.Subtitle>지금 상황에 맞는 행동을 찾아드릴게요.</S.Subtitle>
      </S.TextBlock>

      <PrimaryButton onClick={onStartNextTime}>
        NEXT TIME 시작하기
      </PrimaryButton>

      <S.QuickRecordRow>
        <S.QuickRecordLabel>방금 담배 피웠어요</S.QuickRecordLabel>
        <S.QuickRecordLink type="button" onClick={() => setIsModalOpen(true)}>
          빠르게 기록하기 →
        </S.QuickRecordLink>
      </S.QuickRecordRow>

      <SmokingLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onSmokingRecorded}
      />
    </S.Section>
  );
}

export default UrgeActionSection;
