import type { Skip } from "@/types";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";

interface SkipRecapProps {
    selectedSkip: Skip | null;
    onDeselect: () => void;
    onProceed: () => void;
}

const formatPrice = (price: number): string => `£${price.toFixed(2)}`;

const SkipRecap: React.FC<SkipRecapProps> = ({ selectedSkip, onDeselect, onProceed }) => {
    if (!selectedSkip) {
        return null;
    }

    const totalPrice = selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100);
    let details = `${selectedSkip.hire_period_days} days hire. `;
    details += selectedSkip.allows_heavy_waste ? 'Heavy waste ok. ' : 'Light waste only. ';
    details += !selectedSkip.allowed_on_road ? 'Permit may be needed.' : '';

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white shadow-lg border-t border-gray-700 p-4 z-50">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-3 sm:mb-0 text-center sm:text-left">
                    <span className="text-sm text-gray-400">Selected:</span>
                    <p className="text-lg font-semibold">{selectedSkip.size} Yard Skip</p>
                    <p className="text-xs text-gray-300">{details.trim()}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center">
                    <span className="text-2xl font-bold mb-3 sm:mb-0 sm:mr-6">{formatPrice(totalPrice)}</span>
                    <div className="flex space-x-3">
                        <button
                            onClick={onDeselect}
                            className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 text-sm cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faTimes} className="mr-1" /> Change
                        </button>
                        <button
                            onClick={onProceed}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300 flex items-center cursor-pointer"
                        >
                            Continue <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkipRecap;