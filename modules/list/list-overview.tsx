import React, { useState } from 'react';
import styled from 'styled-components';
import { useListsQuery, useListRenameMutation } from '../../codegen/_graphql';
import { ListItems } from './list-items';

const List = styled.div`
    padding: 8px;
    margin: 0 0 24px;
    border: 1px solid #eee;
`;

const Anchor = styled.a`
    text-decoration: underline;
    cursor: pointer;
    margin-left: 8px;
`;

const START_INITIAL = 0;
const PAGE_SIZE = 2;

export const ListOverview: React.FC = () => {
    const [start, setStart] = useState(START_INITIAL);
    const { loading, error, data, fetchMore } = useListsQuery({
        variables: {
            start: START_INITIAL,
            size: PAGE_SIZE,
        },
    });

    const [description, setDescription] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [rename] = useListRenameMutation();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {data?.lists?.result?.map((list) => (
                <List key={list.id}>
                    {selectedId !== list.id && list.description}
                    {selectedId === list.id && (
                        <>
                            <input
                                value={description}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setDescription(e.target.value);
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    rename({
                                        variables: {
                                            id: selectedId,
                                            description,
                                        },
                                    });
                                    setDescription('');
                                    setSelectedId(null);
                                }}
                            >
                                Save
                            </button>
                            <button onClick={() => setSelectedId(null)}>
                                Cancel
                            </button>
                        </>
                    )}
                    {selectedId !== list.id && (
                        <Anchor
                            onClick={() => {
                                setDescription(list.description);
                                setSelectedId(
                                    selectedId === list.id ? null : list.id,
                                );
                            }}
                        >
                            rename
                        </Anchor>
                    )}
                    <ListItems id={list.id} />
                </List>
            ))}

            <button
                onClick={() => {
                    const newStart = start + PAGE_SIZE;
                    if (data?.lists?.total && newStart < data.lists.total) {
                        fetchMore({
                            variables: {
                                start: newStart,
                                size: PAGE_SIZE,
                            },
                            updateQuery: (
                                previousResult,
                                { fetchMoreResult },
                            ) => {
                                if (!fetchMoreResult?.lists) {
                                    return previousResult;
                                }

                                return {
                                    ...previousResult,
                                    lists: {
                                        ...fetchMoreResult.lists,
                                        total: fetchMoreResult.lists.total,
                                        result: [
                                            ...(previousResult.lists?.result ||
                                                []),
                                            ...(fetchMoreResult.lists.result ||
                                                []),
                                        ],
                                    },
                                };
                            },
                        });
                        setStart(newStart);
                    }
                }}
            >
                Load More
            </button>
        </>
    );
};
