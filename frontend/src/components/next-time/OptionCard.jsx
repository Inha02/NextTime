import * as S from "./OptionCard.styles";
import MascotCharacter from "./MascotCharacter";

function OptionCard({ label, mood = "neutral", selected = false, onClick }) {
  return (
    <S.Card
      type="button"
      $selected={selected}
      onClick={onClick}
      aria-pressed={selected}
    >
      <MascotCharacter mood={mood} size="sm" />
      <S.Label>{label}</S.Label>
    </S.Card>
  );
}

export default OptionCard;
