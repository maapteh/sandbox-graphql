import gql from 'graphql-tag';

export const typeDefs = gql`
    type Query {
        """
        Have a simple example
        """
        simple: String
        """
        Get all the favorite lists this user has made
        """
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
        """
        Get list by id
        """
        list(
            """
            Id of list
            """
            id: Int!
        ): List
        """
        Get a single product
        """
        product(id: Int!): Product
        """
        "
        Get all products
        """
        products: [Product!]
    }

    type Mutation {
        listRename(id: Int!, description: String!): List
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

    """
    Paged result of lists query
    """
    type ListsResult {
        """
        Paged collection
        """
        result: [List!]
        """
        Total amount of items in collection
        """
        total: Int!
    }

    """
    Favorite list
    """
    type List {
        """
        Id of list
        """
        id: Int!
        """
        Description entered by user
        """
        description: String!
    }

    type ListItemProduct {
        """
        Id of product
        """
        id: Int!
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

    extend type List {
        """
        Items contained in list
        """
        items: [ListItem!]
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

    extend type ListItemProduct {
        product: Product
    }
`;
