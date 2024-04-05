import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
export const StatRow: React.FC<{ stat: string; title: string }> = ({
  stat,
  title,
}) => {
  return (
    <div className="flex flex-col gap-1 px-2 ">
      <span className="text-sm">{title}</span>
      <span className="text-xs dark:text-white">{stat}</span>
    </div>
  );
};
