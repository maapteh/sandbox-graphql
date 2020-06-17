# Chapter 10: Dataloader

> [Backend]

With Dataloader we can make our API more efficient by batching and grouping calls together on field resolver level.

For instance a basket contains items, and each item may refer to a product. Using field resolvers we can define behavior to only call our backend services when that specific field is requested in the query:

```typescript
export const resolvers: Resolvers = {
    BasketItem: {
        // only executed if someone requests product of BasketItem
        product: (basketItem) => {
            if (basketItem.id) {
                return productService.get(basketItem.id);
            }
            return null;
        },
    },
};
```

This approach has the problem that we run in to the **n+1** problem quite quickly. For that we use dataloader, which:

-   Batches requests to the backend together. For this its important for backend services to support an `ids` query parameter that accepts multiple values, instead of single value `id` parameter.
-   Groups calls across queries. If the server receives multiple queries at once, all those queries will use the same dataloader. Resulting in less calls to the backend.

## Assignment 10.1: Implement a dataloader

Instead of calling a service or simply returning data. Implement a dataloader and add it to your resolvers.

# Chapter 10 - Solution

## Assignment 10.1 - Solution: Implement a dataloader

To use dataloader we first need a call that we can batch. So far we don't have any:

-   Our `lists` query: Calls an endpoint that gets all the lists, and doesn't rely on ids.
-   Our `list` query: Seems is also not ideal because it doesn't ever get more than 1 id.
-   Our `items` resolver: Also accepts just 1 id.

Luckily we have a use case if we implement our favorite lists app a bit further.

In the last chapter we defined `ListItemProduct` and `ListItemRecipe`, and we display these in the app. But we are not yet showing the actual Recipe or Product details.

We'll add a new Product type and extend ListItemProduct contain a product. We'll also add a query that gets a single product.

`pages/api/graphql/schema.ts`

```graphql
type Query {
    # ... skip
    """
    Get a single product
    """
    product(id: Int!): Product
}

"""
A sellable product
"""
type Product {
    id: Int!
    description: String!
    thumbnail: String!
    price: Float!
}
```

Next we'll extend ListItemProduct to contain a product field:

```graphql
extend type ListItemProduct {
    product: Product
}
```

> Note that we could have just added it to the ListItemProduct type, but we're extending to illustrate how you can modularize your app using extensions.

Now comes the magic.

To implement the resolver, we add a `ListItemProduct` resolver that listens to queries containing the `product` field.

We'll user a dataloader here that calls our `productService`.

`pages/api/graphql/resolvers.ts`

```ts
ListItemProduct: {
    product: (listItem) => {
        return productDataLoader.load(listItem.id);
    },
},
```

We could have just called our productService here and call it day. But that would mean in our app, when we load the list items, we're actually calling this resolver function for every list item. So if we have 10 items in our list, that's 10 calls going to our backend service.

Using dataloader we only do 1 call to the backend service.

Our data loader calls the productService, passing all the ids it received.

`pages/api/graphql/__mocks__/product-mocks.ts`

```ts
export const productService = {
    many(ids: readonly number[]) {
        return ids.map((id) => MOCK_PRODUCTS.find((x) => x.id === id) || null);
    },
};

export const productDataLoader = new Dataloader((ids: readonly number[]) => {
    return Promise.resolve(productService.many(ids));
});
```

**Important**

> Note that in the `many` function, we return nulls _in the array_ if a product isn't found. This is important for `dataloader` to be able to _distribute_ results to the functions that call it.

Then we can modify our query in the app to request the product field, if the item is a ListItemProduct type.

`modules/list/list-items.graphql`

```graphql
query listItems($id: Int!) {
    list(id: $id) {
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

Now we can create a `ProductCard` component that calls

Finally, we can render our new Product details.

`modules/list/list-items.tsx`

```tsx
if (isListItemProduct(item) && item.product) {
    return (
        <Item key={item.id || item.product.description}>
            <Thumbnail src={item.product.thumbnail} />
            <br />
            {item.quantity}x {item.product.description} @ €{item.product.price}
        </Item>
    );
}
```
