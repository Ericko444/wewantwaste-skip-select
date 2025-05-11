import type { Skip } from "@/types";
import { API_URL } from "@/lib/config";

export const fetchSkips = async (): Promise<Skip[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}