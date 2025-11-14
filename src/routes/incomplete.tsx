import { createFileRoute } from '@tanstack/react-router';
import { Text, ListView } from '../components';
import { useItems } from '../hooks';

export const Route = createFileRoute('/incomplete')({
    component: Incomplete,
});

function Incomplete() {
    const { getIncompleteItems } = useItems();

    return (
        <div className="flex flex-col w-full gap-8">
            <div className="flex flex-col gap-2">
                <Text className="text-3xl font-bold">Incomplete</Text>
                <Text className="text-md text-grey-700 dark:text-gray-300">
                    Only see your incomplete tasks
                </Text>
            </div>
            <ListView items={getIncompleteItems()} />
        </div>
    );
}
