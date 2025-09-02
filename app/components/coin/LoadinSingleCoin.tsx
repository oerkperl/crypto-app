import React from "react";
import { Main, Section } from "../styled";
import { BlinkingGradientLoader } from "@/app/lib/utils/components/BlinkingLoader";
export const LoadinSingleCoin: React.FC<{ reload: () => void }> = ({
  reload,
}) => {
  return (
    <Main>
      <Section>
        <h1 className="mt-4 text-xl">Your Summary:</h1>
        <div className="flex justiify-between gap-2 mt-4">
          <div className="w-2/6  min-h-16">
            <div className="w-full h-52 bg-white dark:bg-gray-700 rounded flex flex-col items-center justify-center gap-4">
              <BlinkingGradientLoader width="50px" height="50px" />
              <BlinkingGradientLoader width="150px" />
              <BlinkingGradientLoader width="200px" />
            </div>
          </div>
          <div className="w-2/6  min-h-16 ">
            <div className="w-full h-52 bg-white dark:bg-gray-700 rounded flex flex-col items-center justify-center gap-4">
              <BlinkingGradientLoader width="200px" />
              <BlinkingGradientLoader width="150px" />
              <BlinkingGradientLoader width="30px" height="30px" />
              <BlinkingGradientLoader width="150px" />
              <BlinkingGradientLoader width="200px" />
              <BlinkingGradientLoader width="150px" />
            </div>
          </div>
          <div className="w-2/6  min-h-16">
            <div className="w-full h-52 bg-white dark:bg-gray-700 rounded flex flex-col justify-center gap-4 p-2">
              <BlinkingGradientLoader width="200px" />
              <BlinkingGradientLoader width="300px" />
              <BlinkingGradientLoader width="250px" />
              <BlinkingGradientLoader width="300px" />
              <BlinkingGradientLoader width="300px" />
              <BlinkingGradientLoader width="150px" />
            </div>
          </div>
        </div>
        <h1 className="mt-4 text-xl ">Description:</h1>
        <div className="w-full py-6 px-2 mt-4 bg-white dark:bg-gray-700 rounded p-2 max-h-52 flex flex-col gap-3">
          <BlinkingGradientLoader width="500px" />
          <BlinkingGradientLoader width="700px" />
          <BlinkingGradientLoader width="850px" />
        </div>
        <h1 className="text-xl mt-4">Blockchain links:</h1>
        <div className="w-full py-4 px-2 mt-4 bg-white dark:bg-gray-700 rounded">
          <BlinkingGradientLoader />
        </div>
        <div className="w-full py-4 px-2 mt-4 bg-white dark:bg-gray-700 rounded">
          <BlinkingGradientLoader />
        </div>
        <h1 className="mt-2">Please try again in a while</h1>
        <button
          className="border border-gray-500 px-4 py-2 mt-2 mb-2 hover:text-white hover:bg-indigo-600"
          onClick={() => reload()}
        >
          Reload
        </button>
      </Section>
    </Main>
  );
};
