import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

const PRODUCT_CATEGORIES = [
    { name: 'Protein Tozları', icon: '💪', link: '/urunler?kategori=protein' },
    { name: 'Amino Asitler', icon: '🧬', link: '/urunler?kategori=amino' },
    { name: 'Vitaminler', icon: '💊', link: '/urunler?kategori=vitamin' },
    { name: 'Spor Gıdaları', icon: '🏋️', link: '/urunler?kategori=spor' },
    { name: 'Sağlıklı Atıştırmalıklar', icon: '🍪', link: '/urunler?kategori=atistirmalik' },
    { name: 'Kilo Kontrolü', icon: '⚖️', link: '/urunler?kategori=kilo' },
];

const FEATURED_PRODUCTS = PRODUCTS;

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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
            <section className="py-4 px-4 overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
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
                                <div className="absolute inset-y-0 right-4 flex flex-col items-end justify-center gap-1 w-[140px] sm:w-[180px]">
                                    <div className="h-12 sm:h-16 flex items-end justify-end">
                                        <h3 className="text-base sm:text-lg lg:text-xl font-black text-black text-right whitespace-pre-line leading-tight">
                                            {card.title}
                                        </h3>
                                    </div>
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
                </div>
            </section>

            {/* ÇOK SATANLAR */}
            <section className="py-8 px-4">
                <div className="container-custom">
                    <h2 className="text-xl font-bold text-center mb-8 tracking-wider">ÇOK SATANLAR</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {FEATURED_PRODUCTS.map((product, index) => {
                            // Mobile-only image and order mapping
                            const mobileImageMap: { [key: number]: string } = {
                                1: '/src/img/anasayfa/whey-protein.jpg', // WHEY PROTEIN
                                2: '/src/img/anasayfa/fitness-package.jpg', // FITNESS PAKETİ
                                3: '/src/img/anasayfa/pea-protein.jpg', // GÜNLÜK VİTAMİN
                                4: '/src/img/anasayfa/micellar-casein.jpg', // PRE-WORKOUT
                                5: '/src/img/anasayfa/egg-white-powder.jpg', // CREAM OF RICE
                                6: '/src/img/anasayfa/whey-isolate.jpg'  // CREATINE
                            };

                            return (
                                <Link
                                    to={`/urun/${product.slug}`}
                                    key={product.id}
                                    className="group flex flex-col"
                                    style={{ order: index }}
                                >
                                    <div className="relative aspect-square rounded-sm mb-4 overflow-hidden">
                                        <img
                                            src={isMobile ? mobileImageMap[product.id] : product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {product.discountPercentage && (
                                            <div className="absolute top-0 right-0 bg-[#FF2D2D] text-white p-2 text-center leading-none">
                                                <div className="text-[10px] font-bold">%{product.discountPercentage}</div>
                                                <div className="text-[8px] font-medium">İNDİRİM</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center flex flex-col items-center">
                                        <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight uppercase h-10 flex items-center justify-center">
                                            {product.name}
                                        </h3>
                                        <p className="text-[10px] text-gray-500 mb-2 leading-tight uppercase h-8 flex items-center justify-center">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center gap-0.5 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-gray-500 mb-2">
                                            {product.reviews.toLocaleString('tr-TR')} Yorum
                                        </span>
                                        <div className="flex flex-row items-baseline gap-2 justify-center">
                                            <span className="text-lg font-bold text-gray-900">
                                                {product.price} TL
                                            </span>
                                            {product.oldPrice && (
                                                <span className="text-xs text-[#FF2D2D] line-through font-bold">
                                                    {product.oldPrice} TL
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
}
