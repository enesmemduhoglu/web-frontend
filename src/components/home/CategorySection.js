import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const categories = [
    {
        id: 1,
        name: 'Elektronik',
        itemCount: '1.2k+ Ürün',
        image: 'https://images.unsplash.com/photo-1498049381145-06a172cd13cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        size: 'col-span-1 md:col-span-2 row-span-2'
    },
    {
        id: 2,
        name: 'Moda',
        itemCount: '850+ Ürün',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        size: 'col-span-1 md:col-span-1 row-span-1'
    },
    {
        id: 3,
        name: 'Ev & Yaşam',
        itemCount: '540+ Ürün',
        image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        size: 'col-span-1 md:col-span-1 row-span-1'
    },
    {
        id: 4,
        name: 'Spor & Outdoor',
        itemCount: '320+ Ürün',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        size: 'col-span-1 md:col-span-2 row-span-1'
    }
];

const CategorySection = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-yellow-500 font-bold tracking-wider uppercase text-sm">Keşfet</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Popüler Kategoriler</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[600px] md:h-[500px]">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className={`relative group rounded-3xl overflow-hidden cursor-pointer ${cat.size}`}
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">{cat.name}</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-slate-300 text-sm font-medium">{cat.itemCount}</p>
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                        <FiArrowRight />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
