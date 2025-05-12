import type { LayoutView, Skip } from "@/types";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SkipCard, SkipTableRow } from "@/components";
import React from "react";

interface SkipList {
    skips: Skip[];
    layout: LayoutView;
    selectedSkipId: number | null;
    onSelectSkip: (id: number) => void;
    noResultsInfo?: {
        areControlsActive: boolean;
        onResetControls?: () => void;
    };
}

const SkipDisplayList: React.FC<SkipList> = ({
    skips,
    layout,
    selectedSkipId,
    onSelectSkip,
    noResultsInfo
}) => {
    if (skips.length === 0) {
        if (noResultsInfo) {
            return (
                <div id="noResults" className="text-center py-12">
                    <FontAwesomeIcon icon={faBoxOpen} className="text-gray-300 text-5xl mb-4" />
                    <h3 className="text-xl font-medium text-gray-700">
                        {noResultsInfo.areControlsActive ? 'No skips match your criteria' : 'No skips currently available'}
                    </h3>
                    {noResultsInfo.areControlsActive && (
                        <p className="text-gray-500 mt-2">Try adjusting your sort, filter, or search term.</p>
                    )}
                    {noResultsInfo.areControlsActive && noResultsInfo.onResetControls && (
                        <button onClick={noResultsInfo.onResetControls}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Reset All
                        </button>
                    )}
                </div>
            );
        }
        return null;
    }

    if (layout === 'grid') {
        return (
            <div id="skipGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-15">
                {skips.map(skip => (
                    <SkipCard
                        key={skip.id}
                        skip={skip}
                        isSelected={selectedSkipId === skip.id}
                        onSelect={onSelectSkip}
                    />
                ))}
            </div>
        );
    }

    if (layout === 'table') {
        return (
            <div className="mb-12 bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permit Note</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (inc. VAT)</th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {skips.map(skip => (
                            <SkipTableRow
                                key={skip.id}
                                skip={skip}
                                isSelected={selectedSkipId === skip.id}
                                onSelect={onSelectSkip}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return null;
};

export default SkipDisplayList;