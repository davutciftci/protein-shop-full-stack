import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, Truck, ShoppingCart } from 'lucide-react';
import { MdOutlineStar } from 'react-icons/md';
import { getProductBySlug, PRODUCTS } from '../../data/products';
import type { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { BsArrowClockwise } from 'react-icons/bs';

type ExpandedSection = 'features' | 'nutrition' | 'usage' | null;

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedAroma, setSelectedAroma] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (!product) return;

        addToCart({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            aroma: product.aromas[selectedAroma]?.name,
            size: product.sizes[selectedSize]?.weight,
        });
    };

    useEffect(() => {
        if (slug) {
            const productData = getProductBySlug(slug);
            if (productData) {
                setProduct(productData);
                setQuantity(1);
                setSelectedAroma(0);
                setSelectedSize(0);
                setExpandedSection(null);
                window.scrollTo(0, 0);
            }
        }
    }, [slug]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Ürün yükleniyor...</p>
                </div>
            </div>
        );
    }

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
    };

    const toggleSection = (section: ExpandedSection) => {
        setExpandedSection(prev => prev === section ? null : section);
    };

    // Reusable Components
    const ExpandableSections = () => (
        <div className="border-t border-gray-200">
            {/* Features */}
            <div className="border-b border-gray-200">
                <button
                    onClick={() => toggleSection('features')}
                    className="w-full flex items-center justify-between py-4 text-left"
                >
                    <span className="font-bold text-gray-900">ÖZELLİKLER</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSection === 'features' ? 'rotate-180' : ''}`} />
                </button>
                {expandedSection === 'features' && (
                    <div className="pb-4">
                        <ul className="space-y-2">
                            {product.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="text-green-500 mt-0.5">•</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Nutrition Info */}
            <div className="border-b border-gray-200">
                <button
                    onClick={() => toggleSection('nutrition')}
                    className="w-full flex items-center justify-between py-4 text-left"
                >
                    <span className="font-bold text-gray-900">BESİN İÇERİĞİ</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSection === 'nutrition' ? 'rotate-180' : ''}`} />
                </button>
                {expandedSection === 'nutrition' && (
                    <div className="pb-4">
                        <ul className="space-y-2">
                            {product.nutritionInfo.map((info, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                    {info}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Usage */}
            <div>
                <button
                    onClick={() => toggleSection('usage')}
                    className="w-full flex items-center justify-between py-4 text-left"
                >
                    <span className="font-bold text-gray-900">KULLANIM ŞEKLİ</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSection === 'usage' ? 'rotate-180' : ''}`} />
                </button>
                {expandedSection === 'usage' && (
                    <div className="pb-4">
                        <ul className="space-y-2">
                            {product.usage.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="font-medium text-gray-900">{index + 1}.</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    const ShippingIcons = () => (
        <div className="flex items-center justify-between py-4">
            {/* Aynı Gün Ücretsiz Kargo */}
            <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-gray-600" />
                <div className="text-left">
                    <span className="text-xs text-gray-600 block">Aynı Gün</span>
                    <span className="text-xs text-gray-600 block">Ücretsiz Kargo</span>
                </div>
            </div>

            {/* 750.000+ Mutlu Müşteri */}
            <div className="flex items-center gap-2">
                <svg className="w-7 h-7 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-left">
                    <span className="text-xs text-gray-600 block">750.000+</span>
                    <span className="text-xs text-gray-600 block">Mutlu Müşteri</span>
                </div>
            </div>

            {/* 100% Memnuniyet Garantisi */}
            <div className="flex items-center gap-2">
                <BsArrowClockwise className="w-6 h-6 text-gray-600" />
                <div className="text-left">
                    <span className="text-xs text-gray-600 block">100%</span>
                    <span className="text-xs text-gray-600 block">Memnuniyet Garantisi</span>
                </div>
            </div>
        </div>
    );

    const QuantityPriceRow = () => (
        <div className="flex items-center gap-4 flex-wrap">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded">
                <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium text-gray-600"
                    disabled={quantity <= 1}
                >
                    -
                </button>
                <span className="w-10 h-10 flex items-center justify-center font-medium border-x border-gray-300">{quantity}</span>
                <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium text-gray-600"
                    disabled={quantity >= 10}
                >
                    +
                </button>
            </div>

            {/* Price */}
            <span className="text-2xl font-bold text-gray-900">{product.price} TL</span>
        </div>
    );

    const ProductInfo = () => (
        <>
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <MdOutlineStar
                            key={i}
                            className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
                <span className="text-sm font-bold text-gray-900">
                    {product.reviews.toLocaleString('tr-TR')} Yorum
                </span>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-6">
                {product.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-1.5 text-xs font-medium bg-gray-100 rounded-full text-gray-700"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </>
    );

    const AromaSelection = () => (
        product.aromas.length > 0 && (
            <div className="mb-6">
                <p className="text-sm font-bold text-gray-900 mb-3">AROMA:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                    {product.aromas.map((aroma, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedAroma(index)}
                            className={`relative flex items-center gap-2 px-3 py-2 rounded border-2 transition-all ${selectedAroma === index
                                ? 'border-gray-800'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {selectedAroma === index && (
                                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-900 rounded-full flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                            <span className="text-sm text-gray-700">{aroma.name}</span>
                            <div
                                className="w-5 h-5 rounded-sm border border-gray-300 ml-auto"
                                style={{ backgroundColor: aroma.color }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        )
    );

    const SizeSelection = () => (
        <div className="mb-6">
            <p className="text-sm font-bold text-gray-900 mb-3">BOYUT:</p>
            <div className="flex flex-wrap gap-3">
                {product.sizes.map((size, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        className={`relative px-4 py-3 rounded border-2 transition-all min-w-[100px] ${selectedSize === index
                            ? 'border-gray-800'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {size.discount && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ef0000] text-white text-[10px] font-bold px-2 pb-0.5 rounded whitespace-nowrap mb-2">
                                %{size.discount} İNDİRİM
                            </span>
                        )}
                        {selectedSize === index && (
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-900 rounded-full flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                        <div className="text-sm font-bold text-gray-900">{size.weight}</div>
                        <div className="text-xs font-bold text-gray-500">{size.servings}</div>
                    </button>
                ))}
            </div>
        </div>
    );

    const AddToCartButton = ({ showPrice = false }: { showPrice?: boolean }) => (
        <div className="flex items-center gap-4">
            {showPrice && (
                <span className="text-sm font-bold text-gray-500">{product.pricePerServing} TL /Servis</span>
            )}
            <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded transition-colors"
            >
                <ShoppingCart className="w-5 h-5" />
                SEPETE EKLE
            </button>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            {/* Product Main Section */}
            <div className="container-custom py-8">

                {/* MOBILE LAYOUT (default) - Stack everything vertically */}
                <div className="md:hidden">
                    {/* Image */}
                    <div className="flex items-start justify-center mb-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-w-md object-contain"
                            style={{ maxHeight: '400px' }}
                        />
                    </div>

                    <ProductInfo />

                    <div className="border-t border-gray-200 mb-6"></div>

                    <AromaSelection />
                    <SizeSelection />

                    {/* Price Row: Price left, Servis right */}
                    <div className="flex items-baseline justify-between mb-4">
                        <span className="text-3xl font-bold text-gray-900">{product.price} TL</span>
                        <span className="text-sm font-bold text-gray-500">{product.pricePerServing} TL /Servis</span>
                    </div>

                    {/* Quantity & Add to Cart - Full width */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center border border-gray-300 rounded">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium text-gray-600"
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="w-10 h-10 flex items-center justify-center font-medium border-x border-gray-300">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium text-gray-600"
                                disabled={quantity >= 10}
                            >
                                +
                            </button>
                        </div>
                        <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            SEPETE EKLE
                        </button>
                    </div>

                    <ShippingIcons />

                    <div className="border-t border-gray-200 mb-4"></div>

                    <div className="text-sm text-gray-500 mb-6">
                        Son Kullanma Tarihi: {product.expirationDate}
                    </div>

                    <ExpandableSections />
                </div>

                {/* TABLET LAYOUT (md) - Two columns with special arrangement */}
                <div className="hidden md:block lg:hidden">
                    <div className="grid md:grid-cols-2 md:gap-8">
                        {/* Row 1: Image + Product Info */}
                        <div className="flex flex-col">
                            {/* Image */}
                            <div className="flex items-start justify-center mb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full max-w-sm object-contain"
                                    style={{ maxHeight: '350px' }}
                                />
                            </div>

                            {/* Expiration Date */}
                            <div className="text-sm text-gray-500 mb-4">
                                Son Kullanma Tarihi: {product.expirationDate}
                            </div>

                            {/* Expandable Sections */}
                            <ExpandableSections />
                        </div>

                        {/* Right Column: Product Info + Aroma + Size */}
                        <div className="flex flex-col">
                            <ProductInfo />

                            <div className="border-t border-gray-200 mb-6"></div>

                            <AromaSelection />
                            <SizeSelection />
                        </div>
                    </div>

                    {/* Price Row - Full width grid */}
                    <div className="grid md:grid-cols-2 md:gap-8 mt-6">
                        {/* Left: Quantity + Price */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center border border-gray-300 rounded">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium text-gray-600"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="w-10 h-10 flex items-center justify-center font-medium border-x border-gray-300">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium text-gray-600"
                                    disabled={quantity >= 10}
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{product.price} TL</span>
                        </div>

                        {/* Right: Servis ücreti sağda, buton tam genişlikte */}
                        <div className="flex flex-col">
                            <div className="flex justify-end mb-2">
                                <span className="text-sm font-bold text-gray-500">{product.pricePerServing} TL /Servis</span>
                            </div>
                            <button onClick={handleAddToCart} className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                SEPETE EKLE
                            </button>
                        </div>
                    </div>

                    {/* Shipping Icons */}
                    <div className="mt-4">
                        <ShippingIcons />
                    </div>
                </div>

                {/* DESKTOP LAYOUT (lg) - Original two column layout */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-2 gap-16 items-start mb-8">
                        {/* Product Image - Left Side */}
                        <div className="flex items-start justify-center sticky top-8">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-md object-contain"
                                style={{ maxHeight: '550px' }}
                            />
                        </div>

                        {/* Product Info - Right Side */}
                        <div className="flex flex-col">
                            <ProductInfo />

                            <div className="border-t border-gray-200 mb-6"></div>

                            <AromaSelection />
                            <SizeSelection />

                            {/* Price Row: Price left, Servis right */}
                            <div className="flex items-baseline justify-between mb-4">
                                <span className="text-3xl font-bold text-gray-900">{product.price} TL</span>
                                <span className="text-sm font-bold text-gray-500">{product.pricePerServing} TL /Servis</span>
                            </div>

                            {/* Quantity & Add to Cart - Full width */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium text-gray-600"
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="w-10 h-10 flex items-center justify-center font-medium border-x border-gray-300">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium text-gray-600"
                                        disabled={quantity >= 10}
                                    >
                                        +
                                    </button>
                                </div>
                                <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded transition-colors">
                                    <ShoppingCart className="w-5 h-5" />
                                    SEPETE EKLE
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Desktop */}
                    <div className="w-1/2 ml-auto">
                        <ShippingIcons />

                        <div className="border-t border-gray-200 mb-4"></div>

                        <div className="text-sm text-gray-500 mb-6">
                            Son Kullanma Tarihi: {product.expirationDate}
                        </div>

                        <ExpandableSections />
                    </div>
                </div>
            </div>

            {/* Son Görüntülenen Ürünler */}
            <div className="container-custom py-8">
                <h2 className="text-xl font-bold text-gray-900 mb-8 text-center uppercase tracking-wide">
                    Son Görüntülenen Ürünler
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 pr-2">
                    {PRODUCTS.map((item) => (
                        <Link
                            key={item.id}
                            to={`/urun/${item.slug}`}
                            className="group flex flex-col"
                        >
                            {/* Image Container with Discount Badge */}
                            <div className="relative aspect-square mb-1">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                />
                                {item.discountPercentage && (
                                    <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-[#ef0000] text-white px-1.5 py-1 text-[10px] font-bold text-center leading-tight">
                                        <span className="block">%{item.discountPercentage}</span>
                                        <span className="block">İNDİRİM</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Name - Bold, Centered */}
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900 text-center min-h-[1.75rem] flex items-center justify-center">
                                {item.name}
                            </h3>

                            {/* Description - Gray, Small, Centered */}
                            <p className="text-[10px] sm:text-xs text-gray-500 text-center min-h-[1.5rem] flex items-center justify-center leading-tight">
                                {item.description}
                            </p>

                            {/* Star Rating */}
                            <div className="flex items-center justify-center gap-0.5 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <MdOutlineStar
                                        key={i}
                                        className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>

                            {/* Review Count */}
                            <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-2">
                                {item.reviews.toLocaleString('tr-TR')} Yorum
                            </p>

                            {/* Price Row */}
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-gray-900">{item.price} TL</span>
                                {item.oldPrice && (
                                    <span className="text-xs text-red-500 line-through">{item.oldPrice} TL</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="container-custom py-8">
                {/* Rating Summary */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    {/* Left - Overall Rating */}
                    <div className="flex flex-col items-center">
                        <div className="text-4xl font-bold text-gray-900">4.8</div>
                        <div className="flex items-center gap-1 my-2">
                            {[...Array(5)].map((_, i) => (
                                <MdOutlineStar key={i} className="w-6 h-6 text-yellow-400" />
                            ))}
                        </div>
                        <div className="text-sm text-gray-600 mb-6">{product?.reviews?.toLocaleString('tr-TR') || '10.869'} YORUM</div>
                        <button
                            className="text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all hover:opacity-90"
                            style={{ background: 'linear-gradient(135deg, #1F23AA 0%, #387EC7 100%)' }}
                        >
                            YORUM ({product?.reviews?.toLocaleString('tr-TR') || '10869'})
                        </button>
                    </div>

                    {/* Right - Rating Bars */}
                    <div className="flex-1 space-y-2">
                        {[
                            { stars: 5, percent: 85, count: 9238 },
                            { stars: 4, percent: 10, count: 1087 },
                            { stars: 3, percent: 3, count: 326 },
                            { stars: 2, percent: 1, count: 109 },
                            { stars: 1, percent: 1, count: 109 },
                        ].map((rating) => (
                            <div key={rating.stars} className="flex items-center gap-3">
                                <div className="flex items-center gap-0.5 w-20">
                                    {[...Array(rating.stars)].map((_, i) => (
                                        <MdOutlineStar key={i} className="w-3 h-3 text-yellow-400" />
                                    ))}
                                </div>
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#2126AB] rounded-full"
                                        style={{ width: `${rating.percent}%` }}
                                    />
                                </div>
                                <span className="text-xs text-gray-600 w-12 text-right">{rating.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review Cards */}
                <div className="space-y-4 mb-8">
                    {[
                        { name: 'EREN U.', title: 'Her zamanki kalite. Teşekkürler', text: 'Her zamanki kalite. Teşekkürler', date: '08/09/24', rating: 5 },
                        { name: 'Bahadır K.', title: 'En iyi aroma', text: 'En iyi aroma', date: '08/05/24', rating: 5 },
                        { name: 'Burhan K.', title: 'Yıllardır en beğendiğim protein tozu', text: 'Yıllardır en beğendiğim protein tozu protein içer de olsak önce olacak', date: '08/05/24', rating: 5 },
                        { name: 'Berke Ç.', title: 'Beğendim', text: 'Beğendim', date: '08/05/24', rating: 5 },
                        { name: 'Deniz C.', title: 'Çok iyi tat', text: 'Çok iyi tat', date: '05/03/24', rating: 5 },
                        { name: 'Burak B.', title: 'Tadı harika, kesinlikle tavsiye ederim', text: 'Tadı harika, kesinlikle tavsiye ederim', date: '08/03/24', rating: 5 },
                        { name: 'Fatih K.', title: 'Fatih kaya', text: 'Günaydınlar, ve teşekkürler. Göndermeniz için sipariş aldısanız ve gelmiştir. Her zaman mükemmel işlerim var size', date: '08/09/24', rating: 5 },
                        { name: 'Berk Y.', title: 'Gayet beğendim ve sürekli olarak', text: 'Gayet beğendim ve sürekli olarak kullanıyorum', date: '08/09/24', rating: 5 },
                        { name: 'Eser S.', title: 'çok iyi üründen memnun oldum', text: 'çok iyi üründen memnun oldum', date: '08/09/24', rating: 5 },
                        { name: 'Egemen B.', title: 'Harika', text: 'Ben gayet iyi buldum, devamını diliyorum.', date: '04/05/24', rating: 5 },
                    ].map((review, index) => (
                        <div
                            key={index}
                            className={`bg-[#F7F7F7] px-6 py-8 rounded-[30px] ${index >= 3 ? 'hidden md:block' : ''}`}
                        >
                            {/* Mobile Layout */}
                            <div className="md:hidden">
                                <div className="flex items-center gap-0.5 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <MdOutlineStar
                                            key={i}
                                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold text-gray-900 text-sm block">{review.name}</span>
                                    <span className="font-bold text-gray-900 text-sm">{review.date}</span>
                                </div>
                            </div>

                            {/* Desktop Layout */}
                            <div className="hidden md:flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <MdOutlineStar
                                                key={i}
                                                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{review.name}</span>
                                </div>
                                <span className="text-gray-900 text-sm font-bold">{review.date}</span>
                            </div>

                            <h4 className="font-bold text-gray-900 mb-1">{review.title}</h4>
                            <p className="text-sm text-gray-600">{review.text}</p>
                        </div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-gray-400 px-6">&lt;</span>
                    {/* Mobile: show 3 pages */}
                    <div className="flex gap-2 md:hidden">
                        {[1, 2, 3].map((num) => (
                            <button
                                key={num}
                                className={`w-6 h-6 text-xs rounded ${num === 1 ? 'text-[#2126AB] font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    {/* Desktop: show 10 pages */}
                    <div className="hidden md:flex gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                className={`w-6 h-6 text-xs rounded ${num === 1 ? 'text-[#2126AB] font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    <span className="text-gray-400">&gt;</span>
                </div>

                {/* Çok Satanlar */}
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">
                    ÇOK SATANLAR
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 pr-2 mb-6">
                    {PRODUCTS.slice(0, 6).map((item) => (
                        <Link
                            key={item.id}
                            to={`/urun/${item.slug}`}
                            className="group flex flex-col"
                        >
                            <div className="relative aspect-square mb-1">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                />
                                {item.discountPercentage && (
                                    <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-[#ef0000] text-white px-1.5 py-1 text-[10px] font-bold text-center leading-tight">
                                        <span className="block">%{item.discountPercentage}</span>
                                        <span className="block">İNDİRİM</span>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900 text-center min-h-[1.75rem] flex items-center justify-center">
                                {item.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-gray-500 text-center min-h-[1.5rem] flex items-center justify-center leading-tight">
                                {item.description}
                            </p>
                            <div className="flex items-center justify-center gap-0.5 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <MdOutlineStar
                                        key={i}
                                        className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-2">
                                {item.reviews.toLocaleString('tr-TR')} Yorum
                            </p>
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-gray-900">{item.price} TL</span>
                                {item.oldPrice && (
                                    <span className="text-xs text-red-500 line-through">{item.oldPrice} TL</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Tümünü Gör Button */}
                <div className="flex justify-center ">
                    <Link
                        to="/urunler"
                        className="text-white font-medium text-center rounded-[4px] w-[262px] h-[40px] transition-all hover:opacity-90 flex items-center justify-center"
                        style={{ backgroundColor: '#2126AB' }}
                    >
                        TÜMÜNÜ GÖR
                    </Link>
                </div>

                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 mt-8 text-sm">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">OJS Nutrition</Link>
                    <span className="text-gray-400">&gt;</span>
                    <Link to={`/kategori/${product?.category || 'protein'}`} className="text-gray-600 hover:text-gray-900 capitalize">{product?.category || 'Protein'}</Link>
                    <span className="text-gray-400">&gt;</span>
                    <span className="text-gray-600 uppercase">{product?.category ? `${product.category.toUpperCase()}LER` : 'PROTEİNLER'}</span>
                    <span className="text-gray-400">&gt;</span>
                    <span className="font-medium text-gray-900 uppercase">{product?.name || 'WHEY PROTEIN'}</span>
                </div>
            </div>
        </div>
    );
}
