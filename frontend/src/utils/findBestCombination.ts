import { Product } from '../types/Product';

export function findBestCombination(products: Product[], budget: number): Product[] {
    let bestCombo: Product[] = [];
    let maxTotal = 0;

    const n = products.length;

    for (let i = 0; i < 1 << n; i++) {
        const combo: Product[] = [];
        let total = 0;

        for (let j = 0; j < n; j++) {
        if (i & (1 << j)) {
            total += products[j].price;
            combo.push(products[j]);
        }
        }

        if (total <= budget && total > maxTotal) {
        bestCombo = combo;
        maxTotal = total;
        }
    }

    return bestCombo;
}
