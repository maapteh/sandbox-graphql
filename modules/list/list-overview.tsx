import React, { useState } from 'react';
import { useListsQuery } from '../../codegen/_graphql';
import { List } from './list';

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p data-testid="error">Error {JSON.stringify(error)}</p>;
    }

    return (
        <>
            {data?.lists?.result?.map(({ description, id }) => (
                <List
                    key={id || description}
                    id={id}
                    description={description}
                    testId={`list-${id}`}
                />
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
