import React from "react";
import Link from "next/link";
import { nanoid } from "nanoid";

interface LinksListProps {
  links: string[];
}

export const LinksList: React.FC<LinksListProps> = ({ links }) => {
  return (
    <div>
      {links &&
        links.map((link) =>
          link !== "" ? (
            <Link key={nanoid()} href={link} target="_blank">
              <div
                className="w-full py-2 mb-2 min-h-8 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center 
                hover:bg-indigo-600 hover:text-white"
              >
                {link}
              </div>
            </Link>
          ) : (
            ""
          )
        )}
    </div>
  );
};
