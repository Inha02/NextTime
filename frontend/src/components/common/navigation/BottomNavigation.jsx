import * as S from "./BottomNavigation.styles";
import MenuItem from "./MenuItem";
import HomeIcon from "./icons/HomeIcon";
import PatternIcon from "./icons/PatternIcon";
import SettingIcon from "./icons/SettingIcon";

const menus = [
  { to: "/main", text: "홈", Icon: HomeIcon, end: true },
  { to: "/main/pattern", text: "내 패턴", Icon: PatternIcon },
  { to: "/main/settings", text: "설정", Icon: SettingIcon },
];

function BottomNavigation() {
  return (
    <S.NavContainer>
      {menus.map(({ to, text, Icon, end }) => (
        <MenuItem key={to} to={to} text={text} Icon={Icon} end={end} />
      ))}
    </S.NavContainer>
  );
}

export default BottomNavigation;
