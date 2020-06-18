# Chapter 8: Fragments

> [Frontend]  
> Continues from branch `chapter-7-solution`

A common best practice is to split React components into separate stateless and stateful components, also referred to as dumb and smart components. So far we've been building stateful components: The component handles both data fetching as well as styling. There are a few ways we can split our components while still using the GraphQL type system.

We can import the GraphQL schema types and use them as the props to our components:

```tsx
import { OrderInformation } from 'codegen/_graphql.tsx';

const OrderInformationBlock: React.FC<OrderInformation> = ({
    date,
    recipient,
}) => {
    //...
};
```

This works when you expect to always get the fields from a query.

We can make this a bit more strictly typed by using the actual query:

```tsx
import { OrderInformationQuery } from 'codegen/_graphql.tsx';

const OrderInformationBlock: React.FC<OrderInformationQuery> = ({
    date,
    // recipient is not defined in the actual query
}) => {
    //...
};
```

We can even more strictly type our components by generating a type using `fragments`. We place a graphql fragment together with our component.

`components/order-information-block/fragment.graphql`

```graphql
fragment orderInformationBlock on OrderInformation {
    date
    name
}
```

This separates our component from the query completely. It now depends on a set of fields or type, making the components more re-usable.

Our code generator generates the types that we then use to type our component

```tsx
import { OrderInformationBlockFragment } from 'codegen/_graphql.tsx';
```

And use in our queries

```graphql
query getOrderInformation {
    order {
        ...orderInformationBlock
    }
}
```

To complete this chapter, define a fragment, use it in your query and as your components props.

# Chapter 8 - Solution: Fragments

Branch: `chapter-8-solution`

To solve the assignment we define a new List component and a fragment to use as its props.

`modules/list/list-fragment.graphql`

```graphql
fragment list on List {
    id
    description
}
```

And use the fragment in our query.

`modules/list/lists.graphql`

```graphql
query lists($start: Int!, $size: Int) {
    lists(start: $start, size: $size) {
        result {
            ...list
        }
        total
    }
}
```

We move the code to render a List and its items to a new file.

`modules/list/list.tsx`

```tsx
import { ListFragment } from 'codegen/_graphql';

export const List: React.FC<ListFragment> = ({ id, description }) => {
    const [newDescription, setNewDescription] = useState(description);
    const [selected, setSelected] = useState(false);
    const [rename] = useListRenameMutation();

    return (
        <Container key={id}>
            {!selected && description}
            {selected && (
                <>
                    <input
                        value={newDescription}
                        onChange={(e) => {
                            if (e.target.value) {
                                setNewDescription(e.target.value);
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            rename({
                                variables: {
                                    id,
                                    description: newDescription,
                                },
                            });
                            setNewDescription('');
                            setSelected(false);
                        }}
                    >
                        Save
                    </button>
                    <button onClick={() => setSelected(false)}>Cancel</button>
                </>
            )}
            {!selected && (
                <Anchor
                    onClick={() => {
                        setNewDescription(description);
                        setSelected(true);
                    }}
                >
                    rename
                </Anchor>
            )}
            <ListItems id={id} />
        </Container>
    );
};
```
