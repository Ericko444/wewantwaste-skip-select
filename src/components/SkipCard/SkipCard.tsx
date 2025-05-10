import type { Skip } from "@/types";
import type React from "react";

interface SkipCardProps {
    skip: Skip;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
    const cardBaseClasses = "bg-white rounded-lg shadow-md p-4 m-2 cursor-pointer border-2";
    const selectionClasses = isSelected ? "border-blue-500" : "border-transparent hover:border-gray-300";
    return (
        <div
            className={`${cardBaseClasses} ${selectionClasses}`}
            onClick={() => onSelect(skip.id)}
            role="button"
            tabIndex={0}
        >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {skip.size} Yard Skip
            </h3>

            {isSelected && (
                <p className="text-xs text-blue-600 font-medium">Selected</p>
            )}

        </div>
    );
}

export default SkipCard;