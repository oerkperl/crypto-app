import React from "react";
import Image from "next/image";
import { useUIStore } from "@/store/uiStore";
import Link from "next/link";

export const ProfileCard: React.FC<{ myCoin: any }> = ({ myCoin }) => {
  const setViewingCoinId = useUIStore((state) => state.setViewingCoinId);

  return (
    <Link
      onClick={() => setViewingCoinId(myCoin?.id)}
      href={`/coin?id=${myCoin?.id}`}
      className="w-full sm:w-1/4 flex flex-row sm:flex-col rounded gap-2 sm:gap-4 justify-center items-center bg-gray-200 dark:bg-input-bg p-3 sm:p-4 min-h-[80px] sm:min-h-auto hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gray-100 dark:bg-accent-bg rounded-md flex items-center justify-center flex-shrink-0">
        <Image
          src={myCoin?.image}
          height={32}
          width={32}
          className="sm:h-10 sm:w-10"
          alt="coin image"
        />
      </div>
      <div className="flex flex-col sm:items-center text-left sm:text-center">
        <h1 className="text-sm sm:text-base font-medium">{myCoin?.name}</h1>
        <h2 className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {`(${myCoin?.symbol.toUpperCase()})`}
        </h2>
      </div>
    </Link>
  );
};
