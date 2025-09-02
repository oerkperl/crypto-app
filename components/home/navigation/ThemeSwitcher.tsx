import { useState, useEffect } from "react";
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
    <button
      onClick={toggleTheme}
      className={`px-3 sm:px-4 py-2 sm:py-1 rounded-md hover:text-white hover:bg-indigo-600 shadow-md transition-colors min-h-[44px] sm:min-h-auto flex items-center justify-center
        bg-gray-100 dark:bg-input-bg`}
    >
      <FontAwesomeIcon
        icon={faCircleHalfStroke}
        className="text-sm sm:text-xs"
      />
    </button>
  );
};

export default ThemeSwitcher;
