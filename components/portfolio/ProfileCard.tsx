import React from "react";
import Image from "next/image";
import Link from "next/link";

export const ProfileCard: React.FC<{ myCoin: any }> = ({ myCoin }) => {
  return (
    <Link
      href={`/coin?id=${myCoin?.id}`}
      className="flex items-center gap-3 p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded transition-colors duration-200 group"
    >
      <div className="h-12 w-12 bg-white dark:bg-gray-800 rounded flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
        <Image
          src={myCoin?.image || "https://via.placeholder.com/32"}
          height={32}
          width={32}
          className="h-8 w-8 object-contain"
          alt="coin image"
        />
      </div>
      <div className="flex flex-col justify-center text-left min-w-0 flex-1">
        <h1 className="text-base font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {myCoin?.name}
        </h1>
        <h2 className="text-sm text-gray-500 dark:text-gray-400 truncate font-medium">
          {myCoin?.symbol?.toUpperCase() || "N/A"}
        </h2>
      </div>
    </Link>
  );
};
