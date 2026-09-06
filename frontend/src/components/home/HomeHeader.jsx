import * as S from "./HomeHeader.styles";
import mascot from "../../assets/mascot.svg";
import mascotHealth from "../../assets/mascot-run.svg";
import mascotEconomy from "../../assets/mascot-economy.svg";
import mascotGrowth from "../../assets/mascot-growth.svg";
import mascotRelationship from "../../assets/mascot-relationship.svg";
import mascotSelfEfficacy from "../../assets/mascot-self-efficacy.svg";
import { useMemo } from "react";

function HomeHeader({ nextMe }) {
  const mascotImage = useMemo(() => {
    switch (nextMe?.nextBudTheme) {
      case "NEXTBUD_HEALTH_01":
        return mascotHealth;
      case "NEXTBUD_RELATIONSHIP_01":
        return mascotRelationship;
      case "NEXTBUD_ECONOMY_01":
        return mascotEconomy;
      case "NEXTBUD_SELF_EFFICACY_01":
        return mascotSelfEfficacy;
      case "NEXTBUD_GROWTH_01":
        return mascotGrowth;
      case "NEXTBUD_DEFAULT_01":
      default:
        return mascot;
    }
  }, [nextMe?.nextBudTheme]);

  return (
    <>
      <S.TabName>홈</S.TabName>
      <S.Container>
        <S.TextBlock>
          <S.Block>
            <S.Label>NEXT ME</S.Label>
            <S.Title>{nextMe?.headline}</S.Title>
          </S.Block>
          <S.Block>
            <S.QuoteLabel>내가 남긴 말</S.QuoteLabel>
            <S.Quote>{nextMe?.messageToFutureSelf}</S.Quote>
          </S.Block>
        </S.TextBlock>
        <S.Mascot src={mascotImage} alt="Next Bud Mascot" />
      </S.Container>
    </>
  );
}

export default HomeHeader;
