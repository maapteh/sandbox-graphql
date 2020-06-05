import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
// import { renderHook } from '@testing-library/react-hooks';
// import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

// all queries we want in our app are auto generated as documents
import { SimpleDocument } from '../../codegen/_graphql';
// component we want to test
import { Simple } from './simple';

/**
 * Mocks with array of ordering of queries/mutations it expects
 * If you use variables make sure they match excactly, also the mocked provider
 * set addTypename to false when you are not recording real data but just
 * use own created mock.
 */
const mocks = [
    {
        request: {
            query: SimpleDocument,
        },
        result: {
            data: {
                simple: 'foo',
            },
        },
    },
];

describe('Simple', () => {
    it('renders correctly', async () => {
        const { findByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Simple />
            </MockedProvider>,
        );

        // See reference https://testing-library.com/docs/react-testing-library/cheatsheet#queries
        // super simple test that we expect data to be in the container
        await findByText(/foo/);
    });
});
