import { ListView } from './pages';
import { Text } from './components';
import { useItems } from './hooks';

function App() {
    const { getAllItems } = useItems();

    return (
        <div className="bg-gray-100 dark:bg-gray-900 w-full h-screen overflow-y-auto p-4">
            <div className="flex flex-col w-full max-w-3xl items-center mx-auto">
                <div className="flex flex-col gap-4 mb-8 w-full">
                    <Text className="text-3xl font-bold">Todo App</Text>
                    <Text className="text-md text-grey-700 dark:text-gray-300">
                        Manage your tasks efficiently and stay organized!
                    </Text>
                </div>
                <ListView items={getAllItems()} />
            </div>
        </div>
    );
}

export default App;
