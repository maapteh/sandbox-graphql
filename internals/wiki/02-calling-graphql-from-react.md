# Chapter 2 - Calling GraphQL from React

> [Frontend]

In this chapter we'll use the GraphQL query we defined in chapter 1 and display it in our React application.

## Assignment 2.1: Write the query

Create a new module folder in `modules/my-module` and add a file called `query.graphql`

`modules/my-module/query.graphql`

In this file we're going to write our first query. We write the query in GraphQL, when writing queries in our application we have to name our query:

```graphql
query myQuery {
    ...the_actual_query
}
```

For example, taking the schema from the `chapter-1-solution` our query could look like this:

```graphql
query lists {
    lists {
        id
        description
    }
}
```

> If you're using VSCode together with the GraphQL plugin you will get auto-complete suggestions in the editor as you're typing queries. Use cmd+space to trigger suggestions manually.

After saving this file, the running application will pick up the changes and generate TypeScript types and React hooks. These can be found in: `codegen/graphql.tsx`. We'll be using these hooks and types to build our UI. See the appendix to learn more about code generation.

## Assignment 2.2: Use the query in a component

Next let's create a component and display our data. Create a React component:

`modules/my-module/my-component.tsx`

A blank component looks like this:

```tsx
import React from 'react';

export const MyComponent: React.FC = () => {
    return null;
};
```

Now we can the generated React hook imported from `schema/graphql.tsx` to connect to GraphQL:

```ts
import { useMyQuery } from '../../codegen/_graphql';

// add to the body of your component
const { loading, error, data } = useMyQuery();
```

The generated hook among others will give you 3 state variables: `loading`, `error`, `data`. These state variables describe the state of the GraphQL query you're trying to perform.

> Tip: Write down `,[space]` after `data` and press `ctrl+space` to get suggestions for other values you can use.

You can use these state variables to determine what to display, for instance you can show a loading spinner if the query is still running and hasn't received data. Or you can display an error message. For example:

```tsx
if (loading) {
    return <p>Loading...</p>;
}

if (error) {
    return <p>Error: {error}</p>;
}

if (!data || !data.queryName) {
    return <p>Erorr: Unknown</p>;
}

return; // do something with the data
```

To style the components you can either use [styled components](https://styled-components.com/docs) or include the css as a style attribute on the JSX element:

```tsx
// using styled components
import styled from 'styled-components';

// we define a simple box
const Box = styled.div`
    padding: 8px;
    margin: 0 0 24px;
    border: 1px solid #eee;
`;

// or just use the style tag:
<div
    style={{
        padding: '8px',
        margin: '0 0 24px',
        border: '1px solid #eee',
    }}
>
    ...your content
</div>;
```

To finish the assignment display your data in some way in the component. Then create another component in `pages` and use your newly created component:

`pages/my-page.tsx`

```tsx
import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { MyComponent } from '../modules/my-module/my-component';

const MyPage: NextPage = () => {
    return <MyComponent />;
};

// be sure to include this line
export default withApollo(MyPage);
```

You can now see your page, component and hopefully your data from GraphQL at <http://localhost:3007/my-page>.

# Chapter 2 - Solution: Calling GraphQL from React

Branch `chapter-2-solution`

Continued from the solution from chapter 1 on branch `chapter-1-solution`.

## Assignment 2.1 - Solution: Write the query

We create a query to retrieve all our favorite lists:

`modules/list/lists.graphql`

```graphql
query lists {
    lists {
        id
        description
    }
}
```

## Assignment 2.2 - Solution: Use the query in a component

Next we create a component that displays all the favorite lists in a box.

`modules/list/list-overview.tsx`

```tsx
import React from 'react';
import styled from 'styled-components';
// we're importing a generated React hook
// the hook is actually a wrapper around the useQuery hook found in the apollo client
import { useListsQuery } from '../../codegen/_graphql';

// create a simple box to show our data in using styled components
const List = styled.div`
    padding: 8px;
    margin: 0 0 24px;
    border: 1px solid #eee;
`;

export const ListOverview: React.FC = () => {
    // the hook performs the call to the graphql server
    // and gives us state variables that we can use in our app
    const { loading, error, data } = useListsQuery();

    // we can decide what to show based on the state
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!data || !data.lists) {
        return <p>Erorr: Unknown</p>;
    }

    // and tells us when we really have data
    // now we really have data that we can use
    return (
        <>
            {data.lists.map((list) => (
                <List key={list.id}>{list.description}</List>
            ))}
        </>
    );
};
```

Finally we create a page.

`pages/favorites.tsx`:

```tsx
import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { ListOverview } from '../modules/list/list-overview';

const ListsPage: NextPage = () => {
    return <ListOverview />;
};

export default withApollo(ListsPage);
```

Now we can go to <http://localhost:3007/favorites> and see all the users favorite lists in a nice box.
