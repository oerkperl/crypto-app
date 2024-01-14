import styled from "styled-components";
const Container = styled.div<{ width?: string | null }>`
  width: ${(props) => props.width}px;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
`;

const Bar = styled.div<{ progress: string | null }>`
  width: ${(props) => props.progress || "0%"}%;
  height: 5px;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
`;

export const ProgressBar: React.FC<{ progress: string; width?: string }> = ({
  progress,
  width,
}) => {
  return (
    <Container width={width}>
      <Bar progress={progress} />
    </Container>
  );
};
