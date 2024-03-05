import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfileCard } from "./ProfileCard";
import { MyAsset } from "./MyAsset";
import { MyCoin } from "./MyCoin";

export const AssetRow: React.FC<{ myCoin: any }> = ({ myCoin }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [asset, setAsset] = useState<any>({});
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${myCoin?.id}&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

  const fetchAsset = async () => {
    try {
      const { data } = await axios(url);
      if (data) {
        setIsLoading(false);
        setAsset(data[0]);
        setHasError(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchAsset();
  }, [fetchAsset]);
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full min-h-16 mb-2 relative">
        <div className="flex gap-4">
          <ProfileCard myCoin={myCoin} />
          <div className="w-full mt-2 flex flex-col p-4 ">
            <MyAsset
              asset={asset}
              fetchAsset={fetchAsset}
              hasError={hasError}
            />
            <hr className="mt-4 " />
            <MyCoin myCoin={myCoin} asset={asset} hasError={hasError} />
          </div>
        </div>
      </div>
    </>
  );
};
