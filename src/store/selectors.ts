import type { AppStoreState } from './useAppStore';

// Keep Zustand selectors limited to stable store references.
// Derived arrays and summary objects should be created inside component-level useMemo.
export const selectMembers = (state: AppStoreState) => state.members;

export const selectShoppingItems = (state: AppStoreState) => state.shoppingItems;

export const selectInventoryItems = (state: AppStoreState) => state.inventoryItems;

export const selectCustomLists = (state: AppStoreState) => state.customLists;

export const selectTasks = (state: AppStoreState) => state.tasks;
