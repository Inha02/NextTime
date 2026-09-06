import * as S from "./OptionGrid.styles";
import OptionCard from "./OptionCard";
import OptionChip from "./OptionChip";

function OptionGrid({
  options = [],
  variant = "chip",
  layout = "list",
  selectedValue,
  onChange,
  gap = "0.75rem",
}) {
  const handleSelect = (value) => {
    onChange?.(value);
  };

  if (variant === "card") {
    return (
      <S.CardGrid>
        {options.map((option) => (
          <S.CardCell key={option.value}>
            <OptionCard
              label={option.label}
              mood={option.mood}
              selected={selectedValue === option.value}
              onClick={() => handleSelect(option.value)}
            />
          </S.CardCell>
        ))}
      </S.CardGrid>
    );
  }

  if (layout === "grid-3") {
    return (
      <S.ChipGrid3 $gap={gap}>
        {options.map((option) => (
          <OptionChip
            key={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </S.ChipGrid3>
    );
  }

  if (layout === "grid-2") {
    return (
      <S.ChipGrid2>
        {options.map((option) => (
          <OptionChip
            key={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onClick={() => handleSelect(option.value)}
            fullWidth
          />
        ))}
      </S.ChipGrid2>
    );
  }

  return (
    <S.ChipList>
      {options.map((option) => (
        <OptionChip
          key={option.value}
          label={option.label}
          layout={layout}
          selected={selectedValue === option.value}
          onClick={() => handleSelect(option.value)}
          fullWidth
        />
      ))}
    </S.ChipList>
  );
}

export default OptionGrid;
