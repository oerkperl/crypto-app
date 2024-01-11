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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: #999;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size:14px;  
`;
