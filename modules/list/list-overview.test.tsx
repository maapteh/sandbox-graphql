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
        const { container } = render(
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
        await act(async () => await wait(0));

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
        await act(async () => await wait(0));

        expect(container).toMatchSnapshot();
    });
});
