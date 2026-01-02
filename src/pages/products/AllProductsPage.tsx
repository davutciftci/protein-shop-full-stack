import { Link } from 'react-router-dom';
import { MdOutlineStar } from 'react-icons/md';
import { PRODUCTS } from '../../data/products';
import DiscountBadge from '../../components/ui/DiscountBadge';

export default function AllProductsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container-custom py-8">
                {/* Page Title */}
                <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8 uppercase tracking-wide">
                    TÜM ÜRÜNLER
                </h1>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {PRODUCTS.map((product) => (
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
                    Toplam {PRODUCTS.length} ürün görüntüleniyor
                </div>
            </div>
        </div>
    );
}
