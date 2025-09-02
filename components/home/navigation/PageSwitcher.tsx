import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const PageSwitcher: React.FC<{
  icon: any;
  name: string;
  path: string;
}> = ({ icon, name, path }) => {
  const activePath = usePathname();

  return (
    <Link href={path}>
      <div
        className={`flex items-center px-3 sm:px-4 py-2 sm:py-1 gap-1 sm:gap-2 rounded dark:hover:text-white hover:text-gray-500 transition-colors min-h-[44px] sm:min-h-auto
        ${path === activePath ? "bg-indigo-700 text-white" : ""}
      `}
      >
        <span className="text-sm sm:text-xs">{icon}</span>
        <span className="text-sm sm:text-xs font-medium">{name}</span>
      </div>
    </Link>
  );
};
