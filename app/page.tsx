"use client";
import { Dashboard } from "../components/home/charts/Dashboard";
import { CoinsList } from "../components/home/coinsList/CoinsList";
//import { BackToTopButton } from "../app/lib/utils/components/BackToTopButton";
import { useUIStore } from "../store";
import { Coin } from "../components/coin/Coin";
import { BackToTopButton } from "@/lib/utils/components/BackToTopButton";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Page = () => {
  // ✅ Zustand: Only subscribes to modal state
  const isOpen = useUIStore((state) => state.isOpen);
  const setIsOpen = useUIStore((state) => state.setIsOpen);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <main className="w-full max-w-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2 sm:px-4 lg:px-6">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[95vw] max-w-[95vw] max-h-[95vh] overflow-y-auto">
            <Coin />
          </DialogContent>
        </Dialog>
        <section>
          <Dashboard />
        </section>
        <CoinsList />
        <BackToTopButton />
      </main>
    </>
  );
};

export default Page;
