import { Resolvers } from '../../../codegen/_resolvers';
import { MOCK_LISTS } from './__mocks__/list-mocks';

export const resolvers: Resolvers = {
    Query: {
        simple: () => {
            console.log('[server] GraphQL server query: simple');
            return 'Welcome to the AH GraphQL workshop';
        },
        lists: (_, { start, size }) => {
            if (start < 0 || start > MOCK_LISTS.length) {
                return null;
            }

            return {
                result: MOCK_LISTS.slice(
                    start,
                    Math.min(start + (size || 5), MOCK_LISTS.length),
                ),
                total: MOCK_LISTS.length,
            };
        },
        list: () => {
            return {
                id: 1,
                description: 'Chocolate',
            };
        },
    },
    List: {
        items: (list) => [
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
        ],
    },
};
