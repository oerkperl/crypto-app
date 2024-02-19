import ThemeSwitcher from "./ThemeSwitcher";
import { Section, Row } from "../../styled";
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
    <Section $margin="1rem 0 0 0">
      <Row>
        <div className="flex">
          <div className="flex">
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
