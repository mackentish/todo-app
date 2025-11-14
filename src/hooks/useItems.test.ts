import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useItems } from './useItems';
import type { Item } from '../models/item';

describe('useItems', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        // Clear all mocks
        vi.clearAllMocks();
    });

    describe('getAllItems', () => {
        it('should return an empty array initially', () => {
            const { result } = renderHook(() => useItems());
            expect(result.current.getAllItems()).toEqual([]);
        });

        it('should return all items after creating some', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Test Item 1');
                result.current.createItem('Test Item 2');
            });

            const items = result.current.getAllItems();
            expect(items).toHaveLength(2);
            expect(items[0].name).toBe('Test Item 1');
            expect(items[1].name).toBe('Test Item 2');
        });
    });

    describe('getIncompleteItems', () => {
        it('should return only incomplete items', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Incomplete Item');
                result.current.createItem('Complete Item');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.toggleItemCompletion(items[1].id);
            });

            const incompleteItems = result.current.getIncompleteItems();
            expect(incompleteItems).toHaveLength(1);
            expect(incompleteItems[0].name).toBe('Incomplete Item');
            expect(incompleteItems[0].completed).toBe(false);
        });

        it('should return empty array when all items are completed', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Item 1');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.toggleItemCompletion(items[0].id);
            });

            expect(result.current.getIncompleteItems()).toEqual([]);
        });
    });

    describe('getCompletedItems', () => {
        it('should return only completed items', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Incomplete Item');
                result.current.createItem('Complete Item');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.toggleItemCompletion(items[1].id);
            });

            const completedItems = result.current.getCompletedItems();
            expect(completedItems).toHaveLength(1);
            expect(completedItems[0].name).toBe('Complete Item');
            expect(completedItems[0].completed).toBe(true);
        });

        it('should return empty array when no items are completed', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Item 1');
            });

            expect(result.current.getCompletedItems()).toEqual([]);
        });
    });

    describe('getItemById', () => {
        it('should return the correct item by id', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Test Item');
            });

            const items = result.current.getAllItems();
            const foundItem = result.current.getItemById(items[0].id);

            expect(foundItem).toBeDefined();
            expect(foundItem?.name).toBe('Test Item');
            expect(foundItem?.id).toBe(items[0].id);
        });

        it('should return undefined for non-existent id', () => {
            const { result } = renderHook(() => useItems());

            const foundItem = result.current.getItemById('non-existent-id');
            expect(foundItem).toBeUndefined();
        });
    });

    describe('createItem', () => {
        it('should create a new item with valid name', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Valid Item Name');
            });

            const items = result.current.getAllItems();
            expect(items).toHaveLength(1);
            expect(items[0].name).toBe('Valid Item Name');
            expect(items[0].completed).toBe(false);
            expect(items[0].id).toBeDefined();
        });

        it('should not create item with name less than 3 characters', () => {
            const { result } = renderHook(() => useItems());
            const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

            act(() => {
                result.current.createItem('ab');
            });

            expect(result.current.getAllItems()).toHaveLength(0);
            expect(alertSpy).toHaveBeenCalledWith('Item name must be at least 3 characters long.');
        });

        it('should not create item with name more than 100 characters', () => {
            const { result } = renderHook(() => useItems());
            const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
            const longName = 'a'.repeat(101);

            act(() => {
                result.current.createItem(longName);
            });

            expect(result.current.getAllItems()).toHaveLength(0);
            expect(alertSpy).toHaveBeenCalledWith(
                'Item name must be no more than 100 characters long.',
            );
        });

        it('should create item with exactly 3 characters', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('abc');
            });

            expect(result.current.getAllItems()).toHaveLength(1);
            expect(result.current.getAllItems()[0].name).toBe('abc');
        });

        it('should create item with exactly 100 characters', () => {
            const { result } = renderHook(() => useItems());
            const maxName = 'a'.repeat(100);

            act(() => {
                result.current.createItem(maxName);
            });

            expect(result.current.getAllItems()).toHaveLength(1);
            expect(result.current.getAllItems()[0].name).toBe(maxName);
        });

        it('should generate unique IDs for multiple items', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Item 1');
                result.current.createItem('Item 2');
                result.current.createItem('Item 3');
            });

            const items = result.current.getAllItems();
            const ids = items.map((item) => item.id);
            const uniqueIds = new Set(ids);

            expect(uniqueIds.size).toBe(3);
        });
    });

    describe('toggleItemCompletion', () => {
        it('should toggle item from incomplete to complete', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Test Item');
            });

            const items = result.current.getAllItems();
            expect(items[0].completed).toBe(false);

            act(() => {
                result.current.toggleItemCompletion(items[0].id);
            });

            const updatedItems = result.current.getAllItems();
            expect(updatedItems[0].completed).toBe(true);
        });

        it('should toggle item from complete to incomplete', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Test Item');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.toggleItemCompletion(items[0].id);
                result.current.toggleItemCompletion(items[0].id);
            });

            const updatedItems = result.current.getAllItems();
            expect(updatedItems[0].completed).toBe(false);
        });

        it('should only toggle the specified item', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Item 1');
                result.current.createItem('Item 2');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.toggleItemCompletion(items[0].id);
            });

            const updatedItems = result.current.getAllItems();
            expect(updatedItems[0].completed).toBe(true);
            expect(updatedItems[1].completed).toBe(false);
        });
    });

    describe('deleteItem', () => {
        it('should delete an item by id', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Item to Delete');
            });

            const items = result.current.getAllItems();
            expect(items).toHaveLength(1);

            act(() => {
                result.current.deleteItem(items[0].id);
            });

            expect(result.current.getAllItems()).toHaveLength(0);
        });

        it('should delete only the specified item', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Item 1');
                result.current.createItem('Item 2');
                result.current.createItem('Item 3');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.deleteItem(items[1].id);
            });

            const remainingItems = result.current.getAllItems();
            expect(remainingItems).toHaveLength(2);
            expect(remainingItems[0].name).toBe('Item 1');
            expect(remainingItems[1].name).toBe('Item 3');
        });

        it('should do nothing when deleting non-existent item', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Item 1');
            });

            act(() => {
                result.current.deleteItem('non-existent-id');
            });

            expect(result.current.getAllItems()).toHaveLength(1);
        });
    });

    describe('updateItemName', () => {
        it('should update item name with valid name', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Original Name');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.updateItemName(items[0].id, 'Updated Name');
            });

            const updatedItems = result.current.getAllItems();
            expect(updatedItems[0].name).toBe('Updated Name');
        });

        it('should not update item name with less than 3 characters', () => {
            const { result } = renderHook(() => useItems());
            const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

            act(() => {
                result.current.createItem('Original Name');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.updateItemName(items[0].id, 'ab');
            });

            const updatedItems = result.current.getAllItems();
            expect(updatedItems[0].name).toBe('Original Name');
            expect(alertSpy).toHaveBeenCalledWith('Item name must be at least 3 characters long.');
        });

        it('should not update item name with more than 100 characters', () => {
            const { result } = renderHook(() => useItems());
            const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
            const longName = 'a'.repeat(101);

            act(() => {
                result.current.createItem('Original Name');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.updateItemName(items[0].id, longName);
            });

            const updatedItems = result.current.getAllItems();
            expect(updatedItems[0].name).toBe('Original Name');
            expect(alertSpy).toHaveBeenCalledWith(
                'Item name must be no more than 100 characters long.',
            );
        });

        it('should update only the specified item', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Item 1');
                result.current.createItem('Item 2');
            });

            const items = result.current.getAllItems();

            act(() => {
                result.current.updateItemName(items[0].id, 'Updated Item 1');
            });

            const updatedItems = result.current.getAllItems();
            expect(updatedItems[0].name).toBe('Updated Item 1');
            expect(updatedItems[1].name).toBe('Item 2');
        });
    });

    describe('localStorage persistence', () => {
        it('should persist items to localStorage', () => {
            const { result } = renderHook(() => useItems());

            act(() => {
                result.current.createItem('Persistent Item');
            });

            const storedData = localStorage.getItem('items');
            expect(storedData).toBeDefined();
            expect(storedData).not.toBeNull();

            if (storedData) {
                const parsedData = JSON.parse(storedData) as Item[];
                expect(parsedData).toHaveLength(1);
                expect(parsedData[0].name).toBe('Persistent Item');
            }
        });

        it('should load items from localStorage on initialization', () => {
            const mockItems: Item[] = [
                { id: '1', name: 'Stored Item 1', completed: false },
                { id: '2', name: 'Stored Item 2', completed: true },
            ];

            localStorage.setItem('items', JSON.stringify(mockItems));

            const { result } = renderHook(() => useItems());

            const items = result.current.getAllItems();
            expect(items).toHaveLength(2);
            expect(items[0].name).toBe('Stored Item 1');
            expect(items[1].name).toBe('Stored Item 2');
            expect(items[1].completed).toBe(true);
        });
    });
});
