import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual registration logic
        console.log('Registration attempt:', { firstName, lastName, email, password });
    };

    return (
        <div className="flex items-center justify-center px-4 py-20">
            <div className="w-[500px] h-[371px]">
                {/* Tab Navigation */}
                <div className="flex space-x-4 text-center">
                    <Link
                        to="/giris"
                        className="flex-1 border-t border-r border-l p-4 text-sm font-medium bg-gray-100 text-[##333333]"
                    >
                        Giriş Yap
                    </Link>
                    <button className="flex-1 border-t border-l border-r p-4 text-sm font-medium text-[#2126AB]">
                        Üye Ol
                    </button>
                </div>


                <div className="border p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Inputs - Side by Side */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm text-gray-700 mb-2">
                                    Ad
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-[4px] border border-gray-200 bg-gray-100 text-sm focus:outline-none focus:border-gray-300"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm text-gray-700 mb-2">
                                    Soyad
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-[4px] border border-gray-200 bg-gray-100 text-sm focus:outline-none focus:border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                                E-Posta
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-[4px] border border-gray-200 bg-gray-100 text-sm focus:outline-none focus:border-gray-300"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                                Şifre
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-[4px] border border-gray-200 bg-gray-100 text-sm focus:outline-none focus:border-gray-300"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full rounded-[4px] bg-black text-white p-4 text-sm font-bold tracking-wide hover:bg-gray-800 transition-colors"
                        >
                            ÜYE OL
                        </button>
                    </form>

                    {/* Already have account link */}
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Zaten hesabınız var mı?{' '}
                        <Link to="/giris" className="text-blue-600 hover:text-blue-700 font-medium">
                            Giriş Yap
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
