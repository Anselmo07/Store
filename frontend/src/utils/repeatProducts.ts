import { Product } from '../types/Product';

export const repeatProducts = (products: Product[], minCount: number): Product[] => {
    if (products.length === 0) return [];

    const result: Product[] = [];
    while (result.length < minCount) {
        result.push(...products);
    }
    return result.slice(0, minCount);
};
