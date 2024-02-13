import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { switchBg } from "@/app/lib/utils/formatters";

export const PageSwitcher: React.FC<{
  icon: any;
  name: string;
  path: string;
}> = ({ icon, name, path }) => {
  const activePath = usePathname();
  const { theme } = useTheme();
  const bg = switchBg(theme);

  return (
    <Link href={path}>
      <div
        className={`flex flex-col p-1  mr-2 px-8 items-center rounded-lg hover:text-white hover:bg-indigo-600
      ${path === activePath ? "text-white bg-indigo-600" : bg}
      `}
      >
        <button>
          <p className="text-xs">{icon}</p>
          <p className="text-xs">{name}</p>
        </button>
      </div>
    </Link>
  );
};
