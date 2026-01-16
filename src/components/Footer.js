import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-black text-white tracking-tighter mb-4 block">
                            E-Commerce
                        </Link>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                            En kaliteli ürünleri en uygun fiyatlarla bulabileceğiniz güvenilir adresiniz.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Hızlı Erişim</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-yellow-400 transition-colors">Ana Sayfa</Link></li>
                            <li><Link to="/products" className="hover:text-yellow-400 transition-colors">Ürünler</Link></li>
                            <li><Link to="/cart" className="hover:text-yellow-400 transition-colors">Sepetim</Link></li>
                            <li><Link to="/profile" className="hover:text-yellow-400 transition-colors">Hesabım</Link></li>
                        </ul>
                    </div>

                    {/* Categories (Mock) */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Kategoriler</h3>
                        <ul className="space-y-2 text-sm">
                            <li><span className="hover:text-yellow-400 cursor-pointer transition-colors">Elektronik</span></li>
                            <li><span className="hover:text-yellow-400 cursor-pointer transition-colors">Giyim</span></li>
                            <li><span className="hover:text-yellow-400 cursor-pointer transition-colors">Ev & Yaşam</span></li>
                            <li><span className="hover:text-yellow-400 cursor-pointer transition-colors">Süpermarket</span></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">İletişim</h3>
                        <p className="text-sm text-slate-400 mb-4">
                            support@ecommerce.com<br />
                            +90 555 123 45 67
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaFacebook size={14} /></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"><FaTwitter size={14} /></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"><FaInstagram size={14} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} E-Commerce. Tüm hakları saklıdır.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="hover:text-slate-300 cursor-pointer">Gizlilik Politikası</span>
                        <span className="hover:text-slate-300 cursor-pointer">Kullanım Koşulları</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
