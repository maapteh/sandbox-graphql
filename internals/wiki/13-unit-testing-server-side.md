# Chapter 13 - Unit testing GraphQL

> [Backend, Test]  
> Continues from branch `chapter-12-solution`

> Note this chapter starts at the branch `chapter-13` because we have to make a few changes before we can implement our test: Jest mocks don't work well with plain objects, so we moved the list-service to it's own file under `pages/api/graphql/services/list-service.ts`

In this chapter we're going to write unit test for our queries on the API side.

To unit test GraphQL APIs we use mocks using utilities provided by `apollo`, and the `jest` library.

We can write tests for our queries by using the `execute` function from `graphql`. The most basic test looks like this:

```ts
import gql from 'graphql-tag';
import { execute } from 'graphql/execution/execute';
import { makeExecutableSchema } from 'apollo-server-micro';
import { typeDefs } from '../schema';
import { resolvers } from '../resolvers';
import { ServiceUsedByResolver } from '../service-used-by-resolver';
jest.mock('../service-used-by-resolver');

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
                search: 1,
            },
            document: gql`
                query myQuery($search: String!) {
                    myQuery(search: $search) {
                        id
                    }
                }
            `,
        });

        const mockCall = (ServiceUsedByResolver as any).mock.instances[0].single
            .mock.calls[0];
        expect(mockCall).toEqual([1]);
    });
});
```

## Assignment 13.1: Implement a unit test

Modify the example above and implement a unit test on your own queries or mutations.

# Chapter 13 - Solution

Branch `chapter-13-solution`

## Assignment 13.1 - Solution: Implement a unit test

For our lists query we implement a unit test to check whether our service is correctly called

`pages/api/graphql/test/list.query.test.ts`

```ts
import gql from 'graphql-tag';
import { execute } from 'graphql/execution/execute';
import { makeExecutableSchema } from 'apollo-server-micro';
import { typeDefs } from '../schema';
import { resolvers } from '../resolvers';
import { ListService } from '../list-service';
jest.mock('../list-service');

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
```
