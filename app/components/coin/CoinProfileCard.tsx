import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export const CoinProfileCard: React.FC<{ coin: any }> = ({ coin }) => {
  const haslink = coin?.links?.homepage[0] !== undefined;
  return (
    <div className="w-2/6 rounded-lg ">
      <div className="w-full flex  rounded-xl flex  gap-2">
        <div className="bg-gray-200  dark:bg-accent-bg p-2 rounded-md">
          <img height={50} width={50} src={coin?.image?.small} />
        </div>
        <div className=" flex items-center justify-center ">
          <span>
            {coin?.name} {`(${coin?.symbol?.toUpperCase()})`}
            <Link
              href={haslink ? coin.links?.homepage[0] : ""}
              target="_blank"
              className="flex items-center gap-1 hover:underline hover:dark:text-white"
            >
              <FontAwesomeIcon icon={faGlobe} />
              <p className="hover:underline">Visit website</p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
