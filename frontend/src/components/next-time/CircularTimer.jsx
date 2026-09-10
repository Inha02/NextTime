import * as S from "./CircularTimer.styles";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function CircularTimer({
  totalSeconds = 0,
  remainingSeconds = 0,
  showRemainingLabel = false,
}) {
  const size = 200;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeTotal = Math.max(totalSeconds, 1);
  const progress = Math.min(1, Math.max(0, remainingSeconds / safeTotal));
  const dashOffset = circumference * (1 - progress);

  return (
    <S.Wrapper>
      <S.Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <S.CircleTrack
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <S.CircleProgress
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </S.Svg>
      <S.CenterContent>
        <S.TimeText>{formatTime(remainingSeconds)}</S.TimeText>
        {showRemainingLabel && <S.RemainingLabel>남은 시간</S.RemainingLabel>}
      </S.CenterContent>
    </S.Wrapper>
  );
}

export default CircularTimer;
