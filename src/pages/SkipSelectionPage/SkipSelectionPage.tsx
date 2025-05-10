import { fetchSkips } from "@/services";
import type { Skip } from "@/types";
import { useEffect, useState } from "react";

const SkipSelectionPage = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
    return (<></>);
}

export default SkipSelectionPage;