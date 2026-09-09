import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 12.5rem;
  height: 12.5rem;
`;

export const Svg = styled.svg`
  display: block;
  transform: rotate(-90deg);
`;

export const CircleTrack = styled.circle`
  fill: none;
  stroke: #1d1d20;
`;

export const CircleProgress = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
`;

export const CenterContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TimeText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 2.34375rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.078rem;
`;

export const RemainingLabel = styled.p`
  color: ${({ theme }) => theme.colors.light_gray};
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.4;
`;
