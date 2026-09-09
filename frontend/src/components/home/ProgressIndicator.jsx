import * as S from "./ProgressIndicator.styles";
import circleOvercome from "../../assets/circle-overcome.svg";
import circlePostpone from "../../assets/circle-postpone.svg";
import circleSmoke from "../../assets/circle-smoke.svg";

const DOT_STATUS = {
  overcome: circleOvercome,
  postpone: circlePostpone,
  smoke: circleSmoke,
};

function ProgressIndicator({ dots }) {
  return (
    <S.Row>
      {dots.map((status, index) => (
        <S.DotIcon
          key={`${status}-${index}`}
          src={DOT_STATUS[status]}
          alt={status}
        />
      ))}
    </S.Row>
  );
}

export default ProgressIndicator;
