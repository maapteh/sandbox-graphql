import { ListItemRecipe, ListItemProduct } from '../../../codegen/_graphql';

export const isListItemRecipe = (
    item: ListItemProduct | ListItemRecipe,
): item is ListItemRecipe => {
    return item.__typename === 'ListItemRecipe';
};
