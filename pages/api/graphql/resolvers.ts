import { QueryResolvers } from '../../../codegen/_graphql';
import { createListService } from './__mocks__/lists';

const listService = createListService();

const query: QueryResolvers = {
    simple: () => {
        console.log('[server] GraphQL server query: simple');
        return 'Welcome to the AH GraphQL workshop';
    },
    lists: () => listService.all(),
};

export const resolvers: any = {
    Query: query,
};
