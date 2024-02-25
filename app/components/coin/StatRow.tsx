export const StatRow: React.FC<{ stat: string; title: string }> = ({
  stat,
  title,
}) => {
  return (
    <div className="flex gap-1 items-center ">
      <span className="bg-indigo-600 w-4 h-4 rounded-full text-white"></span>
      <span className="text-sm">{title}</span>
      <span className="text-xs">{stat}</span>
    </div>
  );
};
