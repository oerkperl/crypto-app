import { useState, useEffect } from "react";
import { NavBtn } from "../styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
    <NavBtn>
      <button
        onClick={toggleTheme}
        className={`px-4 rounded-md bg-customBg hover:text-white hover:bg-indigo-600 w-full 
        bg-white dark:bg-transparent border border-gray-300 dark:border-gray-700`}
      >
        <FontAwesomeIcon icon={faCircleHalfStroke} />
      </button>
    </NavBtn>
  );
};

export default ThemeSwitcher;
