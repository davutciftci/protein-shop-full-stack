// Aroma options with their display colors
export const AROMAS = [
    { name: 'Limonata', color: '#FFD700' },
    { name: 'Yeşil Elma', color: '#7CFC00' },
    { name: 'Tiger Blood', color: '#FF6B35' },
    { name: 'Dragon Blood', color: '#DC143C' },
    { name: 'Çikolata', color: '#5D3A1A' },
    { name: 'Çilek', color: '#FF4D6D' },
    { name: 'Cookie & Cream', color: '#D2B48C' },
    { name: 'Muz', color: '#FFE135' },
    { name: 'Choco Nut', color: '#6B4423' },
    { name: 'Birthday Cake', color: '#FFB6C1' },
    { name: 'Bisküvi', color: '#C4A35A' },
    { name: 'Salted Caramel', color: '#C68E17' },
    { name: 'Blueberry', color: '#4169E1' },
];

// Size options for product variants
export const SIZES = [
    '200g',
    '400g',
    '600g',
    '800g',
    '1kg',
    '1.2kg',
    '1.4kg',
    '1.6kg',
    '1.8kg',
    '2kg',
    '2.5kg',
    '3kg',
    '4kg',
    '6kg',
];

// Helper function to get aroma color by name
export const getAromaColor = (aromaName: string): string => {
    const aroma = AROMAS.find(a => a.name.toLowerCase() === aromaName?.toLowerCase());
    return aroma?.color || '#000000';
};
