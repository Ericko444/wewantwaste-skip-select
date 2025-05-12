import { fetchSkips } from "@/services";
import { DEFAULT_FILTERS, LayoutView, SortOption, type ActiveFilters, type Skip } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controls, SkipList, SkipRecap } from "@/components";

const defaultFilters: ActiveFilters = {
    allowsHeavyWaste: 'all',
    allowedOnRoad: 'all',
};

const SkipSelectionPage = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
    const [currentLayout, setCurrentLayout] = useState<LayoutView>(LayoutView.GRID);
    const [currentSort, setCurrentSort] = useState<SortOption>(SortOption.DEFAULT);
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>(DEFAULT_FILTERS);

    const handleDeselectSkip = useCallback(() => {
        setSelectedSkipId(null);
    }, []);

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

    const handleSelectSkip = useCallback((id: number) => {
        setSelectedSkipId(prevId => (prevId === id ? null : id));
    }, []);

    const handleFilterChange = useCallback((updatedFilter: Partial<ActiveFilters>) => {
        setActiveFilters(prevFilters => {
            const newFilters = { ...prevFilters, ...updatedFilter };
            if (newFilters.allowsHeavyWaste === undefined) newFilters.allowsHeavyWaste = 'all';
            if (newFilters.allowedOnRoad === undefined) newFilters.allowedOnRoad = 'all';
            return newFilters;
        });
    }, []);

    const handleResetControls = useCallback(() => {
        setCurrentSort(SortOption.DEFAULT);
        setActiveFilters(DEFAULT_FILTERS);
    }, []);

    const processedSkips = useMemo(() => {
        let tempSkips = [...skips];


        // Sort skips by price or size based on the currentSort state
        // If currentSort is 'default', we don't need to sort
        if (currentSort !== 'default') {
            tempSkips.sort((a, b) => {
                const priceA = a.price_before_vat * (1 + a.vat / 100);
                const priceB = b.price_before_vat * (1 + b.vat / 100);
                switch (currentSort) {
                    case SortOption.PRICE_ASC: return priceA - priceB;
                    case SortOption.PRICE_DESC: return priceB - priceA;
                    case SortOption.SIZE_ASC: return a.size - b.size;
                    case SortOption.SIZE_DESC: return b.size - a.size;
                    default: return 0;
                }
            });
        }

        if (activeFilters.allowsHeavyWaste !== 'all') {
            tempSkips = tempSkips.filter(skip => skip.allows_heavy_waste === activeFilters.allowsHeavyWaste);
        }

        if (activeFilters.allowedOnRoad !== 'all') {
            const permitRequiredFilter = activeFilters.allowedOnRoad === true; // true if filtering for "Permit Needed"
            tempSkips = tempSkips.filter(skip => !skip.allowed_on_road === permitRequiredFilter);
        }


        return tempSkips;
    }, [skips, currentSort, activeFilters]);

    const currentSelectedSkip = selectedSkipId ? skips.find(s => s.id === selectedSkipId) || null : null;

    const areControlsActive = currentSort !== SortOption.DEFAULT || activeFilters.allowsHeavyWaste !== 'all';

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
                    <SkipList
                        skips={processedSkips}
                        layout={currentLayout}
                        selectedSkipId={selectedSkipId}
                        onSelectSkip={handleSelectSkip}
                        noResultsInfo={{
                            areControlsActive: areControlsActive,
                            onResetControls: areControlsActive ? handleResetControls : undefined
                        }}
                    />

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