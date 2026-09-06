import { useEffect } from "react";
import * as S from "./RecordDetailSheet.styles";
import BottomSheet from "../common/BottomSheet";
import ApiStatusView from "../common/ApiStatusView";
import useAsync from "../../hooks/useAsync";
import { getRecord } from "../../api/record";
import { mapRecordDetail } from "./mapRecordItem";

function RecordDetailSheet({ isOpen, onClose, recordId }) {
  const { data, isLoading, error, execute, refetch, reset } = useAsync(
    getRecord,
    { immediate: false },
  );

  useEffect(() => {
    if (!isOpen || !recordId) {
      reset();
      return;
    }

    execute(recordId);
  }, [isOpen, recordId, execute, reset]);

  const detail = data ? mapRecordDetail(data) : null;

  return (
    <S.BottomSheet isOpen={isOpen} onClose={onClose}>
      <ApiStatusView
        variant="embed"
        isLoading={Boolean(recordId) && !error && (isLoading || !data)}
        error={!data ? error : null}
        onRetry={refetch}
        loadingTitle="기록을 불러오는 중이에요"
      >
        {detail ? (
          <>
            <S.DateTitle>{detail.time}</S.DateTitle>
            <S.DataFields>
              {detail.fields.map((field) => (
                <S.Field key={field.label}>
                  <S.FieldLabel>{field.label}</S.FieldLabel>
                  <S.FieldValue>{field.value}</S.FieldValue>
                </S.Field>
              ))}
            </S.DataFields>
          </>
        ) : null}
      </ApiStatusView>
    </S.BottomSheet>
  );
}

export default RecordDetailSheet;
