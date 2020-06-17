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
        // new endpoint, just using same dataloader for the other info
        spacexShip: (_, { id }, context) => {
            // TODO: check if id is excitsing else return null
            return {
                id,
            };
        },
    },

    // now info gets information of our dataloader
    SpacexShip: {
        info: async (ship, _, context) => {
            if (ship.id) {
                return context.spacexShipLoader.load(ship.id);
            } else {
                return null;
            }
        },
    },

    SpacexLaunch: {
        images: async (ship, _, context) =>
            context.spacexLaunchLoader.load(ship.id),
    },
};
