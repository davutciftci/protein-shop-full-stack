import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_DATA = [
    {
        id: 1,
        question: 'Ürünleriniz orijinal mi?',
        answer: 'Evet, tüm ürünlerimiz %100 orijinaldir ve yetkili distribütörlerden temin edilmektedir. Her ürünün orijinallik belgesi ve sertifikası mevcuttur.',
    },
    {
        id: 2,
        question: 'Kargo ücreti ne kadar?',
        answer: '300₺ ve üzeri alışverişlerde kargo ücretsizdir. 300₺ altındaki siparişler için kargo ücreti 29,90₺\'dir.',
    },
    {
        id: 3,
        question: 'Kargo ne kadar sürede teslim edilir?',
        answer: 'Siparişleriniz aynı gün kargoya verilir ve ortalama 1-3 iş günü içinde adresinize teslim edilir.',
    },
    {
        id: 4,
        question: 'İade ve değişim yapabilir miyim?',
        answer: 'Ürünü teslim aldıktan sonra 14 gün içinde, orjinal ambalajında ve kullanılmamış olması koşuluyla iade edebilirsiniz.',
    },
    {
        id: 5,
        question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        answer: 'Kredi kartı, banka kartı ve kapıda ödeme seçeneklerini kabul ediyoruz. Taksit imkanları mevcuttur.',
    },
    {
        id: 6,
        question: 'Ürün önerisi alabilir miyim?',
        answer: 'Elbette! Müşteri hizmetleri ekibimiz size hedeflerinize uygun ürünler önerebilir. İletişim sayfasından bize ulaşabilirsiniz.',
    },
    {
        id: 7,
        question: 'Üyelik ücretsiz mi?',
        answer: 'Evet, üyelik tamamen ücretsizdir ve üye olarak özel kampanya ve indirimlerden yararlanabilirsiniz.',
    },
    {
        id: 8,
        question: 'Ürünlerin son kullanma tarihleri ne kadar?',
        answer: 'Tüm ürünlerimizin son kullanma tarihi en az 6 ay ileridedir. Son kullanma tarihi ürün sayfasında belirtilir.',
    },
];

export default function FaqPage() {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Sıkça Sorulan Sorular
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQ_DATA.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                                {openId === faq.id ? (
                                    <ChevronUp className="w-6 h-6 text-primary-600 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                )}
                            </button>

                            {openId === faq.id && (
                                <div className="px-6 pb-4">
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-3">Sorunuza cevap bulamadınız mı?</h2>
                    <p className="text-gray-700 mb-6">
                        Müşteri hizmetleri ekibimiz size yardımcı olmaktan mutluluk duyacaktır
                    </p>
                    <a href="/iletisim" className="btn-primary">
                        Bize Ulaşın
                    </a>
                </div>
            </div>
        </div>
    );
}
