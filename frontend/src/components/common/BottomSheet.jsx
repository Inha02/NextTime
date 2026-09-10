import * as S from "./BottomSheet.styles";
function BottomSheet({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Content onClick={(e) => e.stopPropagation()}>
        <S.Handle />
        {children}
      </S.Content>
    </S.Overlay>
  );
}

export default BottomSheet;
