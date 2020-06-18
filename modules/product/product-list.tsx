import React, { useState } from 'react';
import styled from 'styled-components';
import {
    useProductsQuery,
    useListsQuery,
    useListAddProductMutation,
    ListItemsQuery,
    ListItemsDocument,
} from '../../codegen/_graphql';

const ProductCard = styled.div`
    padding: 8px;
    border: 1px solid #eee;
`;

const Thumbnail = styled.img`
    width: 64px;
    height: 64px;
`;

export const ProductList: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const { data } = useProductsQuery();
    const { data: listsData } = useListsQuery({
        variables: {
            size: 100,
            start: 0,
        },
    });
    const [addToList] = useListAddProductMutation();

    if (
        !data ||
        !data.products ||
        !listsData ||
        !listsData.lists ||
        !listsData.lists.result
    ) {
        return null;
    }

    const lists = listsData.lists.result;

    return (
        <>
            {data.products.map((product) => {
                return (
                    <ProductCard key={product.id}>
                        <Thumbnail src={product.thumbnail} />
                        <br />
                        {product.description} @ €{product.price}
                        <br />
                        {selectedProduct !== product.id && (
                            <button
                                onClick={() => {
                                    setSelectedProduct(product.id);
                                }}
                            >
                                Add to favorites
                            </button>
                        )}
                        {selectedProduct === product.id && (
                            <div>
                                <h3>Choose a list</h3>
                                {lists.map((list) => {
                                    return (
                                        <div key={list.id}>
                                            <button
                                                onClick={() => {
                                                    addToList({
                                                        variables: {
                                                            listId: list.id,
                                                            productId:
                                                                product.id,
                                                        },
                                                        update: (
                                                            proxy,
                                                            { data },
                                                        ) => {
                                                            const result =
                                                                data?.listAddProduct;

                                                            if (!result) {
                                                                return;
                                                            }

                                                            const listItemsQuery = proxy.readQuery<
                                                                ListItemsQuery
                                                            >({
                                                                query: ListItemsDocument,
                                                                variables: {
                                                                    id: list.id,
                                                                },
                                                            });

                                                            if (
                                                                !listItemsQuery ||
                                                                !listItemsQuery.list ||
                                                                !listItemsQuery
                                                                    .list.items
                                                            ) {
                                                                return;
                                                            }

                                                            const newData = {
                                                                ...listItemsQuery,
                                                                list: {
                                                                    ...listItemsQuery.list,
                                                                    items: [
                                                                        ...listItemsQuery
                                                                            .list
                                                                            .items,
                                                                        {
                                                                            product,
                                                                            id:
                                                                                product.id,
                                                                            quantity: 1,
                                                                            __typename:
                                                                                'ListItemProduct',
                                                                        },
                                                                    ],
                                                                },
                                                            };

                                                            proxy.writeQuery({
                                                                query: ListItemsDocument,
                                                                data: newData,
                                                            });
                                                        },
                                                    });
                                                }}
                                            >
                                                {list.description}
                                            </button>
                                        </div>
                                    );
                                })}
                                <br />
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </ProductCard>
                );
            })}
        </>
    );
};
