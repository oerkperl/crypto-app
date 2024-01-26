import styled from "styled-components";

export const Logo = styled.h3`
  color: #fff;
  font-size: 22px;
  margin-right: 0.5rem;
`;

export const Input = styled.input`
  background: transparent;
  border: trasparent;
  border-radius: 5px;
  padding: 0 0.5rem;
  &:focus {
    outline: none;
  }
`;

export const NavFrom = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

export const NavBtn = styled.span`
  background: transparent;
  border: 1px solid #555;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  padding: 0 0.5rem;
`;
export const CurrencyIcon = styled.span`
  width: 20px;
  height: 20px;
  background-color: #fff;
  fonst-size: 6px;
  margin-right: 0.5rem;
  border-radius: 50%;
  color: black;
  padding: 0.2rem;
`;

export const Wrapper = styled.div`
  align-items: center;
  padding: 0.5rem 0;
  color: #999;
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
export const Dropdown = styled.select<{ $width?: string }>`
  padding: 0.5rem;
  border-radius: 500px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: none;
  width: ${(props) => props.$width};
`;
