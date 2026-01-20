/**
 * KDV dahil fiyat hesaplama
 * @param basePrice - KDV hariç fiyat
 * @param taxRate - KDV oranı (%)
 * @returns KDV dahil fiyat
 */
export const calculatePriceWithTax = (basePrice: number, taxRate: number): number => {
    return basePrice * (1 + taxRate / 100);
};

/**
 * Varyant için KDV dahil fiyat hesaplama
 * @param variantPrice - Varyant fiyatı (KDV hariç)
 * @param productTaxRate - Ürünün KDV oranı (%)
 * @returns KDV dahil fiyat
 */
export const calculateVariantPriceWithTax = (variantPrice: number, productTaxRate: number): number => {
    return calculatePriceWithTax(variantPrice, productTaxRate);
};

/**
 * Fiyat bilgilerini formatla (KDV hariç ve dahil)
 * @param price - KDV hariç fiyat
 * @param taxRate - KDV oranı (%)
 * @returns Formatlanmış fiyat bilgileri
 */
export const formatPriceInfo = (price: number, taxRate: number) => {
    return {
        price: Number(price.toFixed(2)),
        priceWithTax: Number(calculatePriceWithTax(price, taxRate).toFixed(2)),
        taxRate: Number(taxRate.toFixed(2)),
    };
};
