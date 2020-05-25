import { ApolloServer, gql, ApolloError } from 'apollo-server-micro';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    debug: false,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
