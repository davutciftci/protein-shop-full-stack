import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <img
                            src="/logo-white.png"
                            alt="OJS Nutrition"
                            className="h-8 mb-4"
                        />
                        <p className="text-sm mb-4">
                            Sağlıklı yaşam için kaliteli spor gıdaları ve takviye ürünleri.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary-400 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Hızlı Linkler</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/hakkimizda" className="hover:text-primary-400 transition-colors">
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link to="/urunler" className="hover:text-primary-400 transition-colors">
                                    Ürünler
                                </Link>
                            </li>
                            <li>
                                <Link to="/sss" className="hover:text-primary-400 transition-colors">
                                    S.S.S.
                                </Link>
                            </li>
                            <li>
                                <Link to="/iletisim" className="hover:text-primary-400 transition-colors">
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Müşteri Hizmetleri</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/hesabim/siparislerim" className="hover:text-primary-400 transition-colors">
                                    Siparişlerim
                                </Link>
                            </li>
                            <li>
                                <Link to="/hesabim/adreslerim" className="hover:text-primary-400 transition-colors">
                                    Adreslerim
                                </Link>
                            </li>
                            <li>
                                <Link to="/hesabim/bilgilerim" className="hover:text-primary-400 transition-colors">
                                    Hesap Bilgileri
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors">
                                    İade ve Değişim
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">İletişim</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-2">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>0850 123 45 67</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>info@ojsnutrition.com</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>İstanbul, Türkiye</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; 2024 OJS Nutrition. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}
