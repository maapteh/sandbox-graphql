import gql from 'graphql-tag';

export const typeDefs = gql`
    type Query {
        """
        Have a simple example
        """
        simple: String

        """
        Show all spacex ships
        """
        spacexShips: [SpacexShip!]
    }

    """
    Spacex ship
    """
    type SpacexShip {
        """
        Identification string of the space ship
        """
        id: ID
    }
`;
