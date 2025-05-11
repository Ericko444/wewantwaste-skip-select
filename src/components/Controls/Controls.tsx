import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faList, faChevronDown, faSortAmountDown, faUndoAlt, faFilter } from '@fortawesome/free-solid-svg-icons';
import type { ActiveFilters, LayoutView, SortOption } from '@/types';

interface ControlsProps {
    currentLayout: LayoutView;
    onLayoutChange: (layout: LayoutView) => void;
    currentSort: SortOption;
    onSortChange: (sortOption: SortOption) => void;
    activeFilters: ActiveFilters;
    onFilterChange: (filters: Partial<ActiveFilters>) => void;
    onResetControls?: () => void;
    areControlsActive?: boolean;
}

const Controls: React.FC<ControlsProps> = ({
    currentLayout,
    onLayoutChange,
    currentSort,
    onSortChange,
    activeFilters,
    onFilterChange,
    onResetControls,
    areControlsActive,
}) => {

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'default', label: 'Default Order' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'size-asc', label: 'Size: Small to Large' },
        { value: 'size-desc', label: 'Size: Large to Small' },
    ];

    const heavyWasteFilterOptions: { value: 'all' | true | false; label: string }[] = [
        { value: 'all', label: 'All Skips' },
        { value: true, label: 'Yes (Heavy Waste)' },
        { value: false, label: 'No (Light Waste Only)' },
    ];

    return (
        <section className="mb-6 md:mb-8 bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => onLayoutChange('grid')}
                            className={`p-2 rounded-md focus:outline-none ${currentLayout === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                            title="Grid View" aria-pressed={currentLayout === 'grid'}
                        >
                            <FontAwesomeIcon icon={faThLarge} />
                        </button>
                        <button
                            onClick={() => onLayoutChange('table')}
                            className={`p-2 rounded-md focus:outline-none ${currentLayout === 'table' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                            title="Table View" aria-pressed={currentLayout === 'table'}
                        >
                            <FontAwesomeIcon icon={faList} />
                        </button>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                            className="flex items-center space-x-1.5 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:border-gray-400 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={faSortAmountDown} className="text-blue-600 w-3.5" />
                            <span>Sort</span>
                            <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isSortDropdownOpen && (
                            <div
                                className="absolute z-20 mt-1 w-52 bg-white rounded-md shadow-lg border border-gray-200 py-1"
                                onClick={() => setIsSortDropdownOpen(false)}
                                onMouseLeave={() => setIsSortDropdownOpen(false)}
                            >
                                {sortOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => onSortChange(option.value)}
                                        className={`w-full text-left block px-3 py-1.5 text-sm hover:bg-gray-100 focus:outline-none ${currentSort === option.value ? 'font-semibold text-blue-600' : 'text-gray-700'}`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => { setIsFilterDropdownOpen(!isFilterDropdownOpen); setIsSortDropdownOpen(false); }}
                            className="flex items-center space-x-1.5 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:border-gray-400 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={faFilter} className="text-blue-600 w-3.5" />
                            <span>Filter</span>
                            <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isFilterDropdownOpen && (
                            <div
                                className="absolute z-20 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1"
                                onClick={() => setIsFilterDropdownOpen(false)}
                                onMouseLeave={() => setIsFilterDropdownOpen(false)}
                            >
                                <div className="px-3 py-2">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Waste Type</h4>
                                    {heavyWasteFilterOptions.map(option => (
                                        <button
                                            key={String(option.value)}
                                            onClick={() => onFilterChange({ allowsHeavyWaste: option.value })}
                                            className={`w-full text-left block px-2 py-1.5 text-sm rounded hover:bg-gray-100 focus:outline-none ${activeFilters.allowsHeavyWaste === option.value ? 'font-semibold text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {onResetControls && areControlsActive && (
                        <button
                            onClick={onResetControls}
                            className="flex items-center space-x-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm hover:border-gray-400 hover:text-blue-600 focus:outline-none"
                            title="Reset Sort & Search"
                        >
                            <FontAwesomeIcon icon={faUndoAlt} className="w-3.5" />
                            <span>Reset</span>
                        </button>
                    )}
                </div>

            </div>
        </section>
    );
};

export default Controls;