import React, { useState } from "react";
import { Main, Section } from "../components/styled";
import { FormModal } from "../components/portfolio/FormModal";
import { LoadingAsset } from "../components/portfolio/LoadingAsset";
import { AssetsList } from "../components/portfolio/AssetsList";
import { useCryptoContext } from "../context/context";
import { Modal } from "../components/Modal";

export const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getAssets } = useCryptoContext();
  const hasAssets = getAssets().length > 0;

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Main className="relative">
      <Section className=" ">
        <div className="flex justify-between mt-2  items-center">
          <h1 className="">Your Assets</h1>
          <button
            className="px-8 py-1 rounded-md bg-indigo-600 text-white"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add Asset
          </button>
        </div>
        <div>
          {!hasAssets && (
            <div className="mt-16">
              <p className="text-center">
                You have no assets in your portfolio. Click the Add Asset button
                to add
              </p>
              <LoadingAsset />
            </div>
          )}
          {hasAssets && (
            <div className="mt-2">
              <AssetsList />
            </div>
          )}
        </div>
        <div className="">
          <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <FormModal onClose={handleCloseModal} isOpen={isOpen} />
          </Modal>
        </div>
      </Section>
    </Main>
  );
};
