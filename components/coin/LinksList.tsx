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
        ref={containerRef}
        className="flex items-center py-2 gap-2 w-full overflow-x-auto scrollbar-hide bg-white dark:bg-accent-bg px-2 rounded"
      >
        {links &&
          links
            .filter((link) => link !== "")
            .map((link) => (
              <Link
                key={nanoid()}
                href={link}
                target="_blank"
                className="flex w-full items-center overflow-hidden px-2 text-truncate"
              >
                <div className="w-full flex items-center">{trimLink(link)}</div>
              </Link>
            ))}
      </div>

      {/* Left scroll button */}
    </>
  );
};
