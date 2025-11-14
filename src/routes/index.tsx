import { createFileRoute } from '@tanstack/react-router';
import { Text, ListView } from '../components';
import { useItems } from '../hooks';

export const Route = createFileRoute('/')({
    component: Home,
});

function Home() {
    const { getAllItems } = useItems();

    return (
        <div className="flex flex-col w-full gap-8">
            <div className="flex flex-col gap-2">
                <Text className="text-3xl font-bold">Home</Text>
                <Text className="text-md text-grey-700 dark:text-gray-300">
                    See all your tasks in one place
                </Text>
            </div>
            <ListView items={getAllItems()} />
        </div>
    );
}
