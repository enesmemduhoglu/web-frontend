import React from 'react';
import { FiTruck, FiShield, FiClock, FiCreditCard } from 'react-icons/fi';

const features = [
    {
        icon: <FiTruck size={28} />,
        title: "Hızlı Teslimat",
        desc: "Siparişleriniz aynı gün kargoya verilir ve en kısa sürede kapınızda.",
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        icon: <FiShield size={28} />,
        title: "Güvenli Alışveriş",
        desc: "256-bit SSL sertifikası ile ödemeleriniz %100 güvende.",
        color: "text-green-500",
        bg: "bg-green-50"
    },
    {
        icon: <FiClock size={28} />,
        title: "7/24 Destek",
        desc: "Sorularınız için uzman destek ekibimiz her zaman yanınızda.",
        color: "text-purple-500",
        bg: "bg-purple-50"
    },
    {
        icon: <FiCreditCard size={28} />,
        title: "Kolay İade",
        desc: "Beğenmediğiniz ürünleri 14 gün içinde koşulsuz iade edebilirsiniz.",
        color: "text-orange-500",
        bg: "bg-orange-50"
    },
];

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group p-8 rounded-3xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-xl transition-all duration-300">
                            <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed font-medium text-sm">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
