import { useEffect } from "react";
import * as S from "./RecordDetailSheet.styles";
import BottomSheet from "../common/BottomSheet";
import useAsync from "../../hooks/useAsync";
import { getRecord } from "../../api/record";
import { mapRecordDetail } from "./mapRecordItem";

function RecordDetailSheet({ isOpen, onClose, recordId }) {
  const { data, execute, reset } = useAsync(getRecord, {
    immediate: false,
  });

  useEffect(() => {
    if (!isOpen || !recordId) {
      reset();
      return;
    }

    execute(recordId);
  }, [isOpen, recordId, execute, reset]);

  const detail = data ? mapRecordDetail(data) : null;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
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
    </BottomSheet>
  );
}

export default RecordDetailSheet;
