import { useState } from 'react';
import type { Item } from '../models/item';
import { useItems } from '../hooks';
import { Text, Input } from './ui';
import { HiOutlineTrash, HiOutlinePencil, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';

export const ItemContainerClass = [
    'flex flex-row w-full gap-4 items-center',
    'rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2',
].join(' ');

export function ItemComponent({ item }: { item: Item }) {
    const { toggleItemCompletion, deleteItem, updateItemName } = useItems();

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(item.name);

    const saveChanges = () => {
        updateItemName(item.id, editedName);
        setIsEditing(false);
    };

    return (
        <div className={ItemContainerClass}>
            <div className="flex flex-row gap-4 items-center w-full">
                <input
                    className="w-4 h-4 rounded-lg cursor-pointer"
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleItemCompletion(item.id)}
                />
                {isEditing ? (
                    <Input
                        value={editedName}
                        onChange={setEditedName}
                        placeholder="Enter item name..."
                        onEnterPress={saveChanges}
                    />
                ) : (
                    <Text className={item.completed ? 'line-through' : ''}>{item.name}</Text>
                )}
            </div>

            <div className="flex flex-row gap-4">
                {isEditing ? (
                    <>
                        <HiOutlineCheck
                            className="cursor-pointer text-green-500 hover:text-green-700 transition-colors duration-200"
                            onClick={() => saveChanges()}
                            fontSize={24}
                        />
                        <HiOutlineX
                            className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            onClick={() => {
                                setIsEditing(false);
                                setEditedName(item.name);
                            }}
                            fontSize={24}
                        />
                    </>
                ) : (
                    <>
                        <HiOutlinePencil
                            className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200"
                            onClick={() => setIsEditing(true)}
                            fontSize={24}
                        />
                        <HiOutlineTrash
                            className="cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200"
                            onClick={() => deleteItem(item.id)}
                            fontSize={24}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
