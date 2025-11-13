import { atomWithStorage } from 'jotai/utils';
import { useAtom } from 'jotai';
import type { Item } from '../models/item';

const itemsAtom = atomWithStorage<Item[]>('items', []);

export function useItems() {
    const [items, setItems] = useAtom(itemsAtom);

    const getAllItems = () => items;

    const getCompletedItems = () => items.filter((item) => item.completed);

    const getItemById = (id: string) => items.find((item) => item.id === id);

    const createItem = (name: string) => {
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

    return {
        getAllItems,
        getCompletedItems,
        getItemById,
        createItem,
        toggleItemCompletion,
        deleteItem,
    };
}
