import React from "react";
import Image from "next/image";
import { useCryptoContext } from "@/app/context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export const ProfileCard: React.FC<{ myCoin: any }> = ({ myCoin }) => {
  const { removeAsset } = useCryptoContext();

  return (
    <div className="w-1/4  flex flex-col rounded-xl gap-4 justify-center items-center bg-gray-200 dark:bg-gray-900">
      <div className="h-16 w-16 bg-gray-300 dark:bg-gray-800 rounded-md flex items-center justify-center">
        <Image src={myCoin?.image} height={40} width={40} alt="coin image" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1>{myCoin?.name}</h1>
        <h1>{`(${myCoin?.symbol.toUpperCase()})`}</h1>
        <button
          className="px-2 rounded-md hover:bg-pink-600 hover:text-white"
          onClick={() => {
            removeAsset(myCoin);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
};
