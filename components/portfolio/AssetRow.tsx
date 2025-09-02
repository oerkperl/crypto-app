import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfileCard } from "./ProfileCard";
import { MyAsset } from "./MyAsset";
import { MyCoin } from "@/app/components/portfolio/MyCoin";

export const AssetRow: React.FC<{ myCoin: any }> = ({ myCoin }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [asset, setAsset] = useState<any>({});

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${myCoin?.id}&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

  const fetchAsset = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(url);
      if (data && data[0]) {
        setAsset(data[0]);
        setHasError(false);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAsset();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-4 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
        <ProfileCard myCoin={myCoin} />
        <div className="w-full flex flex-col p-4 sm:py-4 sm:pr-4 sm:pl-0">
          <MyAsset myCoin={myCoin} asset={asset} fetchAsset={fetchAsset} hasError={hasError} />
          <MyCoin myCoin={myCoin} asset={asset} hasError={hasError} />
        </div>
      </div>
    </div>
  );
};
