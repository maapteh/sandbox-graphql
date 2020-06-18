# Chapter 7: Mutations

> [Frontend, Backend]  
> Continues from `chapter-6-solution`

So far we've learned how to display data from our GraphQL API. In this chapter we're going to learn how to change or update our data using GraphQL.

When using REST we typically update our data using `POST`, `PUT` or `DELETE` requests. In GraphQL almost every operation is a `POST` request. We sometimes use `GET` requests for `cached queries`.

The way we make changes to our data is by using a `Mutation`. Which is used in the same way as `Query`.

## Assignment 7.1: Implement a mutation

For this assignment in the `schema.ts` file implement a mutation on your data. The syntax to write a `Mutation` is the same as `Query`, except you mark the type by using `Mutation`:

`pages/api/graphql.ts`

```graphql
type Query {
    myQuery: Something
}

type Mutation {
    myMutation(id: Int!, change: String!): Something
}
```

Also implement the resolver function for this mutation:

`pages/api/graphql/resolvers.ts`

```ts
const mutation: MutationResolvers {
    myMutation: () => {}
}

export const resolvers: Resolvers = {
    Query: query,
    Mutation: mutation,
    ...,
};

```

## Assignment 7.2: Use the mutation

Similar to Queries, when using mutations our codegenerator will generate a hook that we can use in our components.

```ts
const [myMutation, { loading, error, data }] = useMyMutation();
```

It's return type will be the same as `Lazy Queries`. This is because Mutations are almost always used in a Lazy way, for instance when a user clicks on something.

To use the `myMutation` function:

```ts
myMutation({
    variables: {
        // your variables
    },
});
```

To finish this assignment, use the Mutation hook and perform a mutation on a user interaction.

# Chapter 7 - Solutions: Mutations

Branch `chapter-7-solutions`

## Assignment 7.1 - Solution: Implement a mutation

We implement a mutation to change the description of a list.

`pages/api/schema.ts`

```graphql
type Mutation {
    listRename(id: Int!, description: String!): List
}
```

In order to change the description, and return we an update List, we implement a small `listService` that holds and mutates the data in-memory.

`pages/api/graphql/resolvers.ts`

```ts
Query: {
    simple: () => { ... },
    lists: (_, { start, size }) => {
        return listService.all(start, size || 5);
    },
    list: (_, { id }) => {
        return listService.single(id);
    },
},
Mutation: {
    listRename: (_, { id, description }) => {
        return listService.rename(id, description)
            ? listService.single(id)
            : null;
    },
},
```

## Assignment 7.2 - Solution: Use the mutation

`modules/list/list-rename.graphql`

```graphql
mutation listRename($id: Int!, $description: String!) {
    listRename(id: $id, description: $description) {
        id
        description
    }
}
```

> Note that we must include the id field. Because otherwise apollo-client doesn't know how to merge the value in the browser, with the updated value returned from the server

`modules/list-overview/list-overview.tsx`

```tsx
const [description, setDescription] = useState('');
const [selectedId, setSelectedId] = useState<number | null>(null);
const [rename] = useListRenameMutation();

// ...skip

return (
    <>
        {data?.lists?.result?.map((list) => (
            <List key={list.id}>
                {selectedId !== list.id && list.description}
                {selectedId === list.id && (
                    <>
                        <input
                            value={description}
                            onChange={(e) => {
                                if (e.target.value) {
                                    setDescription(e.target.value);
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                rename({
                                    variables: {
                                        id: selectedId,
                                        description,
                                    },
                                });
                                setDescription('');
                                setSelectedId(null);
                            }}
                        >
                            Save
                        </button>
                        <button onClick={() => setSelectedId(null)}>
                            Cancel
                        </button>
                    </>
                )}
                {selectedId !== list.id && (
                    <Anchor
                        onClick={() => {
                            setDescription(list.description);
                            setSelectedId(
                                selectedId === list.id ? null : list.id,
                            );
                        }}
                    >
                        rename
                    </Anchor>
                )}
                <ListItems id={list.id} />
            </List>
        ))}
        // ...skip
    </>
);
```
