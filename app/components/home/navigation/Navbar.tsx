import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Section } from "../../styled";
import { NavBtn, NavFrom } from "../styled";
import { Search } from "./Search";
import { PageSwitcher } from "./PageSwitcher";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons/faLayerGroup";

export const Navabr = () => {
  const homeIcon = <FontAwesomeIcon icon={faHouse} />;
  const portfolio = <FontAwesomeIcon icon={faLayerGroup} />;
  return (
    <Section>
      <div className="flex justify-between rounded py-2 px-1 items-center bg-white dark:bg-accent-bg">
        <div>
          <div className="flex gap-2">
            <div
              className="flex gap-1 items-center  border-gray-300 dark:border-gray-700 
          bg-white dark:bg-transparent rounded-full "
            >
              <PageSwitcher name="Home" icon={homeIcon} path={"/"} />
              <PageSwitcher
                name="Portfolio"
                icon={portfolio}
                path={"/portfolio"}
              />
            </div>
          </div>
        </div>
        <div>
          <NavFrom>
            <NavBtn>
              <Search />
            </NavBtn>
          </NavFrom>
        </div>
        <div>
          <NavFrom>
            <CurrencyDropdown />
            <ThemeSwitcher />
          </NavFrom>
        </div>
      </div>
    </Section>
  );
};
