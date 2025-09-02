import { BlinkingGradientLoader } from "@/lib/utils/components/BlinkingLoader";
import { Wrapper, Item, CoinItem } from "../home/styled";

const laodingGradient = <BlinkingGradientLoader height="10px" />;

export const LoadingCoin = () => {
  return (
    <>
      {/* Desktop Loading Row - Hidden on mobile */}
      <Wrapper className="hidden lg:flex border-b border-gray-300">
        <Item className="flex p-1">
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
          <div className="flex justify-between mb-1">
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
          <div className="flex justify-between mb-1">
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

      {/* Mobile Loading Card - Hidden on desktop */}
      <div className="lg:hidden bg-white dark:bg-transparent border-b border-gray-300 dark:border-gray-700 p-4">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <BlinkingGradientLoader height="12px" width="20px" />
            <BlinkingGradientLoader height="32px" width="32px" />
            <div>
              <BlinkingGradientLoader height="16px" width="120px" />
              <div className="mt-1">
                <BlinkingGradientLoader height="12px" width="60px" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <BlinkingGradientLoader height="18px" width="80px" />
            <div className="mt-1">
              <BlinkingGradientLoader height="14px" width="50px" />
            </div>
          </div>
        </div>

        {/* Price Changes Row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <BlinkingGradientLoader height="10px" width="20px" />
            <div className="mt-1">
              <BlinkingGradientLoader height="12px" width="30px" />
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <BlinkingGradientLoader height="10px" width="20px" />
            <div className="mt-1">
              <BlinkingGradientLoader height="12px" width="30px" />
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <BlinkingGradientLoader height="10px" width="20px" />
            <div className="mt-1">
              <BlinkingGradientLoader height="12px" width="30px" />
            </div>
          </div>
        </div>

        {/* Chart Row */}
        <div className="h-12 mb-2">
          <BlinkingGradientLoader height="48px" width="100%" />
        </div>

        {/* Market Stats Row */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <BlinkingGradientLoader height="10px" width="60px" />
            <BlinkingGradientLoader height="10px" width="80px" />
          </div>
          <div className="flex justify-between">
            <BlinkingGradientLoader height="10px" width="70px" />
            <BlinkingGradientLoader height="10px" width="90px" />
          </div>
        </div>
      </div>
    </>
  );
};
