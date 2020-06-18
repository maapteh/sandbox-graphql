# Chapter 3: Server Side Rendering

> [Frontend]  
> Continues from branch `chapter-2-solution`

In the previous chapter we connected to GraphQL and showed the data in our application. What might not be obvious, is that we're performing the query server-side. The component is rendered on the server and the entire HTML including our component is returned.

This is preferred in most cases, calling services on the server-side is usually faster than doing it client-side. Another reason to render on the server is for SEO. Search engines are better at indexing server side pages.

In some cases however you don't want this. For instance if the call we want to make is very slow, we might want to show some of the UI while we request the data. In other cases the data is not needed for SEO and we can increase perceived performance by adding the data after the page loads.

## Assignment 3.1: Extending our query

To make things more interesting, let's first extend our result type with an additional field.

> For example given an `Order` type, we can extend it with an `items` field of type `OrderItem`.

`pages/api/graphql/schema.ts`

```graphql
type OrderItem {
    id: Int
    description: String
    quantity: Int!
}

extend type Order {
    items: [OrderItem!]
}
```

This will add the `items` field to the `Order` type in our generated schema.

## Assignment 3.2: Add a field level resolver

Now we could add `items` to our dummy data. Everything would work just fine, and there's nothing wrong with this approach.

However, we usually only `extend` types with fields when we know that those fields come from a different backend service or endpoint. And we usually extend from a different file.

This allows us to modularize our schema. Teams can work independently on different parts of the API, and use extensions to add fields to queries and types maintained by other teams.

For this assignment add a field level resolver for your type.

> For example, given a `Order` type and an `items` field, we can add an `Order` key to our resolvers.

`pages/api/graphql/resolvers.ts`

```typescript
export const resolvers: Resolvers = {
    Query: query,
    Order: {
        items: (order) => {
            // ...
        },
    },
};
```

## Assignment 3.3: New query to get single object

Our query returns a collection. Let's add a new query in `pages/api/graphql/schema.ts` that returns a single object from our collection based on a parameter.

To complete this assignment also implement the resolver logic to go with our new query.

## Assignment 3.4: Client-side component for our single object

Let's define a new query in our app that gets our single object, and from it just the extended field we defined earlier

> For example given an `order` query, we can define an `order-items` query.

`modules/order/order-items.graphql`

```graphql
query orderItems($id: Int!) {
    order(id: $id) {
        items {
            id
            quantity
            description
        }
    }
}
```

The generated React hook we used takes an optional parameter. Using this parameter we can configure how a query should be performed.

One of the configuration parameters is `ssr`, we can perform a query client-side by settings this to false.

Create a new component that takes an id property, then use the generated React hook and set `ssr`To complete this assignment modify your component to perform the query client side. to false and pass the `id` as a variable:

> For example given the `order-items` query.

`modules/order/order-items.tsx`

```typescript
const { loading, error, data } = useOrderItemsQuery({
    ssr: false,
    variables: {
        id,
    },
});
```

We now have a component that if you include on a page, will call the GraphQL API to get the one field we requested from our main type.

## Assignment 3.5: Use our new client-side component

Now we can use our new component. In your first React component, include this component and pass it the id of the list.

In our order example that could look like:

`modules/order/order.tsx`

```tsx
return (
    <>
        <Text>{order.date}</Text>
        <Text>{order.recipient}</Text>
        <OrderItems id={order.id} />
    </>
);
```

To verify that a query runs client-side, open your browsers network panel and refresh the page. You should see an entry that calls the `/graphql` endpoint. See the POST body for the actual queries being sent.

> Note that you only see 1 request being made in the network panel going to the GraphQL API. This is because apollo-client, the GraphQL client, batches requests together. On the server however, we're still making separate calls to get the list items. We'll further optimize this in the `dataloader` chapter.

# Chapter 3 - Solution: Server Side Rendering

Branch `chapter-3-solution`

## Assignment 3.1 - Solution: Extending our query

Continuing with our `List` app, we extend the `List` type with an `items` field. This field will contain an array of `ListItem` objects.

`pages/api/graphql/schema.ts`

```graphql
"""
Item contained in list
"""
type ListItem {
    """
    Id of list item
    """
    id: Int
    """
    Description of list item
    """
    description: String
    """
    Amount of list items
    """
    quantity: Int!
}

extend type List {
    """
    Items contained in list
    """
    items: [ListItem!]
}
```

## Assignment 3.2 - Solution: Add a field level resolver

`pages/api/graphql/resolvers.ts`

```typescript
export const resolvers: Resolvers = {
    Query: { ... },
    List: {
        items: (list) => [
            {
                id: 1,
                description: 'Cheese',
                quantity: 2,
            },
            {
                id: 2,
                description: 'Milk',
                quantity: 1,
            },
        ],
    },
};
```

## Assignment 3.3 - Solution: New query to get single object

The query:

`pages/api/graphql/schema.ts`

```graphql
"""
Get list by id
"""
list(
    """
    Id of list
    """
    id: Int!
): List
```

And the resolver function:

`pages/api/graphql/resolvers.ts`

```typescript
Query: {
    // ...
    list: () => {
        return {
            id: 1,
            description: 'Chocolate'
        }
    },
},
```

## Assignment 3.4 - Solution: Client-side component for our single object

`modules/lists/list-items.graphql`

```graphql
query listItems($id: Int!) {
    list(id: $id) {
        items {
            id
            description
            quantity
        }
    }
}
```

`modules/lists/list-items.tsx`

```tsx
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
```

## Assignment 3.5 - Solution: Use our new client-side component

`modules/lists/list-overview.tsx`

```tsx
return (
    <>
        {data.lists.map((list) => (
            <List key={list.id}>
                {list.description}
                <ListItems id={list.id} />
            </List>
        ))}
    </>
);
```
