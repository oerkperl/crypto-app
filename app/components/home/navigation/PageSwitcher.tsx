import React from "react";

export const PageSwitcher: React.FC<{ icon: any; name: string }> = ({
  icon,
  name,
}) => {
  return (
    <div className="flex flex-col p-1 border border-gray-500 mr-1 items-center rounded-lg hover:text-white hover:bg-indigo-500">
      <button>
        <p className="text-xs">{icon}</p>
        <p className="text-xs">{name}</p>
      </button>
    </div>
  );
};
