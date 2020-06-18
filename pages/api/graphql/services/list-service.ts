import { List } from '../../../../codegen/_graphql';
import {
    ListsResult,
    ListItem,
    ListItemProduct,
} from '../../../../codegen/_resolvers';
import { MOCK_LISTS, MOCK_LIST_ITEMS } from '../__mocks__/list-mocks';

type ListBase = Omit<List, 'items'>;

export class ListService {
    all(start: number, size: number): ListsResult | null {
        if (start < 0 || start > MOCK_LISTS.length) {
            return null;
        }

        return {
            result: MOCK_LISTS.slice(
                start,
                Math.min(start + size, MOCK_LISTS.length),
            ),
            total: MOCK_LISTS.length,
        };
    }
    single(id: number): ListBase | null {
        return MOCK_LISTS.find((x) => x.id === id) || null;
    }
    patch(id: number, obj: Omit<ListBase, 'id'>) {
        const listIndex = MOCK_LISTS.findIndex((x) => x.id === id);

        if (!listIndex) {
            return false;
        }

        MOCK_LISTS.splice(listIndex, 1, {
            ...MOCK_LISTS[listIndex],
            ...obj,
        });

        return true;
    }
    items(id: number): ListItem[] | null {
        return MOCK_LIST_ITEMS[id] || null;
    }
    addProduct(listId: number, productId: number) {
        const list = MOCK_LISTS.find((x) => x.id === listId);

        if (!list) {
            return null;
        }

        const items = MOCK_LIST_ITEMS[listId];

        const alreadyInList = Boolean(items.find((x) => x.id === productId));

        if (alreadyInList) {
            return list;
        }

        MOCK_LIST_ITEMS[listId] = [
            ...items,
            {
                id: productId,
                quantity: 1,
            } as ListItemProduct,
        ];

        return list;
    }
    removeProduct(listId: number, productId: number) {
        const list = MOCK_LISTS.find((x) => x.id === listId);

        if (!list) {
            return null;
        }

        const items = MOCK_LIST_ITEMS[listId];

        const notInList = !items.find((x) => x.id === productId);

        if (notInList) {
            return list;
        }

        MOCK_LIST_ITEMS[listId] = items.filter((x) => x.id !== productId);

        return list;
    }
}
