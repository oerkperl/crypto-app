import { useCryptoContext } from "@/app/context/context";
import { useTheme } from "next-themes";
import { switchBg } from "@/app/lib/utils/formatters";
export const CoinSwitcher = () => {
  const options = ["Coins", "Converter"];
  const { selectedOption, setSelectedOption } = useCryptoContext();
  const { theme } = useTheme();
  const bg = switchBg(theme);
  return (
    <div className={`${bg} inline-flex p-0.5 rounded-lg `}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => setSelectedOption(option)}
          className={`${
            option === selectedOption
              ? "bg-indigo-600 text-white hover:text-white"
              : ""
          }  px-7 py-1 text-sm rounded hover:text-indigo-500 `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
