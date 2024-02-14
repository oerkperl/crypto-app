import React from "react";
import { Section } from "../../styled";
import { CoinSwitcher } from "../navigation/CoinSwicher";

export const Converter = () => {
  return (
    <Section style={{ height: "500px" }} className="mt-2">
      <CoinSwitcher />
      <h2>Converter</h2>
    </Section>
  );
};
