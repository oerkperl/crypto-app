import React from "react";
import styled, { keyframes } from "styled-components";

const moveGradient = keyframes`
  0% {
    background-position: 100% 0;
    opacity:10%;
  }
  50% {
    opacity:60%;
  }
  100% {
    opacity:10%;
    background-position: -100% 0;
  }
`;
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface LoadingGradientProps {
  width?: string;
  height?: string;
}

const LoadingGradient = styled.div<LoadingGradientProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "5px"};
  background: linear-gradient(45deg, #555, #888, #999, #777);
  background-size: 400% 400%;
  animation: ${moveGradient} 3s linear infinite;
  border-radius: 5px;
  padding: 0.25rem;
`;

export const BlinkingGradientLoader: React.FC<{
  width?: string;
  height?: string;
}> = ({ width, height }) => {
  return (
    <div className="flex items-center">
      <LoadingGradient height={height} width={width} />
    </div>
  );
};
