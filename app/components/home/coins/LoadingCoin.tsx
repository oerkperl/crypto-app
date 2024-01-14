import { Wrapper, Item, CoinItem } from "../styled";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";

const laodingGradient = <BlinkingGradientLoader height="10px" />;

export const LoadingCoin = () => {
  return (
    <Wrapper className="flex border-b border-gray-300">
      <Item className=" flex p-1">
        <span>
          <BlinkingGradientLoader height="25px" width="25px" />
        </span>
        <BlinkingGradientLoader height="10px" width="140px" />
      </Item>
      <CoinItem $width="150px" className="p-1">
        {laodingGradient}
      </CoinItem>
      <CoinItem className="p-1">{laodingGradient}</CoinItem>
      <CoinItem className="p-1">{laodingGradient}</CoinItem>
      <CoinItem className="p-1">{laodingGradient}</CoinItem>
      <Item className="p-1">
        <div className="flex justify-between mb-1 ">
          <span>
            <BlinkingGradientLoader height="10px" width="40px" />
          </span>
          <span>
            <BlinkingGradientLoader height="10px" width="40px" />
          </span>
        </div>
        {laodingGradient}
      </Item>
      <Item className="p-1">
        <div className="flex justify-between mb-1 ">
          <span>
            <BlinkingGradientLoader height="10px" width="40px" />
          </span>
          <span>
            <BlinkingGradientLoader height="10px" width="40px" />
          </span>
        </div>
        {laodingGradient}
      </Item>
      <Item className="p-1">
        <BlinkingGradientLoader height="30px" />
      </Item>
    </Wrapper>
  );
};
