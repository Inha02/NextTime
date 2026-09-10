import mascotLoading from "../../assets/mascot-loading.webp";
import * as S from "./ApiStatusView.styles";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

function ApiStatusView({
  isLoading,
  error,
  onRetry,
  variant = "page",
  errorTitle = "불러오기에 실패했어요",
  errorDescription,
  children,
}) {
  const resolvedErrorDescription =
    errorDescription ?? getApiErrorMessage(error);

  if (isLoading) {
    return (
      <S.StatusScreen $variant={variant}>
        <S.StatusContent>
          <S.Spinner $variant={variant} role="status" aria-label="로딩 중" />
        </S.StatusContent>
      </S.StatusScreen>
    );
  }

  if (error) {
    return (
      <S.StatusScreen $variant={variant}>
        <S.StatusContent>
          <S.Mascot src={mascotLoading} alt="" $variant={variant} />
          <S.StatusTitle $variant={variant}>{errorTitle}</S.StatusTitle>
          <S.StatusDesc $variant={variant}>
            {resolvedErrorDescription}
          </S.StatusDesc>
          {onRetry && (
            <S.RetryButton type="button" onClick={onRetry}>
              다시 시도
            </S.RetryButton>
          )}
        </S.StatusContent>
      </S.StatusScreen>
    );
  }

  return children;
}

export default ApiStatusView;
