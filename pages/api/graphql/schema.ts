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
        ): CovidHistorical
    }

    """
    Historical Covid data for countries
    """
    type CovidHistorical {
        """
        The last x days, default is 10 when not passed
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
        Known amount of Covid cases
        """
        cases: [Int!]!
        """
        Known amount of Covid deaths
        """
        deaths: [Int!]!
        """
        Known amount of Covid reciveries
        """
        recovered: [Int!]!
    }
`;
