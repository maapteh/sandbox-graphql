import { List } from '../../../../codegen/_graphql';

export const MOCK_LISTS: List[] = [
    {
        id: 0,
        description: 'Shopping Cart',
    },
    {
        id: 1,
        description: 'Weekly Shopping',
    },
    {
        id: 2,
        description: 'Parties',
    },
    {
        id: 3,
        description: 'Chocolate',
    },
];

export const createListService = () => {
    const data = [...MOCK_LISTS];

    return {
        all: () => data,
    };
};
