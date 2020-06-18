import { ListItemRecipe, ListItemProduct } from '../../../codegen/_graphql';

export const isListItemProduct = (
    item: ListItemProduct | ListItemRecipe,
): item is ListItemProduct => {
    return item && item.__typename === 'ListItemProduct';
};
