import { useState } from 'react';
import { Input, ItemComponent, ItemContainerClass, Text } from '.';
import { useItems } from '../hooks';
import type { Item } from '../models';
import { twMerge } from 'tailwind-merge';
import { HiOutlineCheck, HiOutlinePlus, HiOutlineX } from 'react-icons/hi';

interface ListViewProps {
    items: Item[];
    includeAddButton?: boolean;
}

export function ListView({ items, includeAddButton = true }: ListViewProps) {
    const { createItem } = useItems();

    const [isAddingItem, setIsAddingItem] = useState(false);
    const [newItemName, setNewItemName] = useState('');

    const handleAddItem = () => {
        createItem(newItemName);
        setNewItemName('');
        setIsAddingItem(false);
    };

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
            {includeAddButton && (
                <>
                    {isAddingItem ? (
                        <div className="flex flex-row w-full gap-4 items-center justify-between">
                            <Input
                                value={newItemName}
                                onChange={setNewItemName}
                                placeholder="Enter item name..."
                                onEnterPress={handleAddItem}
                                autoFocus // eslint-disable-line -- autoFocus is intentionally used here for better UX when user explicitly triggers an input action
                            />
                            <div className="flex flex-row gap-4">
                                <HiOutlineCheck
                                    className="cursor-pointer text-green-500 hover:text-green-700 transition-colors duration-200"
                                    onClick={() => handleAddItem()}
                                    fontSize={24}
                                />
                                <HiOutlineX
                                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    onClick={() => {
                                        setIsAddingItem(false);
                                        setNewItemName('');
                                    }}
                                    fontSize={24}
                                />
                            </div>
                        </div>
                    ) : (
                        <button
                            className={twMerge(
                                ItemContainerClass,
                                'justify-between',
                                'border-dashed cursor-pointer group',
                                'hover:border-gray-400 dark:hover:border-gray-500',
                                'transition-colors duration-200',
                            )}
                            onClick={() => setIsAddingItem(true)}
                        >
                            <Text
                                className={[
                                    'text-gray-400 dark:text-gray-700',
                                    'group-hover:text-gray-600 dark:group-hover:text-gray-400',
                                    'transition-colors duration-200',
                                ].join(' ')}
                            >
                                Add New Item
                            </Text>

                            <HiOutlinePlus
                                className={[
                                    'text-gray-400 dark:text-gray-700',
                                    'group-hover:text-gray-600 dark:group-hover:text-gray-400',
                                    'transition-colors duration-200',
                                ].join(' ')}
                                fontSize={20}
                            />
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
