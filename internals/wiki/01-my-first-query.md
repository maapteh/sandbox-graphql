# Chapter 1: My first query

> [Frontend, Backend]  
> Continues from branch `master`

In this assignment we're going to add a new query that we can use in our application. We do this by:

1. Defining a new query and type in the GraphQL schema
1. Implementing the resolver logic that actually gets and returns the data

Let's get started!

Create a new branch from `master`

```
git checkout -b graphql-tutorial
```

Then start the application.

```sh
yarn dev
```

## Assignment 1.1: Add a new query to the GraphQL schema

The GraphQL schema is the complete definition of the GraphQL API. Similar to swagger documentation it tells the developer what operations (queries) they can perform. And what the return types are for these operations.

Our demo application uses NextJS and its convention to store the schema in: `pages/api/graphql/schema.ts`.

**Update this file to contain**:

-   A new type that defines what we want to show in our UI. Examples of types could be: A favorite list, a product, an order
-   A new query that returns a collection

Assuming you started the application before saving the file, you will see that the running process will pickup your changes and update the files:

-   `_schema.graphql`
-   `codegen/_graphql.tsx`
-   `codegen/_resolvers.tsx`

> Alternatively you can run the command: `yarn generate` to manually run the update. These files are auto-generated from the GraphQL schema. And are used to strongly-type the application, as well as provide utility functions we can use in our app. For more information on how this works see the `codegen` section in the setup docs.

In these files you should now see the generated GraphQL definitions and TypeScript types that were generated based on what you defined in `schema.ts`.

## Assignment 1.2: Implement the resolver logic for our new query

Now that we have our query and type in place, we have to write the code that gets the data and returns it.

**Open the file `pages/api/graphql/resolvers.ts`**

If you're running the app your editor should already tell you there's something wrong in this file, **The new query we just added isn't included in the resolver**.

Add the missing query, using the exact same name used as in the `schema.ts` file. Return an array of your defined object.

## Assignment 1.3: Run your query in the playground

Now you should be able to run your query in the GraphQL playground environment: <http://localhost:3007/api/graphql>.

> The playground provides an environment to test queries. It includes auto-complete, as you start typing it will provide suggestions. Click on the `schema` button on the right to see the entire schema.

Enter your query then, click the run button and see your data!

> GraphQL supports _query-what-you-need_, removing fields from your query will prevent that data being sent to you.

Do you see data? Great! You just wrote your first query.

If you didn't. No worries, check out the solution for a working example. Try to fix your code by looking at the example. You can also use the solution branch from chapter 1 to continue with chapter 2.

# Chapter 1 - Solution: My first query

Branch `chapter-1-solution`

A possible solution would be to display the users favorite lists. Users create favorite lists to store their favorite products. When they're shopping they can use their favorite lists to fill their shopping cart quickly.

## Assignment 1.1 - Solution: Add a new query to the GraphQL schema

For our query and type we defined the following in

`pages/api/graphql/schema.ts`:

```
# all our queries are defined on the type Query
type Query {
    """
    Have a simple example
    """
    simple: String
    """
    Get all the favorite lists this user has made
    """
    lists: [List!]
}

"""
Favorite list
"""
type List {
    """
    Id of list
    """
    id: Int! # a field named id with type integer that may not be null
    """
    Description entered by user
    """
    description: String!
}
```

We have two types: **Query** and **List**.

All queries must be defined under the **Query** type.

Custom types get their own type definition.

## Assignment 1.2 - Solution: Implement the resolver logic for our new query

To implement the resolver logic we return some mocked data

`pages/api/graphql/resolvers.ts`

```typescript
const query: QueryResolvers = {
    simple: () => {
        console.log('[server] GraphQL server query: simple');
        return 'Welcome to the AH GraphQL workshop';
    },
    lists: () => [
        {
            id: 0,
            description: 'Shopping List',
        },
        {
            id: 1,
            description: 'Chocolate',
        },
    ],
};
```

## Assignment 1.3 - Solution: Run your query in the playground

Now we can query the fields on type **List** from the playground, using the **lists** query.

<http://localhost:3007/api/graphql>:

```graphql
{
    lists {
        id
        description
    }
}
```
