import { ListView } from './pages';
import { Button, Text } from './components';
import { useItems } from './hooks';

function App() {
    const { createItem, getAllItems } = useItems();

    const handleClick = () => {
        // TODO: Replace with a proper input mechanism
        createItem(`Item ${Math.floor(Math.random() * 1000)}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen dark:bg-gray-900 w-full p-4">
            <div className="flex flex-col gap-4 w-full max-w-3xl items-center mx-auto">
                <Text className="text-3xl font-bold mb-8">Todo App</Text>

                <Button onClick={handleClick}>Add Item</Button>
                <div className="max-h-96 overflow-y-auto mt-4">
                    <ListView items={getAllItems()} />
                </div>
            </div>
        </div>
    );
}

export default App;
