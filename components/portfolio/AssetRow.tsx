import React, { useState, useEffect } from "react";
import { ProfileCard } from "./ProfileCard";
import { MyAsset } from "./MyAsset";
import { MyCoin } from "./MyCoin";
import { apiHelpers } from "@/lib/api/coingecko";

export const AssetRow: React.FC<{ myCoin: any }> = ({ myCoin }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [asset, setAsset] = useState<any>({});

  const fetchAsset = async () => {
    try {
      setIsLoading(true);
      const data = await apiHelpers.getCoinMarkets({
        ids: myCoin?.id,
        perPage: 1,
      });
      if (data && data[0]) {
        setAsset(data[0]);
        setHasError(false);
      }
    } catch (error) {
      console.error("Failed to fetch asset data:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAsset();
  }, []);

  return (
    <div className="bg-white dark:bg-accent-bg rounded shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-4 border-">
        <ProfileCard myCoin={myCoin} />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1   lg:border-b-0 border-b">
          <MyAsset
            myCoin={myCoin}
            asset={asset}
            fetchAsset={fetchAsset}
            hasError={hasError}
          />
        </div>
        <div className="flex-1">
          <MyCoin myCoin={myCoin} asset={asset} hasError={hasError} />
        </div>
      </div>
    </div>
  );
};
