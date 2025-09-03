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
    <div
      ref={containerRef}
      className="flex items-center py-2  mt-2  overflow-x-auto scrollbar-hide bg-white dark:bg-accent-bg px-2 rounded"
    >
      {links &&
        links
          .filter((link) => link !== "")
          .map((link) => (
            <div key={nanoid()} className="flex  items-center px-2 ">
              <div className="flex items-center">
                <Link href={link} target="_blank" className="flex items-center">
                  <div
                    className="flex items-center bg-gray-100 dark:bg-input-bg px-2 py-1 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800
                  dark:hover:text-white"
                  >
                    {trimLink(link)}
                  </div>
                </Link>
              </div>
            </div>
          ))}
    </div>
  );
};
