import { Resolvers } from '../../../codegen/_graphql';
import { GraphQLError } from 'graphql';

export const resolvers: Resolvers = {
    Query: {
        simple: () => {
            console.log('[server] GraphQL server query: simple');
            return 'Welcome to the AH GraphQL workshop';
        },

        covidHistorical: async (_, { size = 10, country }) => {
            const response = await fetch(
                `https://disease.sh/v2/historical?lastdays=${size}`,
            );

            if (response.status < 200 || response.status >= 300) {
                throw new GraphQLError('Covid error');
            }

            const data = await response.json();

            if (!data || data.length === 0) {
                return null;
            }

            // We can't use auto typing and wont type ourselves until service fixes this!
            const dates = Object.keys(data[0].timeline.cases);

            const results = data
                .map((item: any) => {
                    if (country && item.country !== country) {
                        return null;
                    }

                    return {
                        country: item.country,
                        province: item.province,
                        cases: Object.values(item.timeline.cases),
                        deaths: Object.values(item.timeline.deaths),
                        recovered: Object.values(item.timeline.recovered),
                    };
                })
                .filter(Boolean);

            return {
                dates,
                results,
            };
        },
    },
};
