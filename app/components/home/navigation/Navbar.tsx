import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { useCryptoContext } from "@/app/context/context";
import { Section, Row } from "../../styled";
import { NavBtn, NavFrom } from "../styled";
import { Search } from "./Search";
import { PageSwitcher } from "./PageSwitcher";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons/faLayerGroup";
import { CoinSwitcher } from "./CoinSwicher";

export const Navabr = () => {
  const homeIcon = <FontAwesomeIcon icon={faHouse} />;
  const portfolio = <FontAwesomeIcon icon={faLayerGroup} />;
  const options = ["Coins", "Converter"];
  const { selectedOption, setSelectedOption } = useCryptoContext();
  return (
    <Section $margin="1rem 0 0 0">
      <Row className="">
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
