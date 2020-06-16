import { Resolvers } from '../../../codegen/_resolvers';
import { listService } from './__mocks__/list-mocks';

export const resolvers: Resolvers = {
    Query: {
        simple: () => {
            console.log('[server] GraphQL server query: simple');
            return 'Welcome to the AH GraphQL workshop';
        },
        lists: (_, { start, size }) => {
            return listService.all(start, size || 5);
        },
        list: (_, { id }) => {
            return listService.single(id);
        },
    },
    Mutation: {
        listRename: (_, { id, description }) => {
            return listService.patch(id, { description })
                ? listService.single(id)
                : null;
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
