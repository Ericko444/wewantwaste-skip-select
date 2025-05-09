import type { Skip } from "@/types";

const API_URL = "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

export const fetchSkips = async (): Promise<Skip[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}