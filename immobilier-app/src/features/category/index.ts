// Barrel export for category feature
export { default as CategoriesPage } from './CategoriesPage';
export * from './api';
export * from './components';
export * from './types';
export * from './hooks';
export * from './utils';

// Re-export main types for convenience
export type { FilterState, FilterActions, URLFilters } from './types/filters';
