import * as S from "./OptionChip.styles";

function OptionChip({
  label,
  layout,
  selected = false,
  onClick,
  fullWidth = false,
}) {
  return (
    <S.Chip
      type="button"
      layout={layout}
      $selected={selected}
      $fullWidth={fullWidth}
      onClick={onClick}
      aria-pressed={selected}
    >
      {label}
    </S.Chip>
  );
}

export default OptionChip;
