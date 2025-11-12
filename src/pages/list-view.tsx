import { ItemComponent } from '../components';
import { itemsAtom } from '../atoms';
import { useAtom } from 'jotai';

export function ListView() {
    const [items] = useAtom(itemsAtom);

    return (
        <ol>
            {items.map((item) => (
                <li key={item.id}>
                    <ItemComponent item={item} />
                </li>
            ))}
        </ol>
    );
}
