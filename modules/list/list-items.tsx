import React from 'react';
import styled from 'styled-components';
import { useListItemsLazyQuery } from '../../codegen/_graphql';
import { isListItemRecipe } from './helpers/is-list-item-recipe';

const Container = styled.div`
    margin-top: 16px;
`;

const Item = styled.div`
    padding: 8px;
    margin: 24px;
    border: 1px solid #eee;
`;

export const ListItems: React.FC<{ id: number }> = ({ id }) => {
    const [loadItems, { data }] = useListItemsLazyQuery();

    return (
        <Container>
            <button
                onClick={() => {
                    loadItems({
                        variables: {
                            id,
                        },
                    });
                }}
            >
                Load Items
            </button>
            {data?.list?.items &&
                data.list.items.length > 0 &&
                data.list.items.map((item, index) => {
                    if (item.__typename === 'ListItemProduct') {
                        return (
                            <Item key={item.id || item.description || index}>
                                {item.quantity}x {item.description}
                            </Item>
                        );
                    }

                    if (isListItemRecipe(item)) {
                        return (
                            <Item key={item.id || item.title || index}>
                                {item.quantity}x {item.title}
                                <br />
                                {item.description}
                            </Item>
                        );
                    }

                    return null;
                })}
        </Container>
    );
};
