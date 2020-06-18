## Chapter 12: Unit testing web app

> [Frontend, Test]  
> Continues from `chapter-11-solution`

`apollo` provides testing utilities to test our React components using GraphQL by using mocks.

For every generated hook a `Document` is generated. The document describes the query to perform and is used internally by `apollo-client`. We use this definition to generate a mock:

```ts
import { ListsDocument, List } from '../../../codegen/_graphql';

// mock representing a succesful operation
export const MOCK_MY_QUERY_FOUND = [
    {
        request: {
            query: MyQueryDocument,
            variables: {
                // we provide the variables
                id: 9001,
            },
        },
        result: {
            data: {
                myResult: {
                    result: [MOCK_RESULT_OBJECT],
                    total: 200,
                },
            },
        },
    },
];

// mock representing a failed operation
export const MOCK_MY_QUERY_NOT_FOUND = [
    {
        request: {
            query: MyQueryDocument,
            variables: {
                id: 9001,
            },
        },
        result: {
            data: {
                myResult: null,
            },
        },
    },
];

// mock representing an error state
export const MOCK_MY_QUERY_ERROR = [
    {
        request: {
            query: MyQueryDocument,
            variables: {
                id: 9001,
            },
        },
        result: {
            data: {
                myResult: null,
            },
        },
        error: new Error('big error'),
    },
];
```

> Important: Note that each mock is an array. This is because our page or component might have multiple queries. We have to define each one in the array.

> Important: The variables in your mocks, must also match the variables used in your components. Otherwise they will be skipped.

Then in our unit tests we can use these mocks together with the `MockProvider` provided by `apollo` and `react-testing-library`:

```tsx
import React from 'react';
import { MockedProvider, wait } from '@apollo/react-testing';
import { render, cleanup, act } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { fragmentMatcher } from '../../lib/fragment-matcher';

describe('my test', () => {
    afterEach(cleanup);

    it('renders component', async () => {
        const { container, findByTestId } = render(
            <MockedProvider
                mocks={MOCK_MY_QUERY_FOUND}
                addTypename
                cache={
                    new InMemoryCache({
                        addTypename: true,
                        fragmentMatcher,
                    })
                }
            >
                <MyComponentUsingGraphQL />
            </MockedProvider>,
        );

        await findByTestId('my-component');

        expect(...);
    });
});
```

The function `findByTestId` is required to actually see your component render properly. This is because when the component loads, your GraphQL state will be in the `loading` state. So if you had an if statement that checks for loading, that's what you snapshot will show.

We need to wait for the next re-render. The `react-testing-library` library doesn't do this for you, this is on purpose so developers can more explicitely test their use cases.

When we do `findByTestId`, we're actually telling `react-testing-library` to go ahead with any pending re-renders until it finds our testId, or it gives up.

Another way to do this is by using `wait`:

```ts
import { act } from '@testing-library/react';

// 1st render
await act(async () => await wait(0));

// 2nd re-render
expect(container).toMatchSnapshot();
```

Our tests are run automatically if you ran the application using `yarn dev`. You can also manually run the tests in watch mode

```sh
yarn test:client -- --watch
```

### Assignment 12.1: Implement a unit test

To complete this chapter implement a unit test on your component using mocks. Be sure to test the different cases your query might have: does it return an object,
or null? Does it throw an error?

An important part of using mocks is keeping them up to date. To do this we have to find a way to tie them to the GraphQL/TypeScript types. In this assignment, also try to find a way to type your mocks.

## Chapter 12 - Solution: Unit testing web app

Branch `chapter-12-solution`

### Assignment 12.1 - Solution: Implement a unit test

To keep our mocks strictly typed and up to date. We introduce a small mock builder utility function:

`utils/mock-builder.ts`

```ts
export type TBuilder<O> = (attrs?: Partial<O>) => O;

export const mockBuilder = <O extends {}>(defaults: O): TBuilder<O> => (
    attrs,
) => ({
    ...defaults,
    ...attrs,
});
```

If we make a mistake or our type changes in the future, we'll get immediate editor feedback and our project won't build any more.

So after that our mocks look like this:

`modules/list/__mocks__/list-mocks.ts`

```ts
export const MOCK_LISTS_FOUND = [
    {
        request: {
            query: ListsDocument,
            variables: {
                start: 0,
                size: 2,
            },
        },
        result: {
            data: {
                lists: buildListResult({
                    result: [
                        buildList({
                            id: 1,
                            description: 'list-1',
                            items: [
                                buildListItem({ id: 1, quantity: 1 }),
                                buildListItem({ id: 2, quantity: 2 }),
                            ],
                        }),
                        buildList({
                            id: 2,
                            description: 'list-2',
                            items: [
                                buildListItem({ id: 3, quantity: 3 }),
                                buildListItem({ id: 4, quantity: 4 }),
                            ],
                        }),
                    ],
                }),
            },
        },
    },
    {
        request: {
            query: ListItemsDocument,
            variables: {
                id: 1,
            },
        },
        result: {
            data: {
                list: buildList({
                    items: [buildListItem()],
                }),
            },
        },
    },
];

export const MOCK_LISTS_NOT_FOUND = [
    {
        request: {
            query: ListsDocument,
            variables: {
                start: 0,
                size: 2,
            },
        },
        result: {
            data: {
                lists: null,
            },
        },
    },
];

export const MOCK_LISTS_ERROR = [
    {
        request: {
            query: ListsDocument,
            variables: {
                start: 0,
                size: 2,
            },
        },
        result: {
            data: {
                lists: null,
            },
        },
        error: new Error('big error'),
    },
];
```

Before we test, we'll add some test ids to our components. These are attributes on our JSX elements with the name `data-testid`.

```ts
const myComponent: React.FC = () => {
    return <div data-testid="myComponent">some content</div>;
};
```

We can use these test ids in our tests to see whether these sections of our component are loaded correctly.

We test these 3 cases on our list-overview component:

`modules/lists/list-overview.test.tsx`

```tsx
import React from 'react';
import { MockedProvider, wait } from '@apollo/react-testing';
import { render, cleanup, act } from '@testing-library/react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { fragmentMatcher } from '../../lib/fragment-matcher';
import { ListOverview } from './list-overview';
import {
    MOCK_LISTS_FOUND,
    MOCK_LISTS_NOT_FOUND,
    MOCK_LISTS_ERROR,
} from './__mocks__/list-mocks';

describe('lists', () => {
    afterEach(cleanup);

    it('renders when we have data', async () => {
        const { container, findByTestId } = render(
            <MockedProvider
                mocks={MOCK_LISTS_FOUND}
                addTypename
                cache={
                    new InMemoryCache({
                        addTypename: true,
                        fragmentMatcher,
                    })
                }
            >
                <ListOverview />
            </MockedProvider>,
        );

        await findByTestId('list-1');

        expect(container).toMatchSnapshot();
    });

    it('shows blank without data', async () => {
        const { container } = render(
            <MockedProvider
                mocks={MOCK_LISTS_NOT_FOUND}
                addTypename
                cache={
                    new InMemoryCache({
                        addTypename: true,
                        fragmentMatcher,
                    })
                }
            >
                <ListOverview />
            </MockedProvider>,
        );

        await act(async () => await wait(0));

        expect(container).toMatchSnapshot();
    });

    it('shows error', async () => {
        const { container } = render(
            <MockedProvider
                mocks={MOCK_LISTS_ERROR}
                addTypename
                cache={
                    new InMemoryCache({
                        addTypename: true,
                        fragmentMatcher,
                    })
                }
            >
                <ListOverview />
            </MockedProvider>,
        );

        await findByTestId('error');

        expect(container).toMatchSnapshot();
    });
});
```
