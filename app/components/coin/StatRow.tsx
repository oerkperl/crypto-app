import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
export const StatRow: React.FC<{ stat: string; title: string }> = ({
  stat,
  title,
}) => {
  return (
    <div className="flex w-full gap-1 items-center justify-between px-2 ">
      <div className="flex gap-2">
        <span className="text-trend-blue dark:text-accent-green">
          <FontAwesomeIcon icon={faCircleDot} />
        </span>
        <span className="text-sm">{title}</span>
      </div>
      <span className="text-xs">{stat}</span>
    </div>
  );
};
