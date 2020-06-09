import { QueryResolvers } from '../../../codegen/_graphql';

const query: QueryResolvers = {
    simple: () => {
        console.log('[server] GraphQL server query: simple');
        return 'Welcome to the AH GraphQL workshop';
    },
};

export const resolvers: any = {
    Query: query,
};
