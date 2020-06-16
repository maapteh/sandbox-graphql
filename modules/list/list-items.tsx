import React from 'react';
import styled from 'styled-components';
import { useListItemsQuery } from '../../codegen/_graphql';

const Container = styled.div`
    padding: 8px;
    margin: 24px;
    border: 1px solid #eee;
`;

export const ListItems: React.FC<{ id: number }> = ({ id }) => {
    const { data } = useListItemsQuery({
        ssr: false,
        variables: {
            id,
        },
    });

    return (
        <>
            {data?.list?.items?.map((item) => {
                return (
                    <Container>
                        {item.quantity}x {item.description}
                    </Container>
                );
            })}
        </>
    );
};
