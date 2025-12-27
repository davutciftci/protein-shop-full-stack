export interface Aroma {
    name: string;
    color: string;
}

export interface Size {
    weight: string;
    servings: string;
    discount?: number;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    brand: string;
    price: number;
    oldPrice: number | null;
    pricePerServing: number;
    rating: number;
    reviews: number;
    image: string;
    badge: string | null;
    discountPercentage: number | null;
    category: string;
    tags: string[];
    aromas: Aroma[];
    sizes: Size[];
    expirationDate: string;
    features: string[];
    nutritionInfo: string[];
    usage: string[];
    fullDescription: string;
}

export interface Review {
    id: number;
    productId: number;
    userName: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'WHEY PROTEIN',
        slug: 'whey-protein',
        description: 'EN ÇOK TERCİH EDİLEN PROTEİN TAKVİYESİ',
        brand: 'OJS Nutrition',
        price: 549,
        oldPrice: null,
        pricePerServing: 34.31,
        rating: 5,
        reviews: 10869,
        image: '/src/img/anasayfa/1.jpg',
        badge: 'ÇOK SATAN',
        discountPercentage: null,
        category: 'protein',
        tags: ['VEJETARYEN', 'GLUTENSİZ'],
        aromas: [
            { name: 'Bisküvi', color: '#D4A574' },
            { name: 'Çikolata', color: '#4A3728' },
            { name: 'Muz', color: '#FFE135' },
            { name: 'Salted Caramel', color: '#C68642' },
            { name: 'Choco Nut', color: '#5C4033' },
            { name: 'Hindistan Cevizi', color: '#8B4513' },
            { name: 'Raspberry Cheesecake', color: '#E30B5C' },
            { name: 'Çilek', color: '#FC5A8D' }
        ],
        sizes: [
            { weight: '400G', servings: '16 servis' },
            { weight: '1.6KG', servings: '64 servis' },
            { weight: '1.6KG X 2 ADET', servings: '128 servis', discount: 6 }
        ],
        expirationDate: '07.2025',
        features: [
            'Her serviste 24g yüksek kaliteli protein',
            'Hızlı emilim özelliği',
            'Kas gelişimini destekler',
            'Düşük yağ ve karbonhidrat içeriği',
            'GMP sertifikalı tesislerde üretilmiştir'
        ],
        nutritionInfo: [
            'Kalori: 120 kcal',
            'Protein: 24g',
            'Karbonhidrat: 3g',
            'Yağ: 1.5g',
            'BCAA: 5.5g',
            'Glutamin: 4g'
        ],
        usage: [
            '1 ölçek (30g) tozu 200-250ml su veya süt ile karıştırın',
            'Antrenman sonrası 30 dakika içinde tüketin',
            'Günde 1-2 porsiyon önerilir',
            'Shaker kullanmanız tavsiye edilir'
        ],
        fullDescription: 'OJS Nutrition Whey Protein, yüksek kaliteli whey protein konsantresi ve izolatı karışımından oluşan premium bir protein takviyesidir.'
    },
    {
        id: 2,
        name: 'FITNESS PAKETİ',
        slug: 'fitness-paketi',
        description: 'EN POPÜLER ÜRÜNLER BİR ARADA',
        brand: 'OJS Nutrition',
        price: 799,
        oldPrice: 1126,
        pricePerServing: 8.88,
        rating: 5,
        reviews: 7650,
        image: '/src/img/anasayfa/2.jpg',
        badge: 'İNDİRİM',
        discountPercentage: 29,
        category: 'paket',
        tags: ['AVANTAJLI', 'POPÜLER'],
        aromas: [
            { name: 'Karışık', color: '#8B4513' }
        ],
        sizes: [
            { weight: '3.5KG', servings: '90+ servis' }
        ],
        expirationDate: '09.2025',
        features: [
            'Whey Protein + BCAA + Creatine içerir',
            'Komple fitness paketi',
            'Tasarruflu paket fiyatı',
            'Antrenman performansını artırır'
        ],
        nutritionInfo: [
            'Kalori: 150 kcal (protein başına)',
            'Protein: 28g',
            'Karbonhidrat: 5g',
            'Yağ: 2g'
        ],
        usage: [
            'Protein: Antrenman sonrası 1 ölçek',
            'BCAA: Antrenman sırası 1 ölçek',
            'Creatine: Günde 5g'
        ],
        fullDescription: 'Fitness hedefinize ulaşmak için ihtiyacınız olan her şey bu pakette!'
    },
    {
        id: 3,
        name: 'GÜNLÜK VİTAMİN PAKETİ',
        slug: 'gunluk-vitamin-paketi',
        description: 'EN SIK TÜKETİLEN TAKVİYELER',
        brand: 'OJS Nutrition',
        price: 549,
        oldPrice: 717,
        pricePerServing: 9.15,
        rating: 5,
        reviews: 5013,
        image: '/src/img/anasayfa/3.jpg',
        badge: 'İNDİRİM',
        discountPercentage: 23,
        category: 'vitamin',
        tags: ['DOĞAL', 'GÜNLÜK'],
        aromas: [
            { name: 'Tablet', color: '#FFFFFF' }
        ],
        sizes: [
            { weight: '180 Tablet', servings: '60 gün' },
            { weight: '360 Tablet', servings: '120 gün', discount: 10 }
        ],
        expirationDate: '12.2025',
        features: [
            'Multivitamin + D3 + Omega-3',
            'Bağışıklık sistemini güçlendirir',
            'Enerji metabolizmasını destekler',
            'Günlük vitamin ihtiyacını karşılar'
        ],
        nutritionInfo: [
            'Vitamin A: 800mcg',
            'Vitamin C: 80mg',
            'Vitamin D3: 2000IU',
            'Vitamin E: 12mg',
            'Omega-3: 1000mg'
        ],
        usage: [
            'Günde 1 tablet multivitamin',
            'Günde 1 yumuşak kapsül D3',
            'Günde 1 yumuşak kapsül Omega-3',
            'Yemeklerle birlikte alın'
        ],
        fullDescription: 'Günlük vitamin ihtiyacınızı karşılayan kapsamlı bir paket.'
    },
    {
        id: 4,
        name: 'PRE-WORKOUT SUPREME',
        slug: 'pre-workout-supreme',
        description: 'ANTRENMAN ÖNCESİ TAKVİYESİ',
        brand: 'OJS Nutrition',
        price: 399,
        oldPrice: null,
        pricePerServing: 9.98,
        rating: 5,
        reviews: 6738,
        image: '/src/img/anasayfa/4.jpg',
        badge: null,
        discountPercentage: null,
        category: 'preworkout',
        tags: ['ENERJİ', 'PERFORMANS'],
        aromas: [
            { name: 'Mango', color: '#FF8C00' },
            { name: 'Limon', color: '#FFF44F' },
            { name: 'Karpuz', color: '#FF6B6B' }
        ],
        sizes: [
            { weight: '400G', servings: '40 servis' },
            { weight: '800G', servings: '80 servis', discount: 8 }
        ],
        expirationDate: '10.2025',
        features: [
            '200mg kafein içerir',
            'Beta-alanin ve sitrülin malat',
            'Enerji ve odaklanma sağlar',
            'Kas pompası artırır'
        ],
        nutritionInfo: [
            'Kafein: 200mg',
            'Beta-Alanin: 3.2g',
            'Sitrülin Malat: 6g',
            'L-Arginin: 3g'
        ],
        usage: [
            '1 ölçeği 300ml su ile karıştırın',
            'Antrenmandan 20-30 dk önce için',
            'Günde 1 porsiyonu aşmayın',
            'Akşam saatlerinde kullanmayın'
        ],
        fullDescription: 'Antrenman performansınızı artırmak için formüle edilmiş güçlü pre-workout takviyesi.'
    },
    {
        id: 5,
        name: 'CREAM OF RICE',
        slug: 'cream-of-rice',
        description: 'EN LEZZETLİ PİRİNÇ KREMASI',
        brand: 'OJS Nutrition',
        price: 239,
        oldPrice: null,
        pricePerServing: 11.95,
        rating: 5,
        reviews: 5216,
        image: '/src/img/anasayfa/5.jpg',
        badge: null,
        discountPercentage: null,
        category: 'gida',
        tags: ['DOĞAL', 'KARBONHİDRAT'],
        aromas: [
            { name: 'Çikolata', color: '#4A3728' },
            { name: 'Vanilya', color: '#F3E5AB' },
            { name: 'Tarçın', color: '#D2691E' }
        ],
        sizes: [
            { weight: '1KG', servings: '20 servis' },
            { weight: '2KG', servings: '40 servis', discount: 5 }
        ],
        expirationDate: '08.2025',
        features: [
            'Yüksek kaliteli karbonhidrat kaynağı',
            'Kolay sindirilebilir',
            'Hızlı enerji sağlar',
            'Gluten içermez'
        ],
        nutritionInfo: [
            'Kalori: 180 kcal',
            'Protein: 4g',
            'Karbonhidrat: 38g',
            'Yağ: 0.5g'
        ],
        usage: [
            '50g tozu 150ml sıcak su ile karıştırın',
            'İsteğe göre meyve veya bal ekleyin',
            'Antrenman öncesi veya sonrası tüketin'
        ],
        fullDescription: 'Hızlı ve kolay hazırlanan, lezzetli pirinç kreması.'
    },
    {
        id: 6,
        name: 'CREATINE',
        slug: 'creatine',
        description: 'EN POPÜLER SPORCU TAKVİYESİ',
        brand: 'OJS Nutrition',
        price: 239,
        oldPrice: null,
        pricePerServing: 2.39,
        rating: 5,
        reviews: 8558,
        image: '/src/img/anasayfa/6.jpg',
        badge: null,
        discountPercentage: null,
        category: 'spor',
        tags: ['PERFORMANS', 'GÜÇ'],
        aromas: [
            { name: 'Aromasız', color: '#FFFFFF' }
        ],
        sizes: [
            { weight: '300G', servings: '60 servis' },
            { weight: '500G', servings: '100 servis' },
            { weight: '1KG', servings: '200 servis', discount: 12 }
        ],
        expirationDate: '11.2025',
        features: [
            'Saf kreatin monohidrat',
            'Mikronize formül',
            'Kas gücünü artırır',
            'Hızlı emilim'
        ],
        nutritionInfo: [
            'Kreatin Monohidrat: 5g (porsiyon)',
            'Kalori: 0 kcal',
            'Protein: 0g',
            'Karbonhidrat: 0g'
        ],
        usage: [
            'Yükleme fazı: Günde 4x5g (1 hafta)',
            'İdame fazı: Günde 1x5g',
            'Su veya meyve suyu ile karıştırın',
            'Antrenman günlerinde antrenman sonrası alın'
        ],
        fullDescription: 'Saf kreatin monohidrat takviyesi. Kas gücünü ve dayanıklılığı artırır.'
    }
];

export const REVIEWS: Review[] = [
    {
        id: 1,
        productId: 1,
        userName: 'Ahmet Y.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Harika bir ürün! Tadı çok güzel ve çözünürlüğü mükemmel. Kesinlikle tavsiye ederim.',
        verified: true
    },
    {
        id: 2,
        productId: 1,
        userName: 'Mehmet K.',
        rating: 5,
        date: '2024-01-10',
        comment: 'Antrenman sonrası hızlı toparlanmamı sağlıyor. Kalitesi gerçekten üst düzey.',
        verified: true
    },
    {
        id: 3,
        productId: 1,
        userName: 'Elif S.',
        rating: 4,
        date: '2024-01-05',
        comment: 'Güzel ürün ama biraz tatlı buldum. Performans olarak çok memnunum.',
        verified: true
    },
    {
        id: 4,
        productId: 1,
        userName: 'Can D.',
        rating: 5,
        date: '2023-12-28',
        comment: '2 yıldır kullanıyorum, asla başka markaya geçmem. Fiyat/performans oranı mükemmel.',
        verified: true
    },
    {
        id: 5,
        productId: 2,
        userName: 'Burak T.',
        rating: 5,
        date: '2024-01-12',
        comment: 'Paket olarak almak çok avantajlı. Tüm ürünler kaliteli.',
        verified: true
    },
    {
        id: 6,
        productId: 2,
        userName: 'Zeynep A.',
        rating: 5,
        date: '2024-01-08',
        comment: 'Hediye olarak aldım, çok beğenildi. Ambalajı da çok şık.',
        verified: true
    },
    {
        id: 7,
        productId: 3,
        userName: 'Ali R.',
        rating: 5,
        date: '2024-01-14',
        comment: 'Vitamin eksikliğim giderildi, kendimi çok daha enerjik hissediyorum.',
        verified: true
    },
    {
        id: 8,
        productId: 4,
        userName: 'Deniz M.',
        rating: 5,
        date: '2024-01-11',
        comment: 'Pre-workout olarak en iyisi! Antrenman motivasyonum arttı.',
        verified: true
    },
    {
        id: 9,
        productId: 5,
        userName: 'Selin K.',
        rating: 5,
        date: '2024-01-09',
        comment: 'Kahvaltıda tüketiyorum, doyurucu ve lezzetli.',
        verified: true
    },
    {
        id: 10,
        productId: 6,
        userName: 'Oğuz B.',
        rating: 5,
        date: '2024-01-07',
        comment: 'Kreatin kalitesi çok iyi, sonuçları hemen fark ettim.',
        verified: true
    }
];

export const getProductById = (id: number): Product | undefined => {
    return PRODUCTS.find(product => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
    return PRODUCTS.find(product => product.slug === slug);
};

export const getReviewsByProductId = (productId: number): Review[] => {
    return REVIEWS.filter(review => review.productId === productId);
};

export const getRelatedProducts = (productId: number, limit: number = 4): Product[] => {
    return PRODUCTS.filter(product => product.id !== productId).slice(0, limit);
};
