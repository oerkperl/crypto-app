// import React from "react";
// import Link from "next/link";
// import { nanoid } from "nanoid";

// interface LinksListProps {
//   links: string[];
// }

// const trimLink = (link: string): string => {
//   const modifiedLink = link.replace(/\.([a-zA-Z]{2,})\/.*/, ".$1");
//   return modifiedLink;
// };
// export const LinksList: React.FC<LinksListProps> = ({ links }) => {
//   return (
//     <div className="flex flex-col gap-2">
//       {links &&
//         links.map((link) =>
//           link !== "" ? (
//             <Link key={nanoid()} href={link} target="_blank">
//               <div
//                 className="w-full min-h-8 bg-gray-200 dark:bg-input-bg rounded flex items-center justify-center
//                 hover:bg-indigo-600 hover:text-white bg-opacity-80"
//               >
//                 <p>{trimLink(link)}</p>
//               </div>
//             </Link>
//           ) : (
//             ""
//           )
//         )}
//     </div>
//   );
// };

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
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div
        className=" relative overflow-hidden w-full bg-white dark:bg-transparent rounded"
        style={{ width, height }}
      >
        <div
          ref={containerRef}
          className="flex gap-2 overflow-x-hidden  px-8 relative max-w-full"
          style={{ width: "fit-content" }}
        >
          {links &&
            links.map((link) =>
              link !== "" ? (
                <Link key={nanoid()} href={link} target="_blank">
                  <div
                    className=" my-2 px-2 min-h-8  bg-gray-200 dark:bg-input-bg rounded-md 
                flex flex-wrap items-center justify-center hover:bg-indigo-600 hover:text-white  
                "
                  >
                    {trimLink(link)}
                  </div>
                </Link>
              ) : (
                ""
              )
            )}
        </div>
        <button
          className="absolute top-0 left-0 h-full px-2 z-10 bg-gray-300 dark:bg-input-bg hover:bg-indigo-600"
          onClick={scrollLeft}
        >
          {"<"}
        </button>
        <button
          className="absolute top-0 right-0 h-full px-2 z-10 bg-gray-300 dark:bg-input-bg hover:bg-indigo-600"
          onClick={scrollRight}
        >
          {">"}
        </button>
      </div>
    </>
  );
};
