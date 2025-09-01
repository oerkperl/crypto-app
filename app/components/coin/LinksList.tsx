import React, { ReactNode, useRef } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";

interface LinksListProps {
  links: string[];
  children?: ReactNode;
  width?: string;
  height?: string;
}

const trimLink = (link: string): string => {
  const modifiedLink = link.replace(/\.([a-zA-Z]{2,})\/.*/, ".$1");
  return modifiedLink;
};

export const LinksList: React.FC<LinksListProps> = ({
  links,
  width,
  height,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div
        className="relative overflow-hidden w-full bg-white dark:bg-transparent rounded"
        style={{ width, height }}
      >
        <div
          ref={containerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-8 py-2"
          style={{
            width: "100%",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {links &&
            links
              .filter((link) => link !== "")
              .map((link) => (
                <Link key={nanoid()} href={link} target="_blank">
                  <div
                    className="flex-shrink-0 my-1 px-3 py-2 min-h-[44px] sm:min-h-8 bg-gray-200 dark:bg-input-bg rounded-md 
                flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors
                text-xs sm:text-sm whitespace-nowrap"
                  >
                    {trimLink(link)}
                  </div>
                </Link>
              ))}
        </div>

        {/* Left scroll button */}
        <button
          className="absolute top-0 left-0 h-full px-2 sm:px-3 z-10 bg-gray-300/80 dark:bg-input-bg/80 hover:bg-indigo-600 transition-colors min-w-[44px] flex items-center justify-center backdrop-blur-sm"
          onClick={scrollLeft}
        >
          <span className="text-lg font-bold">‹</span>
        </button>

        {/* Right scroll button */}
        <button
          className="absolute top-0 right-0 h-full px-2 sm:px-3 z-10 bg-gray-300/80 dark:bg-input-bg/80 hover:bg-indigo-600 transition-colors min-w-[44px] flex items-center justify-center backdrop-blur-sm"
          onClick={scrollRight}
        >
          <span className="text-lg font-bold">›</span>
        </button>
      </div>
    </>
  );
};
