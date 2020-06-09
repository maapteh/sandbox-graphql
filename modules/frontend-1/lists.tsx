import React from 'react';
import styled from 'styled-components';
import { useListsQuery } from '../../codegen/_graphql';

const List = styled.div`
    padding: 8px;
    margin: 0 0 24px;
    border: 1px solid #eee;
`;

export const Lists: React.FC = () => {
    const { loading, error, data } = useListsQuery();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!data || !data.lists) {
        return <p>Erorr: Unknown</p>;
    }

    return (
        <>
            {data.lists.map((list) => (
                <List key={list.id}>{list.description}</List>
            ))}
        </>
    );
};
