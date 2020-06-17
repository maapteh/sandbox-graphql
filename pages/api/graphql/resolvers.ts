import { Resolvers } from '../../../codegen/_resolvers';
import { GraphQLError } from 'graphql';

export const resolvers: Resolvers = {
    Query: {
        simple: () => {
            console.log('[server] GraphQL server query: simple');
            return 'Welcome to the AH GraphQL workshop';
        },
        spacexShips: async () => {
            const response = await fetch(
                'https://api.spacexdata.com/v4/launches/latest',
            );

            if (response.status < 200 || response.status >= 300) {
                throw new GraphQLError('spacex error');
            }

            const data = await response.json();

            if (!data || data.length === 0) {
                return null;
            }

            return data.ships.map((ship: string) => {
                return {
                    id: ship,
                };
            });
        },
    },

    // now info gets information of our dataloader
    SpacexShip: {
        info: async (ship, _, context) =>
            context.spacexShipLoader.load(ship.id),
    },

    SpacexLaunch: {
        images: async (ship, _, context) =>
            context.spacexLaunchLoader.load(ship.id),
    },
};
