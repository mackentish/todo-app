import { createFileRoute } from '@tanstack/react-router';
import { Text, ListView } from '../components';
import { useItems } from '../hooks';

export const Route = createFileRoute('/complete')({
    component: Complete,
});

function Complete() {
    const { getCompletedItems } = useItems();

    return (
        <div className="flex flex-col w-full gap-8">
            <div className="flex flex-col gap-2">
                <Text className="text-3xl font-bold">Complete</Text>
                <Text className="text-md text-grey-700 dark:text-gray-300">
                    Only see your completed tasks
                </Text>
            </div>
            <ListView items={getCompletedItems()} includeAddButton={false} />
        </div>
    );
}
