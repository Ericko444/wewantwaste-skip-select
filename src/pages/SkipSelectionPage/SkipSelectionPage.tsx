import { fetchSkips } from "@/services";
import type { Skip } from "@/types";
import { useEffect, useState } from "react";
import { SkipCard } from "@/components";

const SkipSelectionPage = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);

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
            {loading && (
                <div className="text-center py-8 text-lg font-semibold">
                    Loading skips...
                </div>
            )}
            {error && (
                <div className="text-center py-8 text-red-600 font-semibold">
                    {error}
                </div>
            )}
            {!loading && !error && (
                <div id="skipGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {skips.map(skip => (
                        <SkipCard
                            key={skip.id}
                            skip={skip}
                            isSelected={selectedSkipId === skip.id}
                            onSelect={handleSelectSkip}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default SkipSelectionPage;