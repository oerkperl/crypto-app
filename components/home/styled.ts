import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  padding: 0.5rem 0;
`;

export const Item = styled.div`
  gap: 0.25rem;
  font-size: 12px;
  width: 200px;
  max-hiegth: 200px;
`;
export const CoinItem = styled(Item)<{ $width?: string }>`
  width: ${(props) => (props.$width ? props.$width : "100px")};
`;
