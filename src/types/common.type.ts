export type LayoutView = 'grid' | 'table';
export type SortOption = 'price-asc' | 'price-desc' | 'size-asc' | 'size-desc' | 'default';
export interface ActiveFilters {
    allowsHeavyWaste: 'all' | true | false;
}