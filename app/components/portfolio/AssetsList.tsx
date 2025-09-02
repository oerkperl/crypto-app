import React from "react";
import { usePortfolioStore } from "@/store/portfolioStore";
import { AssetRow } from "./AssetRow";
export const AssetsList = () => {
  const getAssets = usePortfolioStore((state) => state.getAssets);
  const assets = getAssets();
  return (
    <ul>
      {assets.map((asset) => (
        <li key={asset.id}>
          <AssetRow myCoin={asset} />
        </li>
      ))}
    </ul>
  );
};
