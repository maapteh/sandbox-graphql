import {
    Resolvers,
    ListItem,
    ListItemRecipe,
} from '../../../codegen/_resolvers';
import { listService } from './__mocks__/list-mocks';
import { productDataLoader } from './__mocks__/product-mocks';

export const resolvers: Resolvers = {
    Query: {
        simple: () => {
            console.log('[server] GraphQL server query: simple');
            return 'Welcome to the AH GraphQL workshop';
        },
        lists: (_, { start, size }) => {
            return listService.all(start, size || 5);
        },
        list: (_, { id }) => {
            return listService.single(id);
        },
    },
    Mutation: {
        listRename: (_, { id, description }) => {
            return listService.patch(id, { description })
                ? listService.single(id)
                : null;
        },
    },
    List: {
        items: (list) => listService.items(list.id),
    },
    ListItem: {
        __resolveType(obj: ListItem) {
            return (obj as ListItemRecipe).title
                ? 'ListItemRecipe'
                : 'ListItemProduct';
        },
    },
    ListItemProduct: {
        product: (listItem) => {
            return productDataLoader.load(listItem.id);
        },
    },
};
