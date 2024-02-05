import React from "react";
import styled, { keyframes } from "styled-components";

const moveGradient = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface LoadingGradientProps {
  width?: string;
  height?: string;
}

export const LoadingGradient = styled.div<LoadingGradientProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "5px"};
  background: linear-gradient(45deg, #555, #888, #999, #777);
  background-size: 400% 400%;
  animation: ${moveGradient} 2s linear infinite;
  border-radius: 5px;
  padding: 0.25rem;
`;

export const BlinkingGradientLoader: React.FC<{
  width?: string;
  height?: string;
}> = ({ width, height }) => {
  return (
    <LoadingContainer>
      <LoadingGradient height={height} width={width} />
    </LoadingContainer>
  );
};
