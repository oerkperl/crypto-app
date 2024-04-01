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
  fg?: string;
  customBg?: string;
}> = ({ progress, width, downTrend, fg, customBg }) => {
  const { theme } = useTheme();
  const color = downTrend ? "#E323FF" : "#00B1A7";
  const bg = downTrend ? "#F39DFF" : theme === "dark" ? "#777" : "#8AF0EB";

  return (
    <Container $width={width} $bg={customBg || bg}>
      <Bar $progress={progress} $foregroundColor={fg || color} />
    </Container>
  );
};
