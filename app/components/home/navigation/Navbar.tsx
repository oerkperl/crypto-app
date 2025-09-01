import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
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
    <section>
      <div className="flex flex-row justify-between py-2 px-1 sm:px-1 items-center gap-1 sm:gap-2 shadow-sm bg-white dark:bg-accent-bg">
        {/* Left: Navigation buttons */}
        <div className="flex gap-1 items-center bg-white dark:bg-transparent rounded-full flex-shrink-0">
          <PageSwitcher name="Home" icon={homeIcon} path={"/"} />
          <PageSwitcher name="Portfolio" icon={portfolio} path={"/portfolio"} />
        </div>

        {/* Center: Search - flexible width */}
        <div className="flex-1 min-w-0 mx-1 sm:mx-2">
          <Search />
        </div>

        {/* Right: Controls */}
        <div className="flex gap-1 sm:gap-2 flex-shrink-0">
          <CurrencyDropdown />
          <ThemeSwitcher />
        </div>
      </div>
    </section>
  );
};
