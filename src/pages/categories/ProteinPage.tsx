import { Link } from 'react-router-dom';
import { MdOutlineStar } from 'react-icons/md';
import DiscountBadge from '../../components/ui/DiscountBadge';

// Simulated protein products (in real app, filter by category from API)
const proteinProducts = [
    { id: 1, name: 'WHEY PROTEIN', description: 'EN ÇOK TERCİH EDİLEN PROTEİN TAKVİYESİ', price: 549, oldPrice: null, discountPercentage: null, rating: 5, reviews: 10869, image: '/src/img/anasayfa/whey-protein.jpg', slug: 'whey-protein' },
    { id: 2, name: 'WHEY ISOLATE', description: '%90 PROTEİN EN SAF WHEY', price: 749, oldPrice: null, discountPercentage: null, rating: 5, reviews: 887, image: '/src/img/anasayfa/whey-isolate.jpg', slug: 'whey-isolate' },
    { id: 3, name: 'FITNESS PAKETİ', description: 'EN POPÜLER ÜRÜNLER BİR ARADA', price: 799, oldPrice: 1126, discountPercentage: 29, rating: 5, reviews: 7650, image: '/src/img/anasayfa/fitness-package.jpg', slug: 'fitness-paketi' },
    { id: 4, name: 'PEA PROTEIN', description: 'EN POPÜLER VEGAN PROTEİN KAYNAĞI', price: 349, oldPrice: null, discountPercentage: null, rating: 5, reviews: 1778, image: '/src/img/anasayfa/pea-protein.jpg', slug: 'pea-protein' },
    { id: 5, name: 'MICELLAR CASEIN', description: 'YAVAŞ SİNDİRİLEN PROTEİN KAYNAĞI', price: 599, oldPrice: null, discountPercentage: null, rating: 5, reviews: 768, image: '/src/img/anasayfa/micellar-casein.jpg', slug: 'micellar-casein' },
    { id: 6, name: 'EGG WHITE POWDER', description: 'PROTEİNİN ALTIN STANDARTI', price: 899, oldPrice: null, discountPercentage: null, rating: 5, reviews: 539, image: '/src/img/anasayfa/egg-white-powder.jpg', slug: 'egg-white-powder' },
    { id: 7, name: 'MILK PROTEIN', description: 'TAM PROTEİN KAYNAĞI', price: 699, oldPrice: null, discountPercentage: null, rating: 5, reviews: 205, image: '/src/img/anasayfa/milk-protein.png', slug: 'milk-protein' },
    { id: 8, name: 'SOYA PROTEIN', description: 'VEGAN PROTEİN KAYNAĞI', price: 449, oldPrice: null, discountPercentage: null, rating: 5, reviews: 374, image: '/src/img/anasayfa/soya-protein.png', slug: 'soya-protein' },
    { id: 9, name: 'PROTEIN BAR 2\'Lİ PAKET', description: '%30 PROTEİN, ŞEKER İLAVESİZ', price: 59, oldPrice: 90, discountPercentage: 34, rating: 5, reviews: 180, image: '/src/img/anasayfa/protein-bar-2paket.png', slug: 'protein-bar-2li' },
    { id: 10, name: 'MASS GAINER LANSMAN', description: 'YÜKSEK KALORİLİ PROTEİN ÖĞÜN', price: 699, oldPrice: 999, discountPercentage: 30, rating: 5, reviews: 329, image: '/src/img/anasayfa/mass-gainer-lansman.png', slug: 'mass-gainer' },
    { id: 11, name: 'PROTEIN BAR', description: '%30 PROTEİN, ŞEKER İLAVESİZ', price: 249, oldPrice: 349, discountPercentage: 29, rating: 5, reviews: 504, image: '/src/img/anasayfa/protein-bar.png', slug: 'protein-bar' },
    { id: 12, name: 'COLLAGEN COFFEE', description: 'KOLAJENLİ KAHVE', price: 349, oldPrice: null, discountPercentage: null, rating: 5, reviews: 377, image: '/src/img/anasayfa/collagen-coffee.png', slug: 'collagen-coffee' },
];

export default function ProteinPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container-custom py-8">
                {/* Page Title */}
                <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8 uppercase tracking-wide">
                    PROTEİN
                </h1>

                {/* Product Grid */}
                {/* Desktop: 4 cols, Tablet: 3 cols, Mobile: 2 cols */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {proteinProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/urun/${product.slug}`}
                            className="group flex flex-col"
                        >
                            {/* Image Container with Discount Badge */}
                            <div className="relative aspect-square mb-2">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.discountPercentage && (
                                    <DiscountBadge
                                        percentage={product.discountPercentage}
                                        className="absolute -top-2 -right-2 md:top-2 md:right-2"
                                    />
                                )}
                            </div>

                            {/* Product Name */}
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900 text-center min-h-[1.75rem] flex items-center justify-center uppercase">
                                {product.name}
                            </h3>

                            {/* Description */}
                            <p className="text-[10px] sm:text-xs text-gray-500 text-center min-h-[1.5rem] flex items-center justify-center leading-tight">
                                {product.description}
                            </p>

                            {/* Star Rating */}
                            <div className="flex items-center justify-center gap-0.5 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <MdOutlineStar
                                        key={i}
                                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>

                            {/* Review Count */}
                            <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-2">
                                {product.reviews.toLocaleString('tr-TR')} Yorum
                            </p>

                            {/* Price */}
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-gray-900">{product.price} TL</span>
                                {product.oldPrice && (
                                    <span className="text-xs text-red-500 line-through">{product.oldPrice} TL</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Product Count */}
                <div className="text-center text-gray-900 text-sm font-bold m-24">
                    Toplam {proteinProducts.length} ürün görüntüleniyor
                </div>

                {/* Description Section */}
                <div className="pb-6">
                    <p className="text-sm text-gray-900 leading-relaxed">
                        Vücudun tüm fonksiyonlarını sağlıklı bir şekilde yerine getirmesini sağlayan temel yapı taşlarından biri proteindir.
                        <span className="font-bold"> Protein</span> kısaca, bir veya daha fazla amino asıt artık <br />
                        <span className="text-[#059669] underline cursor-pointer">Daha fazla göster</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
