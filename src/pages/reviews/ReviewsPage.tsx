
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
    {
        id: 1,
        date: '03/05/24',
        title: 'BEĞENDİM GAYET GÜZELDİ',
        content: 'Ürün gayet güzel ama ekşiliği bi süreden sonra bayıyor',
        rating: 5,
    },
    {
        id: 2,
        date: '03/05/24',
        title: 'BEĞENDİM GAYET GÜZELDİ',
        content: 'Ürün gayet güzel ama ekşiliği bi süreden sonra bayıyor',
        rating: 5,
    },
    {
        id: 3,
        date: '03/05/24',
        title: 'BEĞENDİM GAYET GÜZELDİ',
        content: 'Ürün gayet güzel ama ekşiliği bi süreden sonra bayıyor',
        rating: 5,
    },
    {
        id: 4,
        date: '03/05/24',
        title: 'BEĞENDİM GAYET GÜZELDİ',
        content: 'Ürün gayet güzel ama ekşiliği bi süreden sonra bayıyor',
        rating: 5,
    },
];

const ReviewsPage = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Banner Section */}
            <div className="relative w-full h-[400px] bg-[#111] overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-lime-400/80 opacity-90"></div>

                {/* Content Container */}
                <div className="container-custom relative h-full flex flex-col justify-center">
                    <div className="max-w-xl">
                        {/* OJS Logo Text Effect */}
                        <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                            OJS <br />
                            NUTRITION
                        </h1>

                        {/* Dots Pattern decor */}
                        <div className="absolute bottom-10 left-10 flex gap-1">
                            <div className="grid grid-cols-6 gap-1">
                                {[...Array(24)].map((_, i) => (
                                    <div key={i} className="w-1 h-1 bg-lime-500 rounded-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side image placeholder (simulating the gym person) */}
                <div className="absolute right-0 top-0 h-full w-1/2 flex items-end justify-center">
                    {/* In a real app, this would be the actual image from the design */}
                    {/* <img src="/path/to/gym-person.png" alt="Gym" className="h-full object-cover grayscale mix-blend-overlay" /> */}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="container-custom py-16">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-2">GERÇEK MÜŞTERİ YORUMLARI</h2>
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-sm font-bold underline decoration-2 underline-offset-4">198453 Yorum</span>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="flex flex-col gap-2">
                            <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium">{review.date}</span>
                            <h3 className="font-black text-sm uppercase">{review.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                {review.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;
