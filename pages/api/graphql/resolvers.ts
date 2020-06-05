import { Resolvers } from '../../../codegen/_graphql';

export const resolvers: Resolvers = {
    Query: {
        simple: () => {
            console.log('[server] GraphQL server query: sample');
            return 'Welcome at the AH GraphQL workshop';
        },
    },
};
