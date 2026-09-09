import { useEffect, useMemo, useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { useLocation } from "react-router-dom";
import BackHeader from "../components/common/BackHeader";
import SmokingLogModal from "../components/common/SmokingLogModal";
import RecordDetailSheet from "../components/pattern/RecordDetailSheet";
import Toast from "../components/Toast/Toast";
import RecordList from "../components/pattern/RecordList";
import { mapRecordListItem } from "../components/pattern/mapRecordItem";
import ApiStatusView from "../components/common/ApiStatusView";
import useAsync from "../hooks/useAsync";
import { getRecords } from "../api/record";
import * as S from "./PatternRecordPage.styles";
import Plus from "../assets/plus.svg";

function PatternRecordPage() {
  const location = useLocation();
  const selectedIdFromState = location.state?.selectedId;
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useAsync(() => getRecords(30));
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

      <ApiStatusView
        isLoading={isLoading && !data}
        error={!data ? error : null}
        onRetry={refetch}
        loadingTitle="기록을 불러오는 중이에요"
      >
        {data ? (
          <S.ScrollContent>
            {records.length > 0 ? (
              <RecordList
                recordList={records}
                onClick={handleItemClick}
                ItemComponent={S.RecordPageItem}
              />
            ) : (
              <S.EmptyText>아직 기록이 없어요</S.EmptyText>
            )}
          </S.ScrollContent>
        ) : null}
      </ApiStatusView>

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

      <S.RecordDetailSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        recordId={selectedRecordId}
      />

      {toast && <Toast message={toast.message} />}
    </S.PageContainer>
  );
}

export default PatternRecordPage;
