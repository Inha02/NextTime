import * as S from "./ProgressBar.styles";

function ProgressBar({ percentage = 0 }) {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <S.Track>
      <S.Fill $percentage={clamped} />
    </S.Track>
  );
}

export default ProgressBar;
