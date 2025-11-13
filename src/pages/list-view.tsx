import { ItemComponent } from '../components';
import type { Item } from '../models';

interface ListViewProps {
    items: Item[];
}

export function ListView({ items }: ListViewProps) {
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
