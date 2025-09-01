import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export const CoinProfileCard: React.FC<{ coin: any }> = ({ coin }) => {
  const haslink = coin?.links?.homepage[0] !== undefined;
  return (
    <div className="w-full rounded-lg h-full">
      <div className="w-full h-full bg-white dark:bg-accent-bg shadow-md rounded-xl p-4">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
          <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
            <img
              height={60}
              width={60}
              src={coin?.image?.small}
              alt={`${coin?.name} logo`}
              className="w-[60px] h-[60px]"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {coin?.name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              ({coin?.symbol?.toUpperCase()})
            </p>
            {haslink && (
              <Link
                href={coin.links?.homepage[0]}
                target="_blank"
                className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors text-sm font-medium"
              >
                <FontAwesomeIcon icon={faGlobe} className="text-xs" />
                Visit Website
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
