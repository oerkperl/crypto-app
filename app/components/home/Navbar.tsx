import { useState } from "react";
import { Section, Row } from "../globalStyled/styled";
import { MarketData } from "./MarketData";
import { Logo, NavBtn, NavFrom, Input } from "./styled";

export const Navabr = () => {
  const options = ["Coins", "Portfolio"];
  const [selectedOption, setSelectedOption] = useState("Coins");

  return (
    <>
      <Section $margin="1rem 0 0 0">
        <Row className="">
          <div className="flex">
            <Logo>Logoipsm</Logo>
            <div className="border border-solid border-gray-700 inline-flex p-0.5 rounded-lg">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`${
                    option === selectedOption
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500"
                  } py-1 px-6 rounded hover:text-white`}
                >
                  {option}
                </button>
              ))}
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
              <button>Themes</button>
            </NavBtn>
            <NavBtn>Picture</NavBtn>
          </NavFrom>
        </Row>
      </Section>
    </>
  );
};
