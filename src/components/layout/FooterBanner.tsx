import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FooterBanner() {
    return (
        <section className="w-full mb-24">
            {/* Banner Section */}
            <div className="w-full bg-black">
                <img
                    src="/images/Figure → image_1296.webp.png"
                    alt="OJS Nutrition Banner"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Reviews Section */}
            <div className="bg-white py-10 sm:py-1 border-t border-gray-100">
                <div className="container-custom">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 mb-8 pb-4 border-b border-gray-100 gap-4">
                        <h2 className="text-sm font-bold text-[#111111] tracking-tight uppercase">GERÇEK MÜŞTERİ YORUMLARI</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                                    ))}
                                </div>
                                <span className="text-[11px] font-bold text-[#111111] border-b border-[#111111] leading-none mb-0.5">198453 Yorum</span>
                            </div>
                            <div className="flex gap-1.5 ml-2">
                                <button className="p-1 hover:bg-gray-50 rounded transition-colors">
                                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                                </button>
                                <button className="p-1 hover:bg-gray-50 rounded transition-colors">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <span className="text-[10px] text-[#999999] font-medium tracking-tight">03/05/24</span>
                                <h4 className="text-[13px] font-black text-[#111111] uppercase tracking-tight">BEĞENDİM GAYET GÜZELDİ</h4>
                                <p className="text-[11px] text-[#666666] leading-[1.6] font-medium max-w-[240px]">
                                    Ürün gayet güzel ama ekşiliği bi süreden sonra bayabiliyor insanı teşekkürler.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
