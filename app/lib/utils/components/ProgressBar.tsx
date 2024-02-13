import styled from "styled-components";
import { useTheme } from "next-themes";

const Container = styled.div.attrs<{
  $width?: string;
  $bg: string;
}>((props) => ({
  style: {
    width: props.$width,
    background: props.$bg,
  },
}))`
  border-radius: 4px;
  overflow: hidden;
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
    : "#00B1A7";
  const bg = downTrend ? "#F39DFF" : theme === "dark" ? "#777" : "#8AF0EB";

  return (
    <Container $width={width} $bg={bg}>
      <Bar $progress={progress} $foregroundColor={color} />
    </Container>
  );
};
