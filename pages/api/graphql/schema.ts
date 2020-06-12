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
        covidHistorical: CovidHistorical
    }

    """
    Historical Covid data for countries

    A better solution for this excersise would be the following:

    query covidHistorical: [covidHistorical!] where covidHistorical would be:

    date: String (Bonus when you used custom Date scalar, for strictly typing!)
    countries: [covidHistoricalCountry!]!

    covidHistoricalCountry:
    code: CountryCode!, province: String, cases: Int!, death: Int!, recovered: Int!

    Just proceed with one of these two, to the bonus questions to find out why the better solution above works better :) Playing, moving, shifting is what schematising is all about. Your output model is very important, more then you are used to in Rest where you just build it based on one scenario and just add more fields later on. Untill there are so many fields and you dont know what is what anymore.

    Advise: dont't rush things, never take your resources naming always as is
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
