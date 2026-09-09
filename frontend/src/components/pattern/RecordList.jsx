import * as S from "./RecordList.styles";

function StatusText({ status }) {
  if (!status?.length) return null;

  if (status.length === 2) {
    return (
      <>
        <S.CravingText $label={status[0]}>{status[0]}</S.CravingText>
        {" → "}
        <S.CravingText $label={status[1]}>{status[1]}</S.CravingText>
      </>
    );
  }

  return <S.CravingText $label={status[0]}>{status[0]}</S.CravingText>;
}

function RecordList({ recordList, onClick, ItemComponent = S.RecordItem }) {
  return (
    <S.ListWrapper>
      {recordList.map((record) => {
        const metaParts = [record.time, record.moment].filter(Boolean);

        return (
          <ItemComponent
            key={record.id}
            type="button"
            onClick={() => onClick?.(record)}
          >
            <S.RecordTitle>{record.title}</S.RecordTitle>
            <S.RecordMeta>
              {metaParts.map((part, index) => (
                <span key={index}>
                  {index > 0 ? " | " : null}
                  {part}
                </span>
              ))}
              {record.status?.length ? (
                <>
                  {metaParts.length > 0 ? " | " : null}
                  <StatusText status={record.status} />
                </>
              ) : null}
            </S.RecordMeta>
          </ItemComponent>
        );
      })}
    </S.ListWrapper>
  );
}

export default RecordList;
