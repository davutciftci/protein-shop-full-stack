

const ContactPage = () => {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container-custom mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Bize Ulaşın</h1>
                </div>
                <div className="max-w-3xl mx-auto mb-6 text-left">
                    <p className="text-gray-600 text-sm md:text-base">
                        Bize aşağıdaki iletişim formundan ulaşabilirsiniz.
                    </p>
                </div>

                {/* Form Section */}
                <div className="max-w-3xl mx-auto">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="İsim *"
                                    className="w-full h-[50px] bg-[#f9f9f9] border-[1px] border-[#E5E5E5] rounded p-3 text-gray-800 placeholder-gray-400 focus:ring-0"
                                />
                            </div>

                            {/* Surname */}
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Soyad"
                                    className="w-full h-[50px] bg-[#f9f9f9] border-[1px] border-[#E5E5E5] rounded p-3 text-gray-800 placeholder-gray-400 focus:ring-0"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <input
                                type="email"
                                id="email"
                                placeholder="E-Posta"
                                className="w-full h-[50px] bg-[#f9f9f9] border-[1px] border-[#E5E5E5] rounded p-3 text-gray-800 placeholder-gray-400 focus:ring-0"
                            />
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <textarea
                                id="message"
                                rows={8}
                                placeholder="Mesaj"
                                className="w-full h-[150px] bg-[#f9f9f9] border-[1px] border-[#E5E5E5] rounded p-3 text-gray-800 placeholder-gray-400 focus:ring-0 resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                className="bg-black text-white font-bold py-3.5 px-12 rounded hover:bg-gray-800 transition-colors uppercase tracking-wide text-sm"
                            >
                                GÖNDER
                            </button>
                        </div>
                    </form>

                    {/* Footer Info Text */}
                    <div className="mt-12 text-center space-y-4">
                        <p className="text-[12px] font-medium text-black">
                            *Aynı gün kargo hafta içi 16:00, Cumartesi ise 11:00'e kadar verilen siparişler için geçerlidir.
                        </p>
                        <p className="text-[12px] font-medium text-black">
                            Siparişler kargoya verilince e-posta ve sms ile bilgilendirme yapılır.
                        </p>

                        <div className="pt-2 text-[12px] font-medium text-center text-black leading-relaxed max-w-2xl mx-auto">
                            Telefon ile <span className="font-bold">0850 303 29 89 </span>
                            numarasını arayarak da bizlere sesli mesaj bırakabilirsiniz. Sesli mesajlarınıza hafta içi saat
                            <span className="font-bold"> 09:00-17:00</span> arasında dönüş sağlanmaktadır.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
