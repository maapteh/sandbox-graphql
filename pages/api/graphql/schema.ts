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
        spacexShips: [SpacexShip!] @cacheControl(maxAge: 600, scope: PUBLIC)
    }

    """
    Spacex ship
    """
    type SpacexShip @cacheControl(maxAge: 600, scope: PUBLIC) {
        """
        Identification string of the space ship
        """
        id: ID!
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
    type SpacexShipInfo @cacheControl(maxAge: 600, scope: PUBLIC) {
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
    type SpacexLaunch @cacheControl(maxAge: 600, scope: PUBLIC) {
        """
        Launch identification
        """
        id: ID!
        """
        Collection of image urls
        """
        images: [String!]
    }

    """
    cache control
    """
    enum CacheControlScope {
        """
        Personal data, based on jwt token and locale (see server.ts)
        """
        PRIVATE
        """
        Public data, non personal
        """
        PUBLIC
    }

    """
    For how long to cache queries, fields
    """
    directive @cacheControl(
        maxAge: Int
        scope: CacheControlScope
    ) on OBJECT | FIELD_DEFINITION | INTERFACE
`;
