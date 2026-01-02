import { FiTrash } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

    return (
        <div className="container-custom py-8">
            <div className="max-w-md mx-auto bg-white shadow-xl flex flex-col min-h-[600px] border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-center p-6 bg-white relative">
                    <h2 className="text-lg font-bold text-gray-900">SEPETİM</h2>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-sm text-gray-500">Sepetinizde Ürün Bulunmamaktadır</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex justify-between p-4 bg-[#F9F9F9] mb-4">
                                    {/* Left Side: Image + Info */}
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="w-16 h-16 flex-shrink-0 bg-white p-1">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                                            {item.aroma && (
                                                <p className="text-xs text-gray-500">{item.aroma}</p>
                                            )}
                                            {item.size && (
                                                <p className="text-xs text-gray-500">{item.size}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Side: Price + Controls */}
                                    <div className="flex flex-col items-end justify-between gap-4">
                                        <span className="font-bold text-gray-900 text-sm">{item.price} TL</span>

                                        <div className="flex items-center bg-white rounded border border-gray-200 h-8">
                                            {item.quantity === 1 ? (
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500"
                                                >
                                                    <FiTrash className="w-3.5 h-3.5" />
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 border-r border-gray-100"
                                                    >
                                                        <FiTrash className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 font-medium"
                                                    >
                                                        -
                                                    </button>
                                                </>
                                            )}

                                            <span className="w-8 h-full flex items-center justify-center text-sm font-medium text-gray-900 border-x border-gray-100">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 font-medium"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">TOPLAM</span>
                        <span className="font-bold text-gray-900">{totalPrice} TL</span>
                    </div>
                    <button
                        className="w-full py-3 bg-gray-900 text-white font-medium rounded flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        DEVAM ET ▶
                    </button>
                </div>
            </div>
        </div>
    );
}
