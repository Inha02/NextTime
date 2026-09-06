import { NavLink } from "react-router-dom";
import * as S from "./MenuItem.styles";

function MenuItem({ to, Icon, text, end }) {
  return (
    <S.MenuLink to={to} end={end}>
      <S.MenuButton>
        <S.MenuIcon>
          <Icon />
        </S.MenuIcon>
        <S.MenuText>{text}</S.MenuText>
      </S.MenuButton>
    </S.MenuLink>
  );
}

export default MenuItem;
