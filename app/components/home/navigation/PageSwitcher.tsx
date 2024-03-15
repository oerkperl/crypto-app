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
        className={`flex items-center px-4 py-1 gap-1 rounded-full hover:text-white hover:bg-indigo-600
        
      ${path === activePath ? "text-white bg-indigo-600" : ""}
      `}
      >
        <p className="text-xs">{icon}</p>
        <p className="text-xs">{name}</p>
      </div>
    </Link>
  );
};
