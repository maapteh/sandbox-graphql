import gql from 'graphql-tag';

export const typeDefs = gql`
    type Query {
        """
        Have a simple example
        """
        simple: String

        """
        Get historical data of all countries
        """
        covidHistorical(
            """
            Amount of days in the past, till now
            """
            days: Int
            """
            Specific country you are interested in, for example "**Netherlands**"
            """
            country: String
        ): CovidHistorical
    }

    """
    Historical Covid data for countries
    """
    type CovidHistorical {
        """
        The last ten days
        """
        dates: [String!]!
        """
        The Covid results for the countries
        """
        results: [CovidTimelineCountry!]!
    }

    """
    Covid results per country showing cases, deaths and recoverd
    """
    type CovidTimelineCountry {
        """
        Country name
        """
        country: String!
        """
        Province
        """
        province: String
        """
        Known total amount of Covid cases
        """
        cases: [Int!]!
        """
        Known total amount of Covid deaths
        """
        deaths: [Int!]!
        """
        Known total amount of Covid reciveries
        """
        recovered: [Int!]!
    }
`;
