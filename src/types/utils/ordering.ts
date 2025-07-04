/**
 * Fractional ordering utilities
 * Enables inserting exercises without reindexing
 */

// Type for items with order
export interface OrderedItem {
  readonly exercise_order: number;
}

// Ordering helper functions
export const orderingHelpers = {
  /**
   * Get order value for appending at the end
   */
  getOrderForAppend: (items: ReadonlyArray<OrderedItem>): number => {
    if (items.length === 0) {
      return 1.0;
    }
    const maxOrder = Math.max(...items.map(item => item.exercise_order));
    return Math.floor(maxOrder) + 1.0;
  },

  /**
   * Get order value for inserting between two items
   */
  getOrderBetween: (before: number, after: number): number => {
    return (before + after) / 2;
  },

  /**
   * Get order value for prepending at the start
   */
  getOrderForPrepend: (items: ReadonlyArray<OrderedItem>): number => {
    if (items.length === 0) {
      return 1.0;
    }
    const minOrder = Math.min(...items.map(item => item.exercise_order));
    return minOrder / 2;
  },

  /**
   * Get order value for inserting at a specific index
   */
  getOrderAtIndex: (items: ReadonlyArray<OrderedItem>, index: number): number => {
    if (index <= 0) {
      return orderingHelpers.getOrderForPrepend(items);
    }
    if (index >= items.length) {
      return orderingHelpers.getOrderForAppend(items);
    }

    const sorted = [...items].sort((a, b) => a.exercise_order - b.exercise_order);
    const before = sorted[index - 1]!.exercise_order;
    const after = sorted[index]!.exercise_order;
    return orderingHelpers.getOrderBetween(before, after);
  },

  /**
   * Check if reordering is needed (orders too close)
   */
  needsReorder: (items: ReadonlyArray<OrderedItem>, threshold = 0.0001): boolean => {
    const sorted = [...items].sort((a, b) => a.exercise_order - b.exercise_order);

    for (let i = 1; i < sorted.length; i++) {
      const diff = sorted[i]!.exercise_order - sorted[i - 1]!.exercise_order;
      if (diff < threshold) {
        return true;
      }
    }

    return false;
  },

  /**
   * Reorder items with nice spacing
   */
  redistributeOrders: (
    items: ReadonlyArray<OrderedItem>,
  ): ReadonlyArray<{
    id: string;
    new_order: number;
  }> => {
    const sorted = [...items].sort((a, b) => a.exercise_order - b.exercise_order);
    const results: Array<{ id: string; new_order: number }> = [];

    sorted.forEach((item, index) => {
      // Assumes items have an 'id' field - adjust as needed
      results.push({
        id: (item as any).id,
        new_order: (index + 1) * 1.0,
      });
    });

    return results;
  },

  /**
   * Move item to new position
   */
  getMoveToIndexOrder: (
    items: ReadonlyArray<OrderedItem>,
    fromIndex: number,
    toIndex: number,
  ): number => {
    if (fromIndex === toIndex) {
      return items[fromIndex]!.exercise_order;
    }

    const sorted = [...items].sort((a, b) => a.exercise_order - b.exercise_order);
    const filtered = sorted.filter((_, idx) => idx !== fromIndex);

    if (toIndex === 0) {
      return orderingHelpers.getOrderForPrepend(filtered);
    }

    if (toIndex >= filtered.length) {
      return orderingHelpers.getOrderForAppend(filtered);
    }

    if (toIndex < fromIndex) {
      // Moving up
      const after = filtered[toIndex]!.exercise_order;
      const before = toIndex > 0 ? filtered[toIndex - 1]!.exercise_order : 0;
      return orderingHelpers.getOrderBetween(before, after);
    } else {
      // Moving down
      const before = filtered[toIndex - 1]!.exercise_order;
      const after = filtered[toIndex]?.exercise_order ?? before + 1;
      return orderingHelpers.getOrderBetween(before, after);
    }
  },
};

// Type guard
export const hasOrder = (item: unknown): item is OrderedItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'exercise_order' in item &&
    typeof (item as OrderedItem).exercise_order === 'number'
  );
};

// Sort helper
export const sortByOrder = <T extends OrderedItem>(items: ReadonlyArray<T>): T[] => {
  return [...items].sort((a, b) => a.exercise_order - b.exercise_order);
};
