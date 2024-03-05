import React from "react";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import { Section, Row } from "../../styled";
import { NavBtn, NavFrom } from "../styled";
import { Search } from "./Search";
import { PageSwitcher } from "./PageSwitcher";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons/faLayerGroup";
import { useTheme } from "next-themes";

export const Navabr = () => {
  const homeIcon = <FontAwesomeIcon icon={faHouse} />;
  const portfolio = <FontAwesomeIcon icon={faLayerGroup} />;
  const { theme } = useTheme();
  const logoPngLink =
    theme === "dark"
      ? "https://i.ibb.co/r4pH4dM/Asset-2.png"
      : "https://i.ibb.co/0C2kvLT/Asset-1.png";
  return (
    <Section $margin="1rem 0 0 0">
      <Row>
        <div className="flex gap-2">
          <Image src={logoPngLink} width={20} height={20} alt="logo image" />
          <div className="flex gap-1 items-center rounded-full  px-3 bg-white dark:bg-gray-800">
            <PageSwitcher name="Home" icon={homeIcon} path={"/"} />
            <PageSwitcher
              name="Portfolio"
              icon={portfolio}
              path={"/portfolio"}
            />
          </div>
        </div>
        <NavFrom>
          <NavBtn>
            <Search />
          </NavBtn>
          <CurrencyDropdown />
          <ThemeSwitcher />
        </NavFrom>
      </Row>
    </Section>
  );
};
