import React from "react";
import Link from "next/link";

export const CoinProfileCard: React.FC<{ coin: any }> = ({ coin }) => {
  const haslink = coin?.links?.homepage[0] !== undefined;
  return (
    <div className="w-2/6   border-gray-300 dark:border-gray-700 py-2 rounded-lg ">
      <div className="w-full   border-gray-300 dark:border-gray-700 flex  rounded-xl flex  gap-2">
        <div className="bg-gray-200  dark:bg-gray-900 p-2 rounded-md">
          <img height={50} width={50} src={coin?.image?.small} />
        </div>
        <div className=" flex items-center justify-center ">
          <span>
            {coin?.name} {`(${coin?.symbol?.toUpperCase()})`}
            <Link href={haslink ? coin.links?.homepage[0] : ""} target="_blank">
              <p className="hover:underline">Visit website</p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
