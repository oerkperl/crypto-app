import React from "react";
import { Wrapper, Item } from "../styled";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

export const LoadingMarketData: React.FC<{ fetchMarketData: () => void }> = ({
  fetchMarketData,
}) => {
  return (
    <div>
      <Wrapper className="flex justify-between text-center">
        <Item>
          <BlinkingGradientLoader width="100px" />
        </Item>
        <Item>
          <BlinkingGradientLoader width="70px" />
        </Item>
        <Item className="flex items-center">
          <BlinkingGradientLoader width="100px" />
        </Item>
        <Item className="flex items-center">
          <BlinkingGradientLoader width="130px" />
        </Item>
        <Item className="flex items-center">
          <BlinkingGradientLoader width="120px" />
        </Item>
        <Item>
          <button
            className="hover:text-indigo-500"
            onClick={() => {
              fetchMarketData();
            }}
          >
            Reload
          </button>
        </Item>
      </Wrapper>
      <hr />
    </div>
  );
};
