import { useCryptoContext } from "@/app/context/context";
export const CoinSwitcher = () => {
  const options = ["Charts", "Converter"];
  const { selectedOption, setSelectedOption } = useCryptoContext();

  return (
    <div className={` inline-flex p-1 rounded-lg `}>
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
