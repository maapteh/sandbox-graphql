## Chapter 12: Unit testing web app

> [Frontend, Test]

`apollo` provides testing utilities to test our React components using GraphQL by using mocks.

For every generated hook a `Document` is generated. The document describes the query to perform and is used internally by `apollo-client`. We use this definition to generate a mock:

```ts
import { MyQueryDocument } from '../../../../graphql/_generated-hooks';

// #TODO: typing?

// mock representing a succesful operation
export const MOCK_MY_QUERY_FOUND = {
    request: {
        query: MyQueryDocument,
        variables: {
            // we provide the variables
            id: 9001,
        },
    },
    result: {
        data: {
            myResult: MOCK_RESULT_OBJECT,
        },
    },
};

// mock representing a failed operation
export const MOCK_MY_QUERY_NOT_FOUND = {
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
};

// mock representing an error state
export const MOCK_MY_QUERY_ERROR = {
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
    error: {
        reason: 'big error',
    },
};
```

Then in our unit tests we can use these mocks together with the `MockProvider` provided by `apollo` and `react-testing-library`:

```tsx
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';

describe('my test', () => {
    it('renders component', () => {
        const { container } = render(
            // The mocks we add are returned in order:
            // The first element in the mocks on the first query
            // Second element in the mocks on the second query
            // etc.
            <MockedProvider mocks={[MOCK_MY_QUERY_FOUND]} addTypename>
                <MyComponentUsingGraphQL />
            </MockedProvider>,
        );
        expect(container); //.toSomething
    });
});
```

### Assignment 12.1: Implement a unit test

To complete this chapter implement a unit test on your component using mocks.

## Chapter 12 - Solution: Unit testing web app

Branch `chapter-12-solution`

### Assignment 12.1 - Solution: Implement a unit test

Our component runs a single query, and for now we'll just test that the snapshot matches:

[#TODO: Update imports and test]

`modules/lists/lists.test.tsx`

```tsx
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import { Lists } from '';
import { MOCK_LIST_QUERY_FOUND } from '';

describe('lists', () => {
    it('renders component', () => {
        const { container } = render(
            <MockedProvider mocks={[MOCK_LIST_QUERY_FOUND]} addTypename>
                <Lists />
            </MockedProvider>,
        );
        expect(container).toMatchSnapshot();
    });
});
```
