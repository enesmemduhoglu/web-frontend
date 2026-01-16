import React from 'react';
import { FiMail } from 'react-icons/fi';

const NewsletterSection = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Abstract Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-[128px] opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-[128px] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center text-yellow-400 text-2xl mx-auto mb-8 shadow-2xl shadow-yellow-500/20">
                        <FiMail />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Fırsatları Kaçırma
                    </h2>

                    <p className="text-xl text-slate-400 mb-10 font-light leading-relaxed">
                        LuxeMarket bültenine abone olun, yeni koleksiyonlardan ve size özel indirimlerden ilk siz haberdar olun.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="E-posta adresiniz"
                            className="flex-grow px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/10 transition-all font-medium"
                        />
                        <button className="px-8 py-4 bg-yellow-400 text-slate-900 font-bold rounded-xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 whitespace-nowrap">
                            Abone Ol
                        </button>
                    </form>

                    <p className="text-xs text-slate-500 mt-6">
                        Abone olarak gizlilik politikamızı kabul etmiş olursunuz. İstediğiniz zaman iptal edebilirsiniz.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
