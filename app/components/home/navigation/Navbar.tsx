import { useState } from "react";
import { Section, Row } from "../../styled";
import { Logo, NavBtn, NavFrom, Input } from "../styled";
import { useCryptoContext } from "@/app/context/context";

export const Navabr = () => {
  const options = ["Coins", "Portfolio"];
  const [selectedOption, setSelectedOption] = useState("Coins");
  const { selectedCurrency, setSelectedCurrency, currencies } =
    useCryptoContext();

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCurrencyObject = currencies.find(
      (currency) => currency.name === event.target.value
    );
    if (selectedCurrencyObject) {
      setSelectedCurrency(selectedCurrencyObject);
    }
  };

  return (
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
                    : "text-gray-400"
                } py-1 px-8 rounded hover:text-white`}
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

          <select
            id="currency"
            value={selectedCurrency.name}
            onChange={handleCurrencyChange}
            className="bg-indigo-500 rounded  focus:outline-none focus:border-blue-500 h-9"
          >
            {currencies.map((currency) => (
              <option key={currency.name} value={currency.name}>
                {currency.name.toUpperCase()} - {currency.sym}
              </option>
            ))}
          </select>

          <NavBtn>
            <button>Themes</button>
          </NavBtn>
        </NavFrom>
      </Row>
    </Section>
  );
};
