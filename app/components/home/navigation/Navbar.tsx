import ThemeSwitcher from "./ThemeSwitcher";
import { useCryptoContext } from "@/app/context/context";
import { Section, Row } from "../../styled";
import { NavBtn, NavFrom } from "../styled";
import { Search } from "./Search";
import { PageSwitcher } from "./PageSwitcher";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons/faLayerGroup";
import Link from "next/link";

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
            <Link href={"/"}>
              <PageSwitcher name="Home" icon={homeIcon} />
            </Link>
            <Link href={"/portfolio"}>
              <PageSwitcher name="Portfolio" icon={portfolio} />
            </Link>
          </div>
          <div className="border border-gray-700 inline-flex p-0.5 rounded-lg ">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`${
                  option === selectedOption
                    ? "bg-indigo-600 text-white hover:text-white"
                    : ""
                }  px-7 text-sm rounded hover:text-indigo-500 `}
              >
                {option}
              </button>
            ))}
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
