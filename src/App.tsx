import { itemsAtom } from './atoms';
import { useAtom } from 'jotai';
import { ListView } from './pages';
import { Button } from './components';

function App() {
    const [items, setItems] = useAtom(itemsAtom);

    const handleClick = () => {
        const newItem = {
            id: crypto.randomUUID(),
            name: `Item ${items.length + 1}`,
            completed: false,
        };
        setItems((prev) => [...prev, newItem]);
    };

    return (
        <div className="bg-gray-100 min-h-screen dark:bg-gray-900 flex flex-col gap-4 w-full justify-center items-center p-4">
            <Button onClick={handleClick}>Add Item</Button>
            <ListView />
        </div>
    );
}

export default App;
