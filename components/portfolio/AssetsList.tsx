import React from "react";
import { usePortfolioStore } from "@/store";
import { AssetRow } from "./AssetRow";

export const AssetsList = () => {
  const assets = usePortfolioStore((state) => state.assets);

  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <AssetRow key={asset.id} myCoin={asset} />
      ))}
    </div>
  );
};
