

import React from 'react';
import Section from './Section';
import { useContent } from '../context/LanguageContext';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const Products: React.FC = () => {
    const { content } = useContent();

    return (
        <Section className="bg-trust-navy" id="products">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-100 reveal">{content.products_showcase.section_title}</h2>
                <p className="mt-4 text-lg text-medium-gray max-w-3xl mx-auto reveal" style={{ '--delay': '200ms' } as React.CSSProperties}>{content.products_showcase.section_subtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {content.products_showcase.products.map((product, index) => {
                    return (
                        <div 
                            key={product.id} 
                            className="bg-light-gray rounded-lg shadow-md hover:shadow-2xl hover:shadow-corporate-gold/10 transition-all duration-300 transform hover:-translate-y-2 reveal flex flex-col md:flex-row overflow-hidden" 
                            style={{ '--delay': `${200 + index*100}ms` } as React.CSSProperties}>
                            
                            {/* Image container: On mobile, uses aspect-ratio to maintain UI consistency. On desktop, adapts to flex-row. */}
                            <div className="relative md:w-5/12 flex-shrink-0 aspect-video md:aspect-auto bg-gray-800 md:bg-transparent flex items-center justify-center p-2">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-contain md:object-cover transition-transform duration-500 ease-in-out"
                                />
                            </div>

                            {/* Content container: Grows to fill available space */}
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-sm font-bold text-corporate-gold uppercase tracking-wider">{product.category}</span>
                                <h3 className="mt-2 text-2xl font-bold font-display text-gray-100">{product.name}</h3>
                                <p className="mt-3 text-medium-gray text-sm leading-relaxed flex-grow">{product.headline}</p>
                                <a 
                                    href={`/?product=${encodeURIComponent(product.id)}`}
                                    className="group mt-6 inline-flex items-center text-sm font-bold text-corporate-gold hover:text-corporate-gold/80 transition-colors self-start"
                                >
                                    {product.cta}
                                    <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};

export default Products;