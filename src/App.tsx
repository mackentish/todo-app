import { itemsAtom } from './atoms';
import { useAtom } from 'jotai';
import './App.css';

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
        <div className="flex flex-col gap-4 w-full justify-center">
            <button onClick={handleClick}>Add Item</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
