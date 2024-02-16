export const StatRow: React.FC<{ stat: string; title: string }> = ({
  stat,
  title,
}) => {
  return (
    <div className="flex gap-1 items-center ">
      <span className="bg-indigo-600 px-1 rounded-md text-xs text-white">
        +
      </span>
      <span className="text-sm">{title}</span>
      <span className="text-xs">{stat}</span>
    </div>
  );
};
