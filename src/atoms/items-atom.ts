import { atomWithStorage } from 'jotai/utils';
import type { Item } from '../models/item';

export const itemsAtom = atomWithStorage<Item[]>('items', []);
