import { atomWithStorage } from 'jotai/utils';
import { useAtom } from 'jotai';
import type { Item } from '../models/item';

const itemsAtom = atomWithStorage<Item[]>('items', []);

export function useItems() {
    const [items, setItems] = useAtom(itemsAtom);

    const getAllItems = () => items;

    const getIncompleteItems = () => items.filter((item) => !item.completed);

    const getCompletedItems = () => items.filter((item) => item.completed);

    const getItemById = (id: string) => items.find((item) => item.id === id);

    const createItem = (name: string) => {
        if (name.length < 3) {
            alert('Item name must be at least 3 characters long.');
            return;
        } else if (name.length > 100) {
            alert('Item name must be no more than 100 characters long.');
            return;
        }
        const newItem = {
            id: crypto.randomUUID(),
            name,
            completed: false,
        };
        setItems((prev) => [...prev, newItem]);
    };

    const toggleItemCompletion = (id: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item,
            ),
        );
    };

    const deleteItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateItemName = (id: string, newName: string) => {
        if (newName.length < 3) {
            alert('Item name must be at least 3 characters long.');
            return;
        } else if (newName.length > 100) {
            alert('Item name must be no more than 100 characters long.');
            return;
        }
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, name: newName } : item)),
        );
    };

    return {
        getAllItems,
        getIncompleteItems,
        getCompletedItems,
        getItemById,
        createItem,
        toggleItemCompletion,
        deleteItem,
        updateItemName,
    };
}
