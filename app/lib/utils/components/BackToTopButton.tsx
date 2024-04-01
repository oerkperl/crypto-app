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
      className={`fixed  bottom-4 right-4 px-5 py-1 rounded border border-gray-400 dark:border-indigo-600 hover:bg-indigo-600 hover:text-white  ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <FontAwesomeIcon icon={faUpLong} />
    </button>
  );
};
