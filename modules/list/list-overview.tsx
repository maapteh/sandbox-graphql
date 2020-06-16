import React from 'react';
import styled from 'styled-components';
// we're importing a generated React hook
// the hook is actually a wrapper around the useQuery hook in `apollo-client`
import { useListsQuery } from '../../codegen/_graphql';

// create a simple box to show our data in using styled components
const List = styled.div`
    padding: 8px;
    margin: 0 0 24px;
    border: 1px solid #eee;
`;

export const ListOverview: React.FC = () => {
    // the hook performs the call to the graphql server
    // and gives us state variables that we can use in our app
    const { loading, error, data } = useListsQuery();

    // we can decide what to show based on the state
    if (loading) {
        return <p>Loading...</p>;
    }

    // on error
    if (error) {
        return <p>Error: {error}</p>;
    }

    // when we don't have data
    if (!data || !data.lists) {
        return <p>Erorr: Unknown</p>;
    }

    // we have data, not loading, and no errors
    return (
        <>
            {data.lists.map((list) => (
                <List key={list.id}>{list.description}</List>
            ))}
        </>
    );
};
