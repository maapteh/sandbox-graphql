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

    type List {
        id: Int!
        description: String!
    }
`;
