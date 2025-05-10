import { fetchSkips } from "@/services";
import type { Skip } from "@/types";
import { useEffect, useState } from "react";
import { SkipCard, SkipRecap } from "@/components";

const SkipSelectionPage = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);

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
                    <div id="skipGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-50 sm:pb-32">
                        {skips.map(skip => (
                            <SkipCard
                                key={skip.id}
                                skip={skip}
                                isSelected={selectedSkipId === skip.id}
                                onSelect={handleSelectSkip}
                            />
                        ))}
                    </div>
                    <SkipRecap
                        selectedSkip={skips.find(skip => skip.id === selectedSkipId) || null}
                        onDeselect={handleDeselectSkip}
                        onProceed={handleProceed}
                    />
                </>
            )}
        </>
    );
}

export default SkipSelectionPage;