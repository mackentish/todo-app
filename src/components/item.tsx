import type { Item } from '../models/item';
import { useAtom } from 'jotai';
import { itemsAtom } from '../atoms/items-atom';
import { Text } from './ui';

export function ItemComponent({ item }: { item: Item }) {
    const [, setItems] = useAtom(itemsAtom);

    const toggleCompletion = () => {
        // Update the item's completion status in the global state
        setItems((prevItems) =>
            prevItems.map((it) => (it.id === item.id ? { ...it, completed: !it.completed } : it)),
        );
    };

    return (
        <div className="flex flex-row gap-4 items-center">
            <input
                className="w-4 h-4 rounded-lg cursor-pointer"
                type="checkbox"
                checked={item.completed}
                onChange={toggleCompletion}
            />
            <Text className={item.completed ? 'line-through' : ''}>{item.name}</Text>
        </div>
    );
}
