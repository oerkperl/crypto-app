import styled from "styled-components";
import { useTheme } from "next-themes";

const Container = styled.div.attrs<{
  $width?: string;
  $height?: string;
  $bg: string;
}>((props) => ({
  style: {
    width: props.$width,
    height: props.$height || "5px",
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
  height: 100%;
  transition: width 0.3s ease-in-out;
`;

export const ProgressBar: React.FC<{
  progress: string;
  width?: string;
  height?: string;
  downTrend?: boolean;
  fg?: string;
  customBg?: string;
  backgroundColor?: string;
  progressColor?: string;
}> = ({
  progress,
  width,
  height,
  downTrend,
  fg,
  customBg,
  backgroundColor,
  progressColor,
}) => {
  const { theme } = useTheme();
  const color = downTrend ? "#E323FF" : "#00B1A7";
  const bg = downTrend ? "#F39DFF" : theme === "dark" ? "#777" : "#8AF0EB";

  // Use new Tailwind classes if provided, otherwise fall back to styled-components
  if (backgroundColor && progressColor) {
    return (
      <div
        className={`${backgroundColor} rounded overflow-hidden`}
        style={{ width: width || "50px", height: height || "5px" }}
      >
        <div
          className={`${progressColor} h-full transition-all duration-300 ease-in-out rounded`}
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  return (
    <Container $width={width} $height={height} $bg={customBg || bg}>
      <Bar $progress={progress} $foregroundColor={fg || color} />
    </Container>
  );
};
