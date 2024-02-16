import React from "react";
import Link from "next/link";

export const CoinProfileCard: React.FC<{ coin: any }> = ({ coin }) => {
  const haslink = coin?.links?.homepage[0] !== undefined;
  return (
    <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center gap-2">
      <div className="bg-gray-200  dark:bg-gray-700 p-2 rounded-md">
        <img height={50} width={50} src={coin?.image?.small} />
      </div>
      <span>
        {coin?.name} {`(${coin?.symbol?.toUpperCase()})`}
      </span>
      <Link href={haslink ? coin.links?.homepage[0] : ""} target="_blank">
        <p className="px-6 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-indigo-600 hover:text-white">
          Visit website
        </p>
      </Link>
    </div>
  );
};
