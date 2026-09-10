import * as S from "./Modal.styles";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Content onClick={(e) => e.stopPropagation()}>{children}</S.Content>
    </S.Overlay>
  );
}

export default Modal;
