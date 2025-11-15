import { ItemComponent, AddItem, Text } from '.';
import type { Item } from '../models';

interface ListViewProps {
    items: Item[];
    includeAddButton?: boolean;
}

export function ListView({ items, includeAddButton = true }: ListViewProps) {
    return (
        <div className="flex flex-col w-full gap-2">
            {items.length === 0 && (
                <Text className="self-center italic text-gray-500 dark:text-gray-400">
                    No items found
                </Text>
            )}
            {items.map((item) => (
                <ItemComponent item={item} />
            ))}
            {includeAddButton && <AddItem />}
        </div>
    );
}
