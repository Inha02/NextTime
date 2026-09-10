import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BackHeader from "../components/common/BackHeader";
import SmokingLogModal from "../components/common/SmokingLogModal";
import RecordDetailSheet from "../components/pattern/RecordDetailSheet";
import RecordList from "../components/pattern/RecordList";
import { mapRecordListItem } from "../components/pattern/mapRecordItem";
import useAsync from "../hooks/useAsync";
import { getRecords } from "../api/record";
import * as S from "./PatternRecordPage.styles";
import Plus from "../assets/plus.svg";

function PatternRecordPage() {
  const location = useLocation();
  const selectedIdFromState = location.state?.selectedId;

  const { data, refetch } = useAsync(() => getRecords(30));
  const records = useMemo(
    () => (data?.records ?? []).map(mapRecordListItem),
    [data],
  );

  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!selectedIdFromState) return;

    setSelectedRecordId(selectedIdFromState);
    setIsSheetOpen(true);
  }, [selectedIdFromState]);

  const handleItemClick = (record) => {
    setSelectedRecordId(record.id);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handleSmokingRecorded = () => {
    refetch();
  };

  return (
    <S.PageContainer>
      <S.HeaderWrap>
        <BackHeader title="기록" />
      </S.HeaderWrap>

      <S.ScrollContent>
        {records.length > 0 ? (
          <RecordList
            recordList={records}
            onClick={handleItemClick}
            ItemComponent={S.RecordPageItem}
          />
        ) : (
          data ? <S.EmptyText>아직 기록이 없어요</S.EmptyText> : null
        )}
      </S.ScrollContent>

      <S.AddButton
        type="button"
        aria-label="기록 추가"
        onClick={() => setIsModalOpen(true)}
      >
        <S.AddImg src={Plus} />
      </S.AddButton>

      <SmokingLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSmokingRecorded}
        shouldRefreshHome={false}
      />

      <RecordDetailSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        recordId={selectedRecordId}
      />
    </S.PageContainer>
  );
}

export default PatternRecordPage;
