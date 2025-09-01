import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
export const StatRow: React.FC<{ stat: string; title: string }> = ({
  stat,
  title,
}) => {
  return (
    <div className="flex flex-col gap-1 px-2 py-1 text-center sm:text-left">
      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
        {title}
      </span>
      <span className="text-sm sm:text-xs dark:text-white font-semibold break-words">
        {stat}
      </span>
    </div>
  );
};
