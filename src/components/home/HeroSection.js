import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
    const scrollToProducts = () => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full h-[85vh] bg-slate-900 text-white overflow-hidden flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                    alt="Luxury Fashion"
                    className="w-full h-full object-cover object-top opacity-40 animate-scale-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl animate-fadeInUp">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                        <span className="text-yellow-400 font-bold text-xs tracking-widest uppercase">Yeni Koleksiyon 2024</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 tracking-tight">
                        Tarzını <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 relative">
                            Yeniden Keşfet.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-light">
                        LuxeMarket ile premium alışveriş deneyimini yaşayın. En seçkin markalar, özel tasarımlar ve eşsiz fırsatlar sizi bekliyor.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <button
                            onClick={scrollToProducts}
                            className="group px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold rounded-full shadow-lg shadow-yellow-400/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
                        >
                            Alışverişe Başla
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full backdrop-blur-sm border border-white/10 transition-all hover:border-white/30">
                            Koleksiyonları İncele
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Glass Elements */}
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 hidden lg:block animate-float">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 w-64">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-lg">✨</div>
                        <div>
                            <p className="font-bold text-sm">Premium Kalite</p>
                            <p className="text-xs text-slate-400">Onaylanmış Ürünler</p>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-yellow-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
