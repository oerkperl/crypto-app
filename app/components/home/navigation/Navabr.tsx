import styled from "styled-components";
import { useState } from "react";
import { Section, Row } from "../../globalStyled/styled";
import { MarketData } from "./MarketData";

const Logo = styled.h3`
  color: #fff;
  font-size: 22px;
  margin-right: 0.5rem;
`;

const Input = styled.input`
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
  //align-items: space-between;
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
const CurrencyIcon = styled.span`
  width: 20px;
  height: 20px;
  background-color: #fff;
  fonst-size: 6px;
  margin-right: 0.5rem;
  border-radius: 50%;
  color: black;
  padding: 0.2rem;
`;

const SwitchButton = styled.button`
  width: 150px;
  height: 30px;
  border-radius: 5px;
  &:hover {
    color: orange;
  }
`;
export const Navabr = () => {
  const [selected, setIsSelected] = useState("coins");
  return (
    <>
      <Section $margin="1rem 0 0 0">
        <Row>
          <Logo>Logoipsm</Logo>
          <div className="border border-solid border-gray-700 inline-flex p-0.5 rounded-md">
            <SwitchButton
              onClick={() => {
                setIsSelected("coins");
              }}
              className={`${
                selected === "coins" ? "bg-indigo-500 text-white" : ""
              }`}
            >
              Coins
            </SwitchButton>
            <SwitchButton
              onClick={() => {
                setIsSelected("portfolio");
              }}
              className={`${
                selected === "portfolio" ? "bg-indigo-500 text-white" : ""
              }`}
            >
              Portfolio
            </SwitchButton>
          </div>
          <NavFrom>
            <NavBtn>
              <Input placeholder="Search..." />
            </NavBtn>
            <NavBtn>
              <button>USD</button>
            </NavBtn>
            <NavBtn>
              <button>Theme</button>
            </NavBtn>
            <NavBtn>Picture</NavBtn>
          </NavFrom>
        </Row>
      </Section>
      <Section $margin="1rem 0 0 0 ">
        <MarketData />
      </Section>
    </>
  );
};
