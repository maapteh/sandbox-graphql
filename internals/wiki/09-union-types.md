# Chapter 9: Union Types

> [Frontend, Backend]

> Continues from branch `chapter-8-solution`

In this chapter we will go through the use cases for `unions` and how to implement them in our GraphQL schema. The Union type indicates that a field can return more than one object type, but doesn't define specific fields itself.

Using `Unions` can greatly improve your GraphQL schema design and simplify your queries and mutations.

## Assignment 9.1: Add a union type to our schema

If we look at our list example of a few exercises back. Then you can imagine that there might be several different items on the list.

Think of the case where we are trying to expose a favorite list functionality and the result of our list can be either a Product , Recipe or VagueTerm. One way to think about this is to have our list query return something like:

```graphql
{
    list(id: 3) {
        items {
            products {
                id
                quantity
            }
            recipes {
                id
                title
                description
            }
            vagueTerms {
                id
                description
            }
        }
    }
}
```

While this works, we can’t rank the result based on relevance in one result set. Ideally, we would return one result set that can have different types in it. Luckily there is an elegant solution for this problem, called `unions`.

**Unions**

To solve problems like above where we want to have the returned type possibly from different types.
For this to work, we can define a `Union` type that can resolve to either one of `Product`, `Recipe` or `VagueTerm` and then each type can have its own set of fields.

Let's add our first `union` type. We must modify our schema in: `pages/api/graphql/schema.ts.` Update this file to contain:

-   A `ListItemProduct` and `ListItemRecipe` type to the schema.
    -   `ListItemProduct` contains the following fields: `id`, `description` and `quantity`
    -   `ListItemRecipe` contains the following fields: `id`, `title`, `description`
-   Add `items` field to the `List` type. The return type should either return a `ListItemProduct` or `ListItemRecipe`

## Assignment 9.2: Implement the resolver logic for the union

Now that we have added the union to our schema, we have to implement the logic to actual get the data and return it. This logic is located in `pages/api/graphql/resolvers.ts`. If you open this file and you ran the codegen your editor should already tell you there's something wrong in this file: The `union` we just added isn't included in the resolver.

Add the missing union to your resolver, And have it return an array of your defined object. You can let it return mock data, located at `pages/api/graphql/__mocks__/lists.ts:`

> Since a query requesting a union field, a query being made on a field which is union-typed must specify the object types containing the fields it wants. This ambiguity is solved by an extra `__resolveType` field in the resolver map. `__resolveType` defines the type of the result is out of the available options to GraphQL execution environment.

```typescript
export const resolvers: Resolvers = {
    ListItem: {
        __resolveType(obj: ListItem) {
            // determine which type your return, based on the data
            // In this example, if the ListItem has an id, then its type `your-list-item-type-1`
            return Boolean(obj.id)
                ? 'your-list-item-type-1'
                : 'your-list-item-type-2';
        },
    },
};
```

## Assignment 9.3: Display the list items in your frontend

Now you should be able to run your union query in the GraphQL playground environment: http://localhost:3000/api/graphql.

You can test it with different id's (1 = product, 3 = recipe ).

```graphql
{
    list(id: 1) {
        id
        description
        items {
            ... on ListItemProduct {
                id
                description
                quantity
            }

            ... on ListItemRecipe {
                id
                title
                description
            }
        }
    }
}
```

Now that we have the data working, our next task is to show it in the frontend.

-   Modify your list-items query that is uses your new union query, located in `modules/lists/list-items.graphql`.

The next step is to see which data type you are dealing with. And to show the correct data based on this.
The `__typename` field resolves to a String which lets you differentiate different data types from each other on the client. So use that to show the different data.

-   Render the correct data based on the ListItem type you receive. List-item module is located in `modules/lists/list-items.tsx`.

# Chapter 9 - Solution: Union Types

Branch `chapter-9-solution`

## Assignment 9.1 - Solution: Add an union type to our schema

For our query and type we defined the following.

We update in our schema, the query and type. And introduce a union type called `ListItem`.

`pages/api/graphql/schema.ts`:

```graphql
type ListItemProduct {
    """
    Id of product
    """
    id: Int!
    """
    Product description
    """
    description: String!
    """
    Amount of items in list
    """
    quantity: Int!
}

type ListItemRecipe {
    """
    Id of recipe
    """
    id: Int!
    """
    Title of recipe
    """
    title: String!
    """
    Description of recipe
    """
    description: String!
    """
    Amount of items in list
    """
    quantity: Int!
}

"""
Item contained in list
"""
union ListItem = ListItemProduct | ListItemRecipe
```

## Assignment 9.2 - Solution: Implement the resolver logic for the union

We modify the resolver logic to return our union type. In addition we move the mocks to the `listService` we defined earlier.

Note we have to provide a resolver on `ListItem` with the function `__resolveType`. This tells GraphQL how it should give types to the objects it receives from our service, in this case our mock files.

`pages/api/graphql/resolvers.ts`

```typescript
export const resolvers: Resolvers = {
    // ... skip
    List: {
        items: (list) => listService.items(list.id),
    },
    ListItem: {
        __resolveType(obj: ListItem) {
            return (obj as ListItemRecipe).title
                ? 'ListItemRecipe'
                : 'ListItemProduct';
        },
    },
};
```

## Assignment 9.3 - Solution: Display the list items in your frontend

To update the graphql query, list-item query logic we modified
`modules/lists/list-items.graphql`.

```graphql
query listItems($id: Int!) {
    list(id: $id) {
        items {
            ... on ListItemProduct {
                id
                description
                quantity
            }

            ... on ListItemRecipe {
                id
                title
                description
            }
        }
    }
}
```

Finally we update the list-item component that displays all the favorite lists. We have to check what type the item is to determine how to render it.

> Note that we're checking whether the item is a recipe, differently from whether it's a product. In the recipe example we're using **typescript guards** to make our code cleaner.

`modules/lists/list-items.tsx`

```typescript
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
                })}
        </Container>
    );
};
```
