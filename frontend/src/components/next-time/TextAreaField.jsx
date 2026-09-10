import * as S from "./TextAreaField.styles";

function TextAreaField({ value, onChange, placeholder, rows = 4, ...rest }) {
  return (
    <S.TextArea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      {...rest}
    />
  );
}

export default TextAreaField;
