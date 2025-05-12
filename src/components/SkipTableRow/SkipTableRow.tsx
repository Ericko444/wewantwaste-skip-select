import type { Skip } from "@/types";
import { faCheckCircle, faTimesCircle, faExclamationTriangle, faDumpster } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SkipTableRowProps {
    skip: Skip;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

const formatPrice = (price: number): string => `£${price.toFixed(2)}`;

const SkipTableRow: React.FC<SkipTableRowProps> = ({ skip, isSelected, onSelect }) => {
    const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);

    return (
        <tr
            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50 ring-1 ring-blue-300' : ''}`}
            onClick={() => onSelect(skip.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(skip.id); }}
        >
            <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-500' : 'bg-gray-200'}`}>
                        <FontAwesomeIcon icon={faDumpster} className={isSelected ? 'text-white' : 'text-gray-500'} />
                    </div>
                    <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{skip.size} Yard</div>
                        <div className="text-xs text-gray-500">{skip.hire_period_days} days hire</div>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                {skip.allows_heavy_waste ? (
                    <span className="flex items-center text-green-600">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1.5" /> Heavy Waste OK
                    </span>
                ) : (
                    <span className="flex items-center text-red-600">
                        <FontAwesomeIcon icon={faTimesCircle} className="mr-1.5" /> Light Waste Only
                    </span>
                )}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                {!skip.allowed_on_road && (
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-md">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1.5" /> Permit May Be Needed
                    </span>
                )}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                {formatPrice(totalPrice)}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={(e) => { e.stopPropagation(); onSelect(skip.id); }}
                    className={`font-medium py-1 px-3 rounded-md text-xs
            ${isSelected ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    {isSelected ? 'Selected' : 'Select'}
                </button>
            </td>
        </tr>
    );
};

export default React.memo(SkipTableRow);