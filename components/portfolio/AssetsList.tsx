import React from "react";
import { usePortfolioStore } from "@/store";
import { AssetRow } from "./AssetRow";

export const AssetsList = () => {
  const getAssets = usePortfolioStore((state) => state.getAssets);
  const assets = getAssets();

  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <AssetRow key={asset.id} myCoin={asset} />
      ))}
    </div>
  );
};
