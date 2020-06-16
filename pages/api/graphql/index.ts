import { ApolloServer, gql, ApolloError } from 'apollo-server-micro';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const Dataloader = require('dataloader');

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    debug: false,
    cacheControl: true,
    plugins: [responseCachePlugin()],
    context: ({ req }) => {
        return {
            // we are putting this dataloader on the context
            spacexShipLoader: new Dataloader(async (ids: number[]) => {
                console.log(`dataloader called for ${ids}`);

                // normally we would pass all id's to a service endpoint
                // but our service doesn't provide one yet so we start
                // a poor mens batching. When service added it we can simply
                // retrieve its information and give it back in same id's order
                // be sure when no information it should return null
                const collection = await Promise.all(
                    ids.map(async id => {
                        const response = await fetch(
                            `https://api.spacexdata.com/v4/ships/${id}`,
                        );
    
                        if (response.status < 200 || response.status >= 300) {
                            // TODO: also fill up error
                            return null;
                        }
    
                        const data = await response.json();
    
                        if (!data) {
                            return null;
                        }
    
                        return {
                            type: data.type,
                            image: data.image,
                            launches: data.launches.map((id: string) => {
                                return {
                                    id
                                }
                            })
                        }
                    })
                )

                return collection;
            }),


            spacexLaunchLoader: new Dataloader(async (ids: number[]) => {
                console.log(`dataloader called for ${ids}`);

                // normally we would pass all id's to a service endpoint
                // but our service doesn't provide one yet so we start
                // a poor mens batching. When service added it we can simply
                // retrieve its information and give it back in same id's order
                // be sure when no information it should return null
                const collection = await Promise.all(
                    ids.map(async id => {
                        const response = await fetch(
                            `https://api.spacexdata.com/v4/launches/${id}`,
                        );
    
                        if (response.status < 200 || response.status >= 300) {
                            // TODO: also fill up error
                            return null;
                        }
    
                        const data = await response.json();
    
                        if (!data) {
                            return null;
                        }

                        return data?.links?.flickr?.original || null
                    })
                )

                return collection;
            }),
        };
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
