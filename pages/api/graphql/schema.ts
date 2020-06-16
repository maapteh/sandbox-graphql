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

    extend type SpacexShip {
        """
        Basic ship information
        """
        info: SpacexShipInfo
    }

    """
    Ship information
    """
    type SpacexShipInfo {
        """
        Ship type, can also be enum now kept as string for simplicity
        """
        type: String!
        """
        Image url with the space ship
        """
        image: String!
        """
        Launches this ship did
        """
        launches: [SpacexLaunch!]
    }

    """
    Launch information
    """
    type SpacexLaunch {
        """
        Launch identification
        """
        id: ID
        """
        Collection of image urls
        """
        images: [String!]
    }

`;
