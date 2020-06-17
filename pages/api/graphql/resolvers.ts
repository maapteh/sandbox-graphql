import {
    Resolvers,
    ListItem,
    ListItemRecipe,
} from '../../../codegen/_resolvers';
import { listService } from './__mocks__/list-mocks';
import { productDataLoader, productService } from './__mocks__/product-mocks';

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
        products: () => {
            return productService.all();
        },
    },
    Mutation: {
        listRename: (_, { id, description }) => {
            return listService.patch(id, { description })
                ? listService.single(id)
                : null;
        },
        listAddProduct: (_, { productId, listId }) => {
            const product = productService.single(productId);
            if (!product) {
                return null;
            }
            return listService.addProduct(listId, productId);
        },
        listRemoveProduct: (_, { productId, listId }) => {
            const product = productService.single(productId);
            if (!product) {
                return null;
            }
            return listService.removeProduct(listId, productId);
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
