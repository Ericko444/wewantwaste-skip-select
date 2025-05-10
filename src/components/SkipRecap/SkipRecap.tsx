import type { Skip } from "@/types";
import type React from "react";

interface SkipRecapProps {
    selectedSkip: Skip | null;
}

const formatPrice = (price: number): string => `£${price.toFixed(2)}`;

const SkipRecap: React.FC<SkipRecapProps> = ({ selectedSkip }) => {
    if (!selectedSkip) {
        return null;
    }

    const totalPrice = selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-3 shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <span className="text-sm text-gray-400">Selected: </span>
                    <span className="font-semibold">{selectedSkip.size} Yard Skip</span>
                    <span className="ml-2 text-lg font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default SkipRecap;