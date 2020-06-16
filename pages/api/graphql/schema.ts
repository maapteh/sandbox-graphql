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
        lists: [List!]
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
`;
