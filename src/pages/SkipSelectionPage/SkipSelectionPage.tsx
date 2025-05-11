import { fetchSkips } from "@/services";
import type { ActiveFilters, LayoutView, Skip, SortOption } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Controls, SkipCard, SkipRecap, SkipTableRow } from "@/components";

const defaultFilters: ActiveFilters = {
    allowsHeavyWaste: 'all',
    allowedOnRoad: 'all',
};

const SkipSelectionPage = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
    const [currentLayout, setCurrentLayout] = useState<LayoutView>('grid');
    const [currentSort, setCurrentSort] = useState<SortOption>('default');
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>(defaultFilters);

    const handleDeselectSkip = () => {
        setSelectedSkipId(null);
    };

    const handleProceed = () => {
        if (selectedSkipId) {
            const skip = skips.find(s => s.id === selectedSkipId);
            alert(`Proceeding with ${skip?.size} Yard Skip.`);
        } else {
            alert("Please select a skip first.");
        }
    };

    useEffect(() => {
        const loadSkips = async () => {
            try {
                const data = await fetchSkips();
                setSkips(data);
            }
            catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
            finally {
                setLoading(false);
            }
        };

        loadSkips();
    }, []);

    const handleSelectSkip = (id: number) => {
        setSelectedSkipId(prevId => (prevId === id ? null : id));
    };

    const handleFilterChange = (updatedFilter: Partial<ActiveFilters>) => {
        setActiveFilters(prevFilters => {
            const newFilters = { ...prevFilters, ...updatedFilter };
            if (newFilters.allowsHeavyWaste === undefined) newFilters.allowsHeavyWaste = 'all';
            if (newFilters.allowedOnRoad === undefined) newFilters.allowedOnRoad = 'all';
            return newFilters;
        });
    };

    const handleResetControls = () => {
        setCurrentSort('default');
        setActiveFilters(defaultFilters);
    };

    const processedSkips = useMemo(() => {
        let tempSkips = [...skips];


        // Sort skips by price or size based on the currentSort state
        // If currentSort is 'default', we don't need to sort
        if (currentSort !== 'default') {
            tempSkips.sort((a, b) => {
                const priceA = a.price_before_vat * (1 + a.vat / 100);
                const priceB = b.price_before_vat * (1 + b.vat / 100);
                switch (currentSort) {
                    case 'price-asc': return priceA - priceB;
                    case 'price-desc': return priceB - priceA;
                    case 'size-asc': return a.size - b.size;
                    case 'size-desc': return b.size - a.size;
                    default: return 0;
                }
            });
        }

        if (activeFilters.allowsHeavyWaste !== 'all') {
            tempSkips = tempSkips.filter(skip => skip.allows_heavy_waste === activeFilters.allowsHeavyWaste);
        }

        if (activeFilters.allowedOnRoad !== 'all') {
            const permitRequiredFilter = activeFilters.allowedOnRoad === true; // true if filtering for "Permit Likely Needed"
            tempSkips = tempSkips.filter(skip => !skip.allowed_on_road === permitRequiredFilter);
        }


        return tempSkips;
    }, [skips, currentSort, activeFilters]);

    const currentSelectedSkip = selectedSkipId ? skips.find(s => s.id === selectedSkipId) || null : null;

    const areControlsActive = currentSort !== 'default' || activeFilters.allowsHeavyWaste !== 'all';

    return (
        <>
            <div className="container mx-auto px-4 pb-8 sm:pb-12">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Choose Your Skip Size
                    </h1>
                    <p className="text-md sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Select the skip size that best suits your needs.
                    </p>
                </div>
            </div>
            <Controls
                currentLayout={currentLayout}
                onLayoutChange={setCurrentLayout}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                areControlsActive={areControlsActive}
                onResetControls={handleResetControls}
            />
            {loading && (
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-lg font-semibold">Loading skips...</div>
                </div>
            )}
            {error && (
                <div className="text-center py-8 text-red-600 font-semibold">
                    {error}
                </div>
            )}
            {!loading && !error && (
                <>
                    {currentLayout === 'grid' && (
                        <div id="skipGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-50 sm:pb-32">
                            {processedSkips.map(skip => (
                                <SkipCard
                                    key={skip.id}
                                    skip={skip}
                                    isSelected={selectedSkipId === skip.id}
                                    onSelect={handleSelectSkip}
                                />
                            ))}
                        </div>
                    )}

                    {currentLayout === 'table' && (
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
                                    {processedSkips.map(skip => (
                                        <SkipTableRow
                                            key={skip.id}
                                            skip={skip}
                                            isSelected={selectedSkipId === skip.id}
                                            onSelect={handleSelectSkip}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <SkipRecap
                        selectedSkip={currentSelectedSkip}
                        onDeselect={handleDeselectSkip}
                        onProceed={handleProceed}
                    />
                </>
            )}
        </>
    );
}

export default SkipSelectionPage;