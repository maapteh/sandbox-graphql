import { Resolvers } from '../../../codegen/_resolvers';

export const resolvers: Resolvers = {
    Query: {
        simple: () => {
            console.log('[server] GraphQL server query: simple');
            return 'Welcome to the AH GraphQL workshop';
        },
        lists: () => [
            {
                id: 0,
                description: 'Shopping List',
            },
            {
                id: 1,
                description: 'Chocolate',
            },
        ],
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
