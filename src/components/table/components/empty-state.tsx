// components/empty-state.tsx
import React from "react";
import { FolderAdd } from "iconsax-react";

interface EmptyStateProps {
  onAdd?: () => void;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  onAdd,
  message = "No data available at the moment. Click the icon to add data.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 text-gray-500">
      <button
        onClick={onAdd}
        className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-150 ease-in-out"
      >
        <FolderAdd size="50" variant="Bulk" color="#9ca3af" />
      </button>
      <p className="text-lg max-w-xs">{message}</p>
    </div>
  );
};

export default EmptyState;
