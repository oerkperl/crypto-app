import styled from "styled-components";
import { useState } from "react";
import { Section, Row } from "../../globalStyled/styled";
import { MarketData } from "./MarketData";
import { Logo, SwitchButton, NavBtn, NavFrom, Input } from "./styled";

export const Navabr = () => {
  const [selected, setIsSelected] = useState("coins");
  return (
    <>
      <Section $margin="1rem 0 0 0">
        <Row className=" lg:flex lg:flex-row lg: flex flex-col max-w-925px">
          <div className="flex">
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
