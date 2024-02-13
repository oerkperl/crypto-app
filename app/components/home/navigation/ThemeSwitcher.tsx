import { useState, useEffect } from "react";
import { NavBtn } from "../styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import { switchBg } from "@/app/lib/utils/formatters";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dark = <FontAwesomeIcon icon={faMoon} />;
  const light = <FontAwesomeIcon icon={faCircleHalfStroke} />;
  const bg = switchBg(theme);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <NavBtn className=" ">
      <button
        onClick={toggleTheme}
        className={`px-4 rounded-md hover:text-white hover:bg-indigo-500 w-full ${bg}`}
      >
        {theme === "light" ? dark : light}
      </button>
    </NavBtn>
  );
};

export default ThemeSwitcher;
