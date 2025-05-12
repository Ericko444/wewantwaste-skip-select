export enum LayoutView {
    GRID = 'grid',
    TABLE = 'table',
}

export enum SortOption {
    DEFAULT = 'default',
    PRICE_ASC = 'price-asc',
    PRICE_DESC = 'price-desc',
    SIZE_ASC = 'size-asc',
    SIZE_DESC = 'size-desc',
}

export type TernaryBooleanFilter = 'all' | true | false;

export interface ActiveFilters {
    allowsHeavyWaste: TernaryBooleanFilter;
    allowedOnRoad: TernaryBooleanFilter;
}

export const DEFAULT_FILTERS: ActiveFilters = {
    allowsHeavyWaste: 'all',
    allowedOnRoad: 'all',
};