import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { CiFaceSmile } from "react-icons/ci";
import { TfiPackage } from 'react-icons/tfi';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-md">
            {/* Top Row - Logo, Search, Cart, Account */}
            <div className=" border-gray-200 bg-white">
                <div className="container-custom my-6">
                    <div className="flex items-center justify-between h-12 gap-6">
                        {/* Mobile Menu Button - Left Side */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 text-gray-900"
                            aria-label="Menü"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>

                        {/* Logo */}
                        <Link to="/" className="flex items-center flex-shrink-0">
                            <img
                                src="/logo-dark.png"
                                alt="OJS Nutrition"
                                className="h-10 md:h-12"
                            />
                        </Link>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex flex-1 max-w-2xl justify-end">
                            <div className="relative flex">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Aradığınız ürünü yazınız..."
                                    className="flex-1 px-4 py-2.5 border-gray-300 border-2 rounded-l-md focus:outline-none transition-colors"
                                    style={{ width: '316px', height: '38px' }}
                                />
                                <button
                                    className="text-white px-6 py-2.5 rounded-r-md font-medium transition-colors"
                                    style={{ backgroundColor: '#919191', height: '38px' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7a7a7a'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#919191'}
                                >
                                    ARA
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Cart & Account */}
                        <div className="flex items-center space-x-4 flex-shrink-0">
                            <button
                                className="hidden md:flex items-center justify-evenly border-2 border-gray-400 rounded space-x-1 text-gray-700 transition-colors"
                                style={{ color: '#919191', height: '38px', width: '135px' }}
                            >
                                <User className="w-5 h-5" />
                                <span className="text-sm font-medium">HESAP</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Mobile Cart - Icon Only */}
                            <Link
                                to="/sepetim"
                                className="md:hidden relative p-2"
                                aria-label="Sepet"
                            >
                                <ShoppingCart className="w-6 h-6 text-gray-700" />
                                <span
                                    className="absolute top-0 right-0 text-white text-xs rounded-full flex items-center justify-center font-bold"
                                    style={{ backgroundColor: '#ED2727', height: '18px', width: '18px', fontSize: '10px' }}
                                >
                                    0
                                </span>
                            </Link>

                            {/* Desktop Cart - With Background */}
                            <Link
                                to="/sepetim"
                                className="hidden md:flex relative items-center justify-center gap-2 text-white rounded transition-colors"
                                style={{ backgroundColor: '#919191', height: '38px', width: '196px' }}
                                aria-label="Sepet"
                            >
                                <div className="relative flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="text-sm font-semibold">SEPET</span>
                                    <span
                                        className="absolute -top-2 -right-2 text-white text-xs rounded-full flex items-center justify-center font-bold"
                                        style={{ backgroundColor: '#ED2727', height: '20px', width: '20px' }}
                                    >
                                        0
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Row - Black Background - Main Categories */}
            <div className="hidden lg:block bg-gray-900 text-white">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-8">
                        <Link to="/urunler?kategori=protein" className="text-semibold">
                            PROTEİN
                        </Link>
                        <Link to="/urunler?kategori=spor-gidalari" className="text-semibold">
                            SPOR GIDALARI
                        </Link>
                        <Link to="/urunler?kategori=saglik" className="text-semibold">
                            SAĞLIK
                        </Link>
                        <Link to="/urunler?kategori=gida" className="text-semibold">
                            GIDA
                        </Link>
                        <Link to="/urunler?kategori=vitamin" className=" text-semibold">
                            VİTAMİN
                        </Link>
                        <Link to="/tum-urunler" className="text-semibold">
                            TÜM ÜRÜNLER
                        </Link>
                    </div>
                </div>
            </div>

            {/* Third Row - Info Bar */}
            <div className="hidden lg:block bg-gray-100 border-b border-gray-200">
                <div className="container-custom">
                    <div className="flex items-center justify-center h-10 text-xs">
                        <div className="flex items-center justify-around w-full space-x-6 text-gray-700">
                            <div className='flex items-center gap-2'>
                                <TfiPackage className="w-6 h-6 font-extrabold" />
                                <span className="font-extrabold">AYNI GÜN KARGO<span className="font-semibold"> - 16.00'DAN ÖNCEKİ SİPARİŞLERDE</span></span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CiFaceSmile className="w-6 h-6 font-extrabold" />
                                <span className="font-extrabold">ÜCRETSİZ KARGO<span className="font-semibold"> - 100 TL ÜZERİ SİPARİŞLERDE</span></span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <AiOutlineSafetyCertificate className="w-6 h-6 font-extrabold" />
                                <span className="font-extrabold">GÜVENLİ ALIŞVERİŞ<span className="font-semibold"> - 1.000.000+ MUTLU MÜŞTERİ</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden relative flex items-center mb-2 px-4">
                <button className="absolute px-3 left-3 p-1 border-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ARADIĞINIZ ÜRÜNÜ YAZINIZ."
                    className="text-black w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-full focus:outline-none"
                />
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <div className="container-custom py-4">
                        <div className="flex flex-col space-y-4">
                            <div className="font-bold text-gray-900 text-sm mb-2">KATEGORİLER</div>
                            <Link
                                to="/urunler?kategori=protein"
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors pl-4"
                                onClick={toggleMenu}
                            >
                                Protein
                            </Link>
                            <Link
                                to="/urunler?kategori=spor-gidalari"
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors pl-4"
                                onClick={toggleMenu}
                            >
                                Spor Gıdaları
                            </Link>
                            <Link
                                to="/urunler?kategori=saglik"
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors pl-4"
                                onClick={toggleMenu}
                            >
                                Sağlık
                            </Link>
                            <Link
                                to="/urunler?kategori=gida"
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors pl-4"
                                onClick={toggleMenu}
                            >
                                Gıda
                            </Link>
                            <Link
                                to="/urunler?kategori=vitamin"
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors pl-4"
                                onClick={toggleMenu}
                            >
                                Vitamin
                            </Link>

                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <Link
                                    to="/sss"
                                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors block pl-4 py-2"
                                    onClick={toggleMenu}
                                >
                                    S.S.S.
                                </Link>
                                <Link
                                    to="/iletisim"
                                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors block pl-4 py-2"
                                    onClick={toggleMenu}
                                >
                                    İletişim
                                </Link>
                            </div>

                            <Link
                                to="/giris-yap"
                                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium transition-colors pt-4 border-t border-gray-200"
                                onClick={toggleMenu}
                            >
                                <User className="w-5 h-5" />
                                <span>Giriş Yap / Hesabım</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
