import mascotLoading from "../../assets/mascot-loading.svg";
import * as S from "./ApiStatusView.styles";
import { getApiErrorMessage } from "../../api/getApiErrorMessage";

function ApiStatusView({
  isLoading,
  error,
  onRetry,
  variant = "page",
  loadingTitle = "불러오는 중이에요",
  loadingDescription = "잠시만 기다려주세요.",
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
          <S.Mascot src={mascotLoading} alt="" $variant={variant} />
          <S.StatusTitle $variant={variant}>{loadingTitle}</S.StatusTitle>
          <S.StatusDesc $variant={variant}>{loadingDescription}</S.StatusDesc>
        </S.StatusContent>
      </S.StatusScreen>
    );
  }

  if (error) {
    return (
      <S.StatusScreen $variant={variant}>
        <S.StatusContent>
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
