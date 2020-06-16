import { List } from '../../../../codegen/_graphql';
import { ListsResult } from '../../../../codegen/_resolvers';

type ListBase = Omit<List, 'items'>;

export let MOCK_LISTS: Omit<List, 'items'>[] = [
    {
        id: 0,
        description: 'Shopping List',
    },
    {
        id: 1,
        description: 'Chocolate',
    },
    {
        id: 2,
        description: 'Cookies',
    },
    {
        id: 3,
        description: 'Parties',
    },
    {
        id: 4,
        description: 'Weekly',
    },
    {
        id: 5,
        description: 'Fruit',
    },
    {
        id: 6,
        description: 'Vegetables',
    },
    {
        id: 7,
        description: 'Ice Cream',
    },
    {
        id: 8,
        description: 'More Chocolate',
    },
    {
        id: 9,
        description: 'Bread',
    },
    {
        id: 10,
        description: 'Cheese',
    },
];

export const listService = {
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
    },
    single(id: number): ListBase | null {
        return MOCK_LISTS.find((x) => x.id === id) || null;
    },
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
    },
};
