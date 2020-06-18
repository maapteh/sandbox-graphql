import React from 'react';
import styled from 'styled-components';
import { useListItemsQuery } from '../../codegen/_graphql';
import { isListItemRecipe } from './helpers/is-list-item-recipe';
import { isListItemProduct } from './helpers/is-list-item-product';

const Container = styled.div`
    margin-top: 16px;
`;

const Item = styled.div`
    padding: 8px;
    margin: 24px;
    border: 1px solid #eee;
`;

const Thumbnail = styled.img`
    width: 64px;
    height: 64px;
`;

export const ListItems: React.FC<{ id: number }> = ({ id }) => {
    const { data } = useListItemsQuery({
        variables: {
            id,
        },
    });

    return (
        <Container>
            {data?.list?.items &&
                data.list.items.length > 0 &&
                data.list.items.map((item, index) => {
                    if (isListItemProduct(item) && item.product) {
                        return (
                            <Item key={item.id || item.product.description}>
                                <Thumbnail src={item.product.thumbnail} />
                                <br />
                                {item.quantity}x {item.product.description} @ €
                                {item.product.price}
                            </Item>
                        );
                    }

                    if (isListItemRecipe(item) && item.title) {
                        return (
                            <Item key={item.title}>
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
