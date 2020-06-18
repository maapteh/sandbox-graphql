import gql from 'graphql-tag';
import { execute } from 'graphql/execution/execute';
import { makeExecutableSchema } from 'apollo-server-micro';
import { typeDefs } from '../schema';
import { resolvers } from '../resolvers';
import { ListService } from '../services/list-service';
jest.mock('../services/list-service');

describe('list query', () => {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: {
            Query: resolvers.Query as any,
        },
    });

    it('calls list service', () => {
        execute({
            schema,
            variableValues: {
                id: 1,
            },
            document: gql`
                query list($id: Int!) {
                    list(id: $id) {
                        id
                    }
                }
            `,
        });

        const mockCall = (ListService as any).mock.instances[0].single.mock
            .calls[0];
        expect(mockCall).toEqual([1]);
    });
});
