import type { Item } from '../models/item';
import { useItems } from '../hooks';
import { Text } from './ui';
import { HiOutlineTrash } from 'react-icons/hi';

export function ItemComponent({ item }: { item: Item }) {
    const { toggleItemCompletion, deleteItem } = useItems();

    return (
        <div className="flex flex-row gap-4 items-center">
            <input
                className="w-4 h-4 rounded-lg cursor-pointer"
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItemCompletion(item.id)}
            />
            <Text className={item.completed ? 'line-through' : ''}>{item.name}</Text>
            <HiOutlineTrash
                className="cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200"
                onClick={() => deleteItem(item.id)}
            />
        </div>
    );
}
