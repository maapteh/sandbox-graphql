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
    }

    type Mutation {
        listRename(id: Int!, description: String!): List
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
`;
