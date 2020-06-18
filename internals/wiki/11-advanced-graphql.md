# Chapter 11: Advanced GraphQL

> [Frontend, Backend]  
> Continues from branch `chapter-10-solutions`

This chapter provides an overview of more advanced GraphQL features.

## Caching

Apollo server can set cache control headers and provides cache hints for clients using `cacheControl` directives. Uisng this directive you can mark your objects or queries as cacheable:

```graphql
# cache entire order for 1 minute
type Order @cacheControl(maxAge: 60, scope: PRIVATE) {
    # cache for 10 minutes
    openDate: Date @cacheControl(maxAge: 600, scope: PUBLIC)
    # ...
}
```

Setting `cacheControl` on `openDate` sends a hint in the query response marking it as cacheable.

You can further extend caching strategies on the client using `fetch-policy`:

```ts
const { data } = useQuery({
    fetchPolicy:
        // run query once then get from cache
        'cache-first' |
        // use cached values but execute query and update
        'cache-and-network' |
        // always get new data
        'network-only' |
        // never run query - used for local state
        'cache-only' |
        // always get new data and dont store the data
        'no-cache',
});
```

## Input types

You can use input types to use objects as parameters in your queries. Using regular types will not work:

```graphql
# will not compile
type Mutation {
    deliveryReschedule(id: ID!, DeliveryReschedule): Delivery
}

type DeliverReschedule {
    # fields
}
```

Instead use input types.

```graphql
type Mutation {
    deliveryReschedule(id: ID!, DeliveryRescheduleInput): Delivery
}

input DeliveryRescheduleInput {
    # fields
}
```

## Interfaces

Interface inheritance is possible using the `implements` keyword:

```graphql
type OrderBase {
    id: ID!
    date: Date!
}

type OrderPickup implements OrderBase {
    id: ID!
    date: Date!
    store: Store!
}
```

> Note that we have to redefine the fields in our child type. This is because we're using interface inheritance and not class inheritance. Using interfaces are benificial when you want to be sure you're not breaking in the interface.

## Scalars

It's possible to define your own custom primitive types, called scalars. Examples are dates, currency, urls. To create a scalar you provide a function to validate the scalar:

`pages/api/graphql/resolvers.ts`

```ts
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date time scalar',
        serialize(value) {
            // how to send value to client
        },
        parseValue(value) {
            // how to handle value from client
        },
        parseLiteral(ast) {
            // more advanced parsing using query abstract syntax tree
        },
    }),
```

## Optimistic responses

With `apollo` and React hooks we can use optimistic responses in our UI's to make it appear faster. We do this by updating the data locally without waiting for the server to handle the request.

```ts
const [amount, setAmount] = useState(product.amount);

useUpdateBasketMutation({
    optimisticResponse: {
        updateBasket: {
            id: product.id,
            amount,
            __typeName: 'BasketItemProduct',
        },
    },
});
```

Note that we're updating a different type, Product, that was previously fetched by different query.

This works in most cases. But sometimes we want to modify our local state manually. For example when we add a new product to the basket. We're not modifying a field, but adding to a list. In those cases you have to provide an `update` function:

```ts
useAddToBasketMutation({
    update: (proxy, { data, extensions }) => {
        // getBasket is the query used to load the basket app wide
        // here we get the result of the query
        const localData = proxy.readQuery({
            query: GetBasketQueryDocument,
        });

        // and add our new item to the collection
        proxy.writeQuery({
            query: GetBasketQueryDocument,
            data: {
                ...localData,
                items: [...localData, data],
            },
        });
    },
});
```

Both these methods write to the local cache in the browser. If the operation fails, that change is reverted so we're not stuck with bad data.

## Assignment 11.1: Implement an optimistic response

Using one of the methods described above, implement an optimistic response in your app.

# Chapter 11 - Solution: Advanced GraphQL

## Assignment 11.1 - Solution: Implement an optimistic response

To implement optimistic responses we're going to:

-   Add a "Add to favorites" button to our our products
-   Render a list of products that we can like.

But first let's remove the load items button, so we can always see the items in our list:

`modules/list/list-items.tsx`

```tsx
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
```

### Products list

Now let's display a list of products. We'll start by modifying our schema to return a list of products.

We also need a mutation to add and remove a product from a favorite list.

`pages/api/graphql/schema.ts`

```graphql
type Query {
    # ... skip
    products: [Product!]
}

type Mutation {
    """
    Add a product to a favorite list and return the resulting list
    Will return null if product or list not found
    """
    listAddProduct(productId: Int!, listId: Int!): List
    """
    Remove a product from a favorite list and return the reuslting list
    Will return null if product or list not found
    """
    listRemoveProduct(productId: Int!, listId: Int!): List
}
```

And implement our resolver functions. Again we use mocks and service objects to make our code cleaner.

`pages/api/graphql/resolvers.ts`

```ts
Query: {
    // ... skip
    products: () => {
        return productService.all();
    },
},
Mutation: {
    // ... skip
    listAddProduct: (_, { productId, listId }) => {
        const product = productService.single(productId);
        if (!product) {
            return null;
        }
        return listService.addProduct(listId, productId);
    },
    listRemoveProduct: (_, { productId, listId }) => {
        const product = productService.single(productId);
        if (!product) {
            return null;
        }
        return listService.removeProduct(listId, productId);
    },
}
```

Next we implement the query on the app side.

`modules/product/product-list.graphql`

```graphql
query products {
    products {
        id
        price
        thumbnail
        description
    }
}
```

As well as the add to list mutation. We don't really care about the return type. We just want to know whether it was succesful.

`modules/list/list-add-product.graphql`

```graphql
mutation listAddProduct($productId: Int!, $listId: Int!) {
    listAddProduct(productId: $productId, listId: $listId) {
        id
    }
}
```

Now we can build a component to show our products and add them to our list.

`modules/product/product-list.tsx`

> Note that we need both the products query as well as the lists query. It might seem efficient, to have the same query in two places on the same page. But actually, apollo magic helps us here. Both queries are batched together, and on the server only 1 call is made to the backend service.

```tsx
export const ProductList: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const { data } = useProductsQuery();
    const { data: listsData } = useListsQuery({
        variables: {
            size: 100,
            start: 0,
        },
    });

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
                                        <div>
                                            <button
                                                onClick={() => {
                                                    addToList({
                                                        variables: {
                                                            listId: list.id,
                                                            productId:
                                                                product.id,
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
```

We can already add products to our favorite lists now. But they won't show up in the UI until you refresh.

This is because we are only querying the description and id of the list returned by the `listAddProduct` mutation. If we were to include all list items as well, exactly the same as `list-items` query.

`modules/list/list-add-product.graphql`

```graphql
mutation listAddProduct($productId: Int!, $listId: Int!) {
    listAddProduct(productId: $productId, listId: $listId) {
        id
        description
        items {
            ... on ListItemProduct {
                id
                quantity
                product {
                    id
                    description
                    price
                    thumbnail
                }
            }
            ... on ListItemRecipe {
                id
                title
                description
                quantity
            }
        }
    }
}
```

Then it works. But this is inefficient: Why do we need to get all this data, when we're only interested in ListItemProduct? And from that we only care about the id and quantity. Because we already have the product. So no need to query that again.

We can make this nicer by updating the cache ourselves.

```ts
addToList({
    variables: {
        listId: list.id,
        productId: product.id,
    },
    update: (proxy, { data }) => {
        const result = data?.listAddProduct;

        if (!result) {
            return;
        }

        const listItemsQuery = proxy.readQuery<ListItemsQuery>({
            query: ListItemsDocument,
            variables: {
                id: list.id,
            },
        });

        if (
            !listItemsQuery ||
            !listItemsQuery.list ||
            !listItemsQuery.list.items
        ) {
            return;
        }

        const newData = {
            ...listItemsQuery,
            list: {
                ...listItemsQuery.list,
                items: [
                    ...listItemsQuery.list.items,
                    {
                        product,
                        id: product.id,
                        quantity: 1,
                        __typename: 'ListItemProduct',
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
```

Now we have an optimistic response, using the `update` function. We update the cache before waiting for the response.

We can't use the `optimisticResponse` in this case because we're updating a list, the `items` key in `List`. You can only use the `optimisticResponse` method, when you only mutate a single entity.
