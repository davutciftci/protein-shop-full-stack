import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, CreditCard, Phone } from 'lucide-react';

const PRODUCT_CATEGORIES = [
    { name: 'Protein Tozları', icon: '💪', link: '/urunler?kategori=protein' },
    { name: 'Amino Asitler', icon: '🧬', link: '/urunler?kategori=amino' },
    { name: 'Vitaminler', icon: '💊', link: '/urunler?kategori=vitamin' },
    { name: 'Spor Gıdaları', icon: '🏋️', link: '/urunler?kategori=spor' },
    { name: 'Sağlıklı Atıştırmalıklar', icon: '🍪', link: '/urunler?kategori=atistirmalik' },
    { name: 'Kilo Kontrolü', icon: '⚖️', link: '/urunler?kategori=kilo' },
];

const FEATURED_PRODUCTS = [
    {
        id: 1,
        name: 'Whey Protein Tozu',
        brand: 'OJS Nutrition',
        price: 299.90,
        oldPrice: 399.90,
        rating: 4.8,
        reviews: 156,
        image: '/images/Picture → image_360.webp.png',
        badge: 'ÇOK SATAN'
    },
    {
        id: 2,
        name: 'BCAA 2:1:1',
        brand: 'OJS Nutrition',
        price: 199.90,
        oldPrice: null,
        rating: 4.6,
        reviews: 89,
        image: '/images/Picture → image_360.webp (1).png',
        badge: 'YENİ'
    },
    {
        id: 3,
        name: 'Creatine Monohydrate',
        brand: 'OJS Nutrition',
        price: 149.90,
        oldPrice: 179.90,
        rating: 4.9,
        reviews: 203,
        image: '/images/Picture → image_360.webp (2).png',
        badge: 'İNDİRİM'
    },
    {
        id: 4,
        name: 'Multivitamin',
        brand: 'OJS Nutrition',
        price: 99.90,
        oldPrice: null,
        rating: 4.7,
        reviews: 124,
        image: '/images/Picture → gunlukvitamin.webp.png',
        badge: null
    },
];

// Kategori kartları için veri dizisi
const CATEGORY_CARDS = [
    {
        id: 1,
        title: 'PROTEİN',
        image: '/images/1 871.png',
        bgColor: 'var(--color-card-bg)',
        link: '/urunler?kategori=protein'
    },
    {
        id: 2,
        title: 'VİTA-\nMİNLER',
        image: '/images/252.png',
        bgColor: '#FDE8D7',
        link: '/urunler?kategori=vitamin'
    },
    {
        id: 3,
        title: 'SAĞLIK',
        image: '/images/3 101.png',
        bgColor: '#CCCBC6',
        link: '/urunler?kategori=saglik'
    },
    {
        id: 4,
        title: 'SPOR\nGIDALARI',
        image: '/images/5 101.png',
        bgColor: '#D9D8D3',
        link: '/urunler?kategori=spor'
    },
    {
        id: 5,
        title: 'GIDA',
        image: '/images/7 100.png',
        bgColor: '#72B4CE',
        link: '/urunler?kategori=gida'
    },
    {
        id: 6,
        title: 'TÜM\nÜRÜNLER',
        image: '/images/Group 11.png',
        bgColor: '#E8DFD5',
        link: '/urunler'
    }
];

export default function HomePage() {
    return (
        <div className="bg-white">
            {/* Hero Slider/Banner */}
            <section className="relative">
                <div className="w-full">
                    <img
                        src="/images/header.jpg"
                        alt="OJS Nutrition - Spor Gıdaları"
                        className="w-full h-full object-cover md:object-contain"
                        style={{ minHeight: '50vh', maxHeight: '100vh', filter: 'brightness(1.2)' }}
                    />
                </div>
            </section>

            {/* Features - Category Cards */}
            <section className="py-4 flex justify-center px-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-[1200px]">
                    {CATEGORY_CARDS.map((card) => (
                        <div
                            key={card.id}
                            className="relative rounded-xl overflow-hidden aspect-[384/157]"
                            style={{ backgroundColor: card.bgColor }}
                        >
                            <img
                                src={card.image}
                                alt={card.title.replace('\n', ' ')}
                                className="absolute left-0 top-0 h-full w-auto object-contain"
                            />
                            <div className="absolute inset-y-0 right-3 flex flex-col items-end justify-center gap-1">
                                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-black text-right whitespace-pre-line leading-tight">
                                    {card.title}
                                </h3>
                                <Link
                                    to={card.link}
                                    className="bg-black text-white px-4 sm:px-6 lg:px-10 py-1 rounded-lg text-xs lg:text-sm font-bold mt-1"
                                >
                                    İNCELE
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ÇOK SATANLAR */}
            <section className="py-8 px-4">
                <h2 className="text-2xl font-bold text-center mb-6">ÇOK SATANLAR</h2>
                <div className="grid grid-cols-6 gap-4">
                    {/* Product cards will go here */}
                </div>
            </section>

            {/* Categories */}
            <section className="py-12">

            </section>

            {/* Featured Products */}
            <section className="py-12">

            </section>

        </div>
    );
}
