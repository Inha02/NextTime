import { useNavigate } from "react-router-dom";
import * as S from "./RecentRecordsSection.styles";
import RecordList from "../RecordList";
import { SectionTitle } from "./RecentChangeSection.styles";
import { Section } from "./HelpfulActionSection.styles";
import { mapRecordListItem } from "../mapRecordItem";

function RecentRecordsSection({ records = [] }) {
  const navigate = useNavigate();
  const recordList = records.map(mapRecordListItem);

  return (
    <Section>
      <S.SectionHeader>
        <SectionTitle>최근 기록</SectionTitle>
        <S.ViewAllButton
          type="button"
          onClick={() => navigate("/pattern/records")}
        >
          전체 보기
        </S.ViewAllButton>
      </S.SectionHeader>

      {recordList.length > 0 ? <RecordList recordList={recordList} /> : null}
    </Section>
  );
}

export default RecentRecordsSection;
