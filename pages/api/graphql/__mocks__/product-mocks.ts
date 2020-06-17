import { Product } from '../../../../codegen/_graphql';
import Dataloader from 'dataloader';

const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        price: 0.8,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_43545239363538373931_1_200x200_JPG.JPG?options=399,q85',
        description: 'AH Bruin heel',
    },
    {
        id: 2,
        price: 2.09,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_43545239353339373938_3_200x200_JPG.JPG?options=399,q85',
        description: 'AH Pindakaas naturel',
    },
    {
        id: 1,
        price: 0.85,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_434d50303338353636_2_200x200_JPG.JPG?options=399,q85',
        description: 'Halfvolle melk',
    },
    {
        id: 3,
        price: 1.66,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_434d50303637333139_6_200x200_JPG.JPG?options=399,q85',
        description: 'AH Stroopwafels',
    },
    {
        id: 4,
        price: 0.8,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_43545239363538373931_1_200x200_JPG.JPG?options=399,q85',
        description: 'AH Bruin heel',
    },
    {
        id: 5,
        price: 1.19,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_43545239363439393435_1_200x200_JPG.JPG?options=399,q85',
        description: 'Delicata puur 85%',
    },
    {
        id: 6,
        price: 1.59,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_434d50323738333538_5_200x200_JPG.JPG?options=399,q85',
        description: 'Delicate reep melk',
    },
    {
        id: 7,
        price: 2.89,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_434d50313432303831_1_200x200_JPG.JPG?options=399,q85',
        description: `Tony's Chocolonely Melk`,
    },
    {
        id: 8,
        price: 3.99,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_43545239353732343037_2_200x200_JPG.JPG?options=399,q85',
        description: `M&M's Pinda`,
    },
    {
        id: 9,
        price: 2.79,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_43545237313130343739_1_LowRes_JPG.JPG?options=399,q85',
        description: 'Maltesers Chocolade - middel',
    },
    {
        id: 10,
        price: 1.29,
        thumbnail:
            'https://static.ah.nl/image-optimization/static/product/AHI_43545239353735383139_2_LowRes_JPG.JPG?options=399,q85',
        description: `Oreo Original koekjes`,
    },
];

export const productService = {
    all() {
        return MOCK_PRODUCTS;
    },
    single(id: number) {
        return MOCK_PRODUCTS.find((x) => x.id === id) || null;
    },
    many(ids: readonly number[]) {
        return ids.map((id) => MOCK_PRODUCTS.find((x) => x.id === id) || null);
    },
};

export const productDataLoader = new Dataloader((ids: readonly number[]) => {
    return Promise.resolve(productService.many(ids));
});
