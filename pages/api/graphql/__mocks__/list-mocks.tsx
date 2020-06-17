import { List } from '../../../../codegen/_graphql';
import { ListsResult, ListItem } from '../../../../codegen/_resolvers';

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

const MOCK_ITEMS_GENERIC: ListItem[] = [
    {
        id: 1,
        description: 'Cheese',
        quantity: 2,
    },
    {
        id: 2,
        description: 'Milk',
        quantity: 1,
    },
];

export let MOCK_LIST_ITEMS: Record<number, ListItem[]> = {
    0: [
        {
            id: 1,
            description: 'Cheese',
            quantity: 2,
        },
        {
            id: 2,
            description: 'Milk',
            quantity: 1,
        },
        {
            id: 3,
            title: 'Jerk Chicken',
            description: 'The best jerk chicken recipe in the world',
            quantity: 12,
        },
    ],
    1: [...MOCK_ITEMS_GENERIC],
    2: [...MOCK_ITEMS_GENERIC],
    3: [...MOCK_ITEMS_GENERIC],
    4: [...MOCK_ITEMS_GENERIC],
    5: [...MOCK_ITEMS_GENERIC],
    6: [...MOCK_ITEMS_GENERIC],
    7: [...MOCK_ITEMS_GENERIC],
    8: [...MOCK_ITEMS_GENERIC],
    9: [...MOCK_ITEMS_GENERIC],
    10: [...MOCK_ITEMS_GENERIC],
};

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
    items(id: number): ListItem[] | null {
        return MOCK_LIST_ITEMS[id] || null;
    },
};
