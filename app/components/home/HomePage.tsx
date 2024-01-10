"use client";
import { Navabr } from "./navigation/Navabr";
import { Charts } from "./charts/Charts";
import { Coins } from "./charts/Coins";
import { Main, Row, Col, Section } from "../globalStyled/styled";
export const HomePage = () => {
  return (
    <>
      <Main>
        <Navabr />
        <Charts />
      </Main>
    </>
  );
};
