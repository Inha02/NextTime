import * as S from "./Header.styles";
import backArrow from "../../assets/back-arrow.svg";

function Header({ title, subtitle, onBack, back = true }) {
  return (
    <S.Wrapper>
      <S.NavRow>
        {back && (
          <S.BackButton type="button" onClick={onBack} aria-label="뒤로가기">
            <S.ArrowIcon src={backArrow} alt="뒤로가기 아이콘" />
          </S.BackButton>
        )}
        <S.TitleBlock>
          {title && <S.Title>{title}</S.Title>}
          {subtitle && <S.Title>{subtitle}</S.Title>}
        </S.TitleBlock>
      </S.NavRow>
    </S.Wrapper>
  );
}

export default Header;
