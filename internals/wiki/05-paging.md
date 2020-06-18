# Chapter 5: Paging

> [Frontend, Backend]  
> Continues from `chapter-3-solutions`

In this chapter we add paging to our query. There are many ways to implement paging in an API. The most common ones are to either use a `page` or an `offset`. Or if you're really cool, you'll use a `cursor`. The following section explains the first two paging schemes. If you already know how to implement paging in API's, you can skip this section and start at the first assignment of the chapter.

## Using offset

We define two parameters: `start` and `size`.

-   Start: The index within the collection to start the page on. Other names you may find for this parameter are: `offset`, `skip`
-   Size: The amount of items to return in the page. Other names you may find for this parameter are: `length`, `take`.

When using the offset approach, we need to include in the return type the total number of items across all pages. This tells our consumers when there are no more pages to retrieve.

## Using pages

Another common way to implement paging is to use the parameters `page` and `pageSize`.

The only difference is that our `page` parameter refers to the actual page number and not the index to start paging on.

For instance page 3, with a pageSize of 10, means the first element of page 4 will be the 31st (offset) object in the entire collection.

Like the offset scheme, we need to tell our consumers how far they can page. Returning the total number of items works with the page approach too. You may also find fields like `maxPages` to convey this information.

## Assignment 5.1: Turn the query into a paged query

For this assignment:

1. Use the paging approach of your choice, update the schema to make your query support paging. Note that you might have to introduce a new type.
2. Update the resolver to return the part of the dataset based on the paging parameters.

As soon as you implement the schema, the query parameters will be available in the resolver. You can access them with full editor support by using the second parameter in your resolver function:

```typescript
// we'll use the first parameter in a later chapter
myQuery: (_, args) => {
    console.log(args);
    // { skip: 0, take: 5 }
};
```

After this assignment you should be able to get paged results for your query through the playground.

## Assignment 5.2: Use paged queries in the app

To use pagination on the client, we need to add parameters to our query and re-generate our React hook. For example:

`modules/my-module/query.graphql`

```graphql
query queryInApp($start: Int!, $size: Int) {
    queryInGraphQL(start: $start, size: $size) {
        id
        otherField
    }
}
```

After saving our query and re-generating our React hooks, we now have to add these parameters in our component. You can use the `useState` hook from the `React` package to create a state variable that we'll increment, and use it in the query hook.

`modules/my-module/my-component.tsx`

```typescript
const [start, setStart] = React.useState(0);

const { loading, error, data } = useMyQuery({
    ssr: false,
    variables: {
        start: start,
        size: 5,
    },
});
```

If everything went well you should be able to see a paged subset of our complete data.

## Assignment 5.3: Load more button

Add a button to your page to load more data, that increments the `offset` or `page` parameter, and calls the `loadQuery` function. You can use the `useState` hook from the `React` package to create a state variable to increment.

`modules/my-module/my-component`

```tsx
const [start, setStart] = React.useState(0)

<button
    onClick={() => {
        // update state
    }}
>
    Load More
</button>
```

When you click the load more button, you'll see that the data you were showing is being replaced. It's not actually adding more data to our overview. This is because we need to tell `apollo-client` how to merge the new data with the old data.

## Assignment 5.4: Merge new page with previous page

In addition to `loading`, `error` and `data`, the query hook provides us with a `fetchMore` function. We can use this function to perform our query, as well as tell `apollo-client` how to merge the data together.

Update the button `onClick` handler to use the `fetchMore` function and implement the `updateQuery` function.

```ts
const { loading, error, data, fetchMore } = useMyQuery({..})

fetchMore({
    variables: {
        start,
        size: 5
    },
    updateQuery: (prev, { fetchMoreResult }) => {
        // return value should be the same data "shape", but merged together
    }
})
```

Now when we click the `Load More` button we should see new pages being added, instead of our data being replaced.

# Chapter 5 - Solution: Paging

Branch `chapter-5-solutions`

## Assignment 5.1 - Solution: Turn the query into a paged query

In this case we decided to make the `size` parameter optional. This lets us define a default page size in our resolver.

`pages/api/graphql/schema.ts`

```graphql
lists(
    """
    Starting index of page
    """
    start: Int!
    """
    Size of the page
    """
    size: Int
): ListsResult
```

We also can't return a collection of `List` objects like we did before. We need to tell our consumers how many items are available in total. So they know when to stop getting pages.

```graphql
"""
Paged result of lists query
"""
type ListResult {
    """
    Paged collection
    """
    result: [List!]
    """
    Total amount of items in collection
    """
    total: Int!
}
```

We add some more data and move it to a separete file. Then we define the resolver logic to support paging:

`pages/api/graphql/resolvers.ts`

```typescript
lists: (_, { start, size }) => {
    if (start < 0 || start > MOCK_LISTS.length) {
        return null;
    }

    return {
        result: MOCK_LISTS.slice(
            start,
            Math.min(start + (size || 5), MOCK_LISTS.length),
        ),
        total: MOCK_LISTS.length,
    };
},
```

## Assignment 5.2 - Solution: Use paged queries in the app

`modules/lists/lists.graphql`

```graphql
query lists($start: Int!, $size: Int) {
    lists(start: $start, size: $size) {
        result {
            id
            description
        }
        total
    }
}
```

`modules/lists/list-overview.tsx`

```typescript
const [start, setStart] = useState(START_INITIAL);
const { loading, error, data, fetchMore } = useListsQuery({
    variables: {
        start: START_INITIAL,
        size: PAGE_SIZE,
    },
});

// ...skip

return (
    <>
        {data?.lists?.result?.map((list) => (
            <List key={list.id}>{list.description}</List>
        ))}
    </>
);
```

## Assignment 5.3 - Solution: Load more button

`modules/lists/lists.tsx

```tsx
const [start, setStart] = React.useState(0)

<button
    onClick={() => {
        setStart(start + 5)
    }}
>
    Load More
</button>
```

## Assignment 5.4 - Solution: Merge new page with previous page

`modules/lists/list.tsx`

```tsx
<button
    onClick={() => {
        const newStart = start + PAGE_SIZE;
        if (data?.lists?.total && newStart < data.lists.total) {
            fetchMore({
                variables: {
                    start: newStart,
                    size: PAGE_SIZE,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult?.lists) {
                        return previousResult;
                    }

                    return {
                        ...previousResult,
                        lists: {
                            ...fetchMoreResult.lists,
                            total: fetchMoreResult.lists.total,
                            result: [
                                ...(previousResult.lists?.result || []),
                                ...(fetchMoreResult.lists.result || []),
                            ],
                        },
                    };
                },
            });
            setStart(newStart);
        }
    }}
>
    Load More
</button>
```
