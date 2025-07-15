import { X } from "lucide-react";

type ClearButtonProps = {
  onClick: () => void;
  className?: string;
};

export const ClearButton = ({ onClick, className }: ClearButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none ${className ?? ""}`}
    >
      <X className="w-4 h-4" />
    </button>
  );
};