import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual login logic
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="flex items-center justify-center px-4 py-20">
            <div className="w-[500px] h-[371px]">
                {/* Tab Navigation */}
                <div className="flex space-x-4 text-center">
                    <button className="flex-1 border-t border-l border-r p-4 text-sm font-medium text-[#2126AB]">
                        Giriş Yap
                    </button>
                    <Link
                        to="/kayit"
                        className="flex-1 border-t border-r border-l p-4 text-sm font-medium bg-gray-100 text-[##333333]"
                    >
                        Üye Ol
                    </Link>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6 border p-8">
                    {/* Email Input */}
                    <div className=''>
                        <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                            *E-Posta
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-[4px] bg-gray-100 text-sm focus:outline-none focus:border-gray-300"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                            *Şifre
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-[4px] bg-gray-100 text-sm focus:outline-none focus:border-gray-300"
                            required
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right">
                        <Link to="/sifremi-unuttum" className="text-xs text-gray-600 hover:text-gray-900 underline">
                            Şifremi Unuttum?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-4 text-sm rounded-[4px] font-bold tracking-wide hover:bg-gray-800 transition-colors"
                    >
                        GİRİŞ YAP
                    </button>
                </form>
            </div>
        </div>
    );
}
