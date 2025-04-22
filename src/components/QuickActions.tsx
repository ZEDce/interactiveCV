import React from "react";
import { RotateCcw } from "lucide-react";

interface QuickActionsProps {
  onSend: (text: string) => void;
  onReset: () => void;
  loading: boolean;
}

const suggestions = [
  "Aké máš projekty?",
  "Popíš pracovné skúsenosti.",
  "Aké máš vzdelanie?",
  "Technické Zručnosti",
  "Kontaktuj ma",
];

const QuickActions: React.FC<QuickActionsProps> = ({
  onSend,
  onReset,
  loading,
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-4">
    {suggestions.map((suggestion) => (
      <button
        key={suggestion}
        onClick={() => onSend(suggestion)}
        className="bg-orange-100 hover:bg-orange-200 text-orange-800 text-sm font-medium py-2 px-4 rounded-full transition duration-150 ease-in-out"
        disabled={loading}
      >
        {suggestion}
      </button>
    ))}
    <button
      type="button"
      onClick={onReset}
      className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition duration-150 ease-in-out"
      title="Reset Chat"
    >
      <RotateCcw size={20} />
    </button>
  </div>
);

export default QuickActions;
