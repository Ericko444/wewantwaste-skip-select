import type { Skip } from "@/types";
import { faCalendarAlt, faCheckCircle, faDumpster, faExclamationTriangle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";

interface SkipCardProps {
    skip: Skip;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

const formatPrice = (price: number): string => {
    return `£${price.toFixed(2)}`;
};

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {

    const skipImagePlaceholder = (
        <div className="h-40 bg-gray-200 flex items-center justify-center rounded-t-xl mb-4 relative">
            <FontAwesomeIcon icon={faDumpster} className="text-5xl text-gray-400" />
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {skip.size} Yard
            </span>
        </div>
    );

    const heavyWasteInfo = skip.allows_heavy_waste ? (
        <div className="flex items-center text-sm text-green-600">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Suitable for heavy waste
        </div>
    ) : (
        <div className="flex items-center text-sm text-red-600">
            <FontAwesomeIcon icon={faTimesCircle} className="mr-1" /> Not for heavy waste
        </div>
    );

    const roadPermitInfo = !skip.allowed_on_road ? (
        <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 text-xs rounded-md flex items-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            <span>May require road permit if on public land.</span>
        </div>
    ) : null;

    const cardBaseClasses = "skip-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer border-2";
    const cardStateClasses = isSelected
        ? "border-blue-500 ring-2 ring-blue-300 bg-blue-50"
        : "border-transparent hover:border-blue-400";


    const buttonBaseClasses = "mt-4 w-full text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300 text-sm";
    const buttonStateClasses = isSelected
        ? "bg-green-500 hover:bg-green-600"
        : "bg-blue-500 hover:bg-blue-600";
    const buttonText = isSelected ? "Selected" : "Select This Skip";

    const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
    return (
        <div
            id={`skip-card-${skip.id}`}
            className={`${cardBaseClasses} ${cardStateClasses}`}
            onClick={() => onSelect(skip.id)}
            role="button"
        >
            {skipImagePlaceholder}
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {skip.size} Yard Skip
                </h3>
                <p className="text-2xl font-extrabold text-blue-600 mb-3">
                    {formatPrice(totalPrice)}{' '}
                    <span className="text-xs font-normal text-gray-500">inc. VAT</span>
                </p>

                <div className="space-y-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-2" />
                        <span>{skip.hire_period_days} days hire included</span>
                    </div>
                    {heavyWasteInfo}
                </div>

                {roadPermitInfo}

                <button
                    type="button"
                    className={`${buttonBaseClasses} ${buttonStateClasses}`}
                >
                    {buttonText}
                </button>
            </div>

        </div>
    );
}

export default SkipCard;