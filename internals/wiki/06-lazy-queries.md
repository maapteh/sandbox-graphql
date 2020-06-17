## Chapter 6: Lazy queries

> [Frontend]

In the previous chapters we used query hooks to get our data from GraphQL. In all our cases we retrieved the data immediatly on page load.

In some cases you want to only retrieve data when the user interacts with the website. For these cases we want to make our queries _lazy_.

There are 2 ways to do this:

### Lazy Hooks

For each query, two React hooks are actually generated. The `useMyQuery` hook we saw before and a `useMyQueryLazy` hook.

The lazy hook has a different return type from the regular hook:

```typescript
// note the second element is the same as the return type of regular query
const [loadMyQuery, { data, error, loading }] = useMyLazyQuery();
const { loading, error, data } = useMyQuery();
```

Instead of an object we get an array with 2 elements, the first element is a function that you can use similarily to the actual hook:

```typescript
loadMyQuery({
    ssr: false, // config
    variables: {
        // your variables
    },
});
```

The second element in the array is an object containing the same state variables we saw before in the non-lazy hook.

Lazy queries are most useful when you want to pass your `loadQuery` function to another component. Or when the variables to use in the query come from an event handler.

### Skip query

We can also use the regular query and configure it to skip the query initially:

```typescript
const [skip, setSkip] = useState(true);
const { loading, error, data } = useMyQuery({
    skip,
    variables: {
        //
    },
});
```

GraphQL hooks are reactive: If you change one of the variables, the query is run again. This approach of using the `skip` configuration is useful when you depend on state variables to configure your hook.

### Assignment 6.1: Call GraphQL when an interaction occurs

Modify your app to use a lazy hook instead of a regular hook or the skip configuration. Make a call to GraphQL when the user interacts with the app.

## Chapter 6 - Solution

Branch `chapter-6-solution`

### Assignment 6.1 - Solution: Use the lazy hook

We modified the list items component to load the items in a list when the user clicks on a button. In this case we used the lazy query because we don't have any state variables: The `id` property doesn't ever change.

`modules/lists/list-items.tsx`

```tsx
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
                    return (
                        <Item key={item.id || item.description || index}>
                            {item.quantity}x {item.description}
                        </Item>
                    );
                })}
        </Container>
    );
};
```

Or using `skip`, which looks less ideal in this situation:

```tsx
export const ListItems: React.FC<{ id: number }> = ({ id }) => {
    const [skip, setSkip] = useState(true);
    const { data, refetch } = useListItemsQuery({
        skip,
        ssr: false,
        variables: {
            id,
        },
    });

    return (
        <Container>
            <button
                onClick={() => {
                    if (skip) {
                        setSkip(false);
                    } else {
                        refetch();
                    }
                }}
            >
                Load Items
            </button>
            {data?.list?.items &&
                data.list.items.length > 0 &&
                data.list.items.map((item, index) => {
                    return (
                        <Item key={item.id || item.description || index}>
                            {item.id}
                            <br />
                            {item.description}
                            <br />
                            {item.quantity}
                        </Item>
                    );
                })}
        </Container>
    );
};
```
