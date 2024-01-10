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
  @media (max-width:1024px){
    margin:1rem 0 0 0;
  }
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

export const SwitchButton = styled.button`
  width: 150px;
  height: 30px;
  border-radius: 5px;
  &:hover {
    color: orange;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #888;
  border-bottom: 1px solid #888;
  padding: 0.5rem 0;
  color: #777;
  
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
`;
