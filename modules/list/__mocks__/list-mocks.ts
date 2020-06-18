import {
    ListsDocument,
    List,
    ListItemsDocument,
    ListItem,
    ListsResult,
} from '../../../codegen/_graphql';
import { mockBuilder } from '../../../utils/mock-builder';

const buildList = mockBuilder<List>({
    id: 1,
    description: 'list',
    items: null,
    __typename: 'List',
});

const buildListItem = mockBuilder<ListItem>({
    id: 1,
    product: null,
    quantity: 1,
    __typename: 'ListItemProduct',
});

const buildListResult = mockBuilder<ListsResult>({
    result: [buildList()],
    total: 100,
    __typename: 'ListsResult',
});

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
