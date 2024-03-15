import React from "react";
import Link from "next/link";
import { nanoid } from "nanoid";

interface LinksListProps {
  links: string[];
}

const trimLink = (link: string): string => {
  const modifiedLink = link.replace(/\.([a-zA-Z]{2,})\/.*/, ".$1");
  return modifiedLink;
};
export const LinksList: React.FC<LinksListProps> = ({ links }) => {
  return (
    <div className="flex flex-col gap-2">
      {links &&
        links.map((link) =>
          link !== "" ? (
            <Link key={nanoid()} href={link} target="_blank">
              <div
                className="w-full min-h-8 bg-gray-200 dark:bg-gray-900 rounded-full flex items-center justify-center 
                hover:bg-indigo-600 hover:text-white bg-opacity-80"
              >
                <p>{trimLink(link)}</p>
              </div>
            </Link>
          ) : (
            ""
          )
        )}
    </div>
  );
};
