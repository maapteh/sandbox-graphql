# Chapter 13 - Unit testing GraphQL

> [Backend, Test]

[#TODO: Update this list]

-   Error flow
-   Keeping mocks up to date
-   Unit test query including error and null states

To unit test GraphQL APIs we use mocks using utilities provided by `apollo`.

[#TODO: Update imports and test]

```ts
import { execute } from 'graphql/execution/execute';
import { schema } from ''

// note: you might have to mock services you're using inside the resolvers
jest.mock('path/to/my-service', () => {
    return {
        MyService: jest.fn().mockImplementation(() => {
            return MyServiceMock;
        }),
    };
});

describe('my-query', () => {
    it('performs query', () => {
        // we define a query on-the-fly and execute it against the implemented resolvers.
        const result = await execute({
            schema,
            {
                id: 9001
            },
            document: gql`
                query myQuery($id: Int!) {
                    myQuery(id: $id) {
                        id
                    }
                }
            `,
        });

        // perform assertions on the result
    });
});
```

## Assignment 13.1: Implement a unit test

To complete this chapter implement a unit test in the GraphQL API on a query or mutation.

# Chapter 13 - Solution

Branch `chapter-13-solution`

## Assignment 13.1 - Solution: Implement a unit test

For our lists query we implement a unit test to check whether our service is correctly called

[#TODO: Update imports and test]

```ts
import { execute } from 'graphql/execution/execute';
import { schema } from ''

const listServiceAll = jest.fn()

jest.mock('path/to/my-service', () => {
    return {
        ListService: jest.fn().mockImplementation(() => {
            return {
                all: listServiceAll
            };
        }),
    };
});

describe('lists query', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls list service', () => {
        const result = await execute({
            schema,
            {
                start: 0,
                size: 5
            },
            document: gql`
                query lists($start: Int!, size: Int) {
                    lists(start: $start, size: $size) {
                        result {
                            description
                        }
                    }
                }
            `,
        });

        expect(listServiceAll).toBeCalledWith([0, 5]);
        expect(result.lists).toBeDefined();
        expect(result.lists.length).toBeGreaterThan(0);
    });
});
```
