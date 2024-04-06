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
    <main className="max-w-[1300px] mx-auto relative">
      <section className=" ">
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
            <div className="mt-14">
              <p className="text-center">
                You have no assets in your portfolio. Click the{" "}
                <strong className="dark:text-white">Add Asset </strong>button to
                add
              </p>
            </div>
          )}
          {hasAssets && (
            <div className="mt-2">
              <AssetsList />
            </div>
          )}
        </div>
        <div>
          <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <FormModal onClose={handleCloseModal} isOpen={isOpen} />
          </Modal>
        </div>
      </section>
    </main>
  );
};
