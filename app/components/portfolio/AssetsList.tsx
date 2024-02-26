import React from "react";
import { useCryptoContext } from "@/app/context/context";
import { AssetRow } from "./AssetRow";
export const AssetsList = () => {
  const { getAssets } = useCryptoContext();
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
