import styled from "styled-components";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Container = styled.div.attrs<{
  $width?: string;
}>((props) => ({
  style: {
    width: props.$width,
  },
}))`
  border-radius: 4px;
  overflow: hidden;
  background: #777;
`;

const Bar = styled.div.attrs<{ $progress: string; $foregroundColor: string }>(
  (props) => ({
    style: {
      width: props.$progress + "%" || "50%",
      backgroundColor: props.$foregroundColor,
    },
  })
)`
  height: 5px;
  transition: width 0.3s ease-in-out;
`;

export const ProgressBar: React.FC<{
 progress: string;
  width?: string;
  downTrend?: boolean;
}> = ({ progress, width, downTrend }) => {
  const { theme } = useTheme();
  const color = downTrend
    ? "#E323FF"
    : theme === "dark"
    ? "#5EFF5A"
    : "#01F1E3";

  return (
    <Container $width={width}>
      <Bar $progress={progress} $foregroundColor={fg} />
    </Container>
  );
};
