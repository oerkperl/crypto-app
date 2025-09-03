import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-gray-200 border-t-indigo-600 rounded-full animate-spin dark:border-gray-700 dark:border-t-indigo-400 ${className}`}
      />
    </div>
  );
};

export const LoadingSpinner: React.FC<{ message?: string; size?: "sm" | "md" | "lg" }> = ({ 
  message = "Loading...", 
  size = "md" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <Spinner size={size} />
      <p className="text-gray-600 dark:text-gray-400 text-sm">{message}</p>
    </div>
  );
};

// Export as default as well for convenience
export default LoadingSpinner;
