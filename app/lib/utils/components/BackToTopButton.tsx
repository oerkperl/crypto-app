import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    setIsVisible(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 min-w-[48px] min-h-[48px] px-3 py-2 sm:px-5 sm:py-1 rounded-full sm:rounded border border-gray-400 dark:border-indigo-600 hover:bg-indigo-600 hover:text-white bg-white dark:bg-gray-800 shadow-lg transition-all duration-200 flex items-center justify-center z-40 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <FontAwesomeIcon icon={faUpLong} className="text-lg" />
    </button>
  );
};
