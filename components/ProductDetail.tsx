import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../data/content';
import Section from './Section';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ProductDetailProps {
    product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const heroRef = useRef<HTMLDivElement>(null);
    const [isHeroVisible, setIsHeroVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsHeroVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = heroRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerOffset = 80; // Height of the fixed header
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-trust-navy">
            {/* Hero Section */}
            <header 
                ref={heroRef}
                data-visible={isHeroVisible}
                className="relative bg-light-gray"
            >
                <div className="absolute inset-0 bg-cover bg-center opacity-5"></div>
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    <div className="min-h-screen grid lg:grid-cols-2 items-center gap-12 relative z-10 pt-24 pb-12 lg:pt-20 lg:pb-12">
                        <div className="text-center lg:text-left">
                            <span 
                                className="text-corporate-gold font-bold uppercase tracking-wider pop-in"
                                style={{ '--delay': '100ms' } as React.CSSProperties}
                            >
                                {product.category}
                            </span>
                            <h1 
                                className="text-4xl md:text-6xl font-bold font-display text-gray-100 mt-2 leading-tight md:leading-tight pop-in"
                                style={{ '--delay': '200ms' } as React.CSSProperties}
                            >
                                {product.name}
                            </h1>
                            {product.detailTagline && (
                                <p 
                                    className="mt-6 text-lg text-medium-gray max-w-xl mx-auto lg:mx-0 pop-in"
                                    style={{ '--delay': '350ms' } as React.CSSProperties}
                                >
                                    {product.detailTagline}
                                </p>
                            )}
                            <div 
                                className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pop-in"
                                style={{ '--delay': '500ms' } as React.CSSProperties}
                            >
                                <button 
                                    onClick={scrollToContact}
                                    className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-corporate-gold text-white font-bold rounded-lg shadow-lg hover:bg-corporate-gold/80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                                >
                                    Get a Quote
                                    <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center h-full pop-in" style={{ '--delay': '400ms' } as React.CSSProperties}>
                           <div className="relative w-full max-w-lg aspect-square">
                                <img src={product.heroImage || product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl rounded-2xl" />
                           </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Video Section */}
            {product.videoUrl && (
                <Section className="bg-trust-navy">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold font-display text-gray-100 mb-4 reveal">Watch in Action</h2>
                        {product.videoDescription && <p className="text-lg text-medium-gray mb-8 reveal" style={{ '--delay': '200ms' } as React.CSSProperties}>{product.videoDescription}</p>}
                        <div className="reveal" style={{ '--delay': '400ms' } as React.CSSProperties}>
                            {(() => {
                                const getEmbedUrl = (urlStr: string): string | null => {
                                    try {
                                        const url = new URL(urlStr);
            
                                        if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
                                            let videoId;
                                            if (url.hostname.includes('youtu.be')) {
                                                videoId = url.pathname.split('/').pop();
                                            } else {
                                                videoId = url.searchParams.get('v');
                                            }
            
                                            if (videoId) {
                                                // Autoplay requires mute=1. Loop and playlist are for continuous play. Controls=0 for a cleaner look.
                                                return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&showinfo=0`;
                                            }
                                        }
            
                                        // Fallback for old Google Drive links if any are left
                                        if (url.hostname.includes('drive.google.com')) {
                                            const fileIdMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
                                            if (fileIdMatch && fileIdMatch[1]) {
                                                const driveVideoId = fileIdMatch[1];
                                                return `https://drive.google.com/file/d/${driveVideoId}/preview`;
                                            }
                                        }
                                    } catch (e) {
                                        console.error("Invalid video URL", e);
                                        return null;
                                    }
                                    return null;
                                };
                                
                                const embedUrl = getEmbedUrl(product.videoUrl);
            
                                if (embedUrl) {
                                    return (
                                        <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                                            <iframe
                                                className="w-full h-full"
                                                src={embedUrl}
                                                title="Product video"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    );
                                }
                                
                                console.warn(`Could not generate embed URL for: ${product.videoUrl}`);
                                return null;
                            })()}
                        </div>
                    </div>
                </Section>
            )}

            {/* Key Specs Section */}
            {product.keySpecs && product.keySpecs.length > 0 && (
                <Section className="bg-light-gray">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {product.keySpecs.map((spec, index) => (
                            <div key={index} className="pop-in" style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
                                <p className="text-3xl md:text-4xl font-bold font-display text-corporate-gold">{spec.value}</p>
                                <p className="mt-2 text-medium-gray uppercase text-sm tracking-wider">{spec.label}</p>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Feature Sections */}
            {product.featureSections && product.featureSections.length >= 2 && (
                <Section className="bg-trust-navy">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="reveal">
                            <div className="bg-light-gray rounded-2xl shadow-xl p-4 md:p-6">
                                <img
                                    src={product.featureSections[0].image}
                                    alt={product.featureSections[0].title}
                                    className="w-full h-auto object-cover rounded-xl"
                                />
                            </div>
                        </div>
                        <div className="reveal" style={{ '--delay': '200ms' } as React.CSSProperties}>
                            <div className="space-y-10">
                                <div>
                                    <h2 className="text-3xl font-bold font-display text-gray-100">{product.featureSections[0].title}</h2>
                                    <p className="mt-4 text-lg text-medium-gray leading-relaxed">{product.featureSections[0].description}</p>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold font-display text-gray-100">{product.featureSections[1].title}</h2>
                                    <p className="mt-4 text-lg text-medium-gray leading-relaxed">{product.featureSections[1].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            )}

            {/* Combination Section for Specs and Apps */}
            <Section className="bg-light-gray">
                <div className="grid md:grid-cols-5 gap-8 lg:gap-16">
                    {/* Technical Specifications Section */}
                    <div className="md:col-span-3">
                        {product.techSpecs && product.techSpecs.length > 0 && (
                            <>
                                <h2 className="text-3xl font-bold font-display text-gray-100 mb-8 reveal">Technical Specifications</h2>
                                <div className="overflow-x-auto reveal rounded-lg border border-gray-700">
                                    <table className="w-full text-left border-collapse">
                                        <tbody className="align-baseline">
                                            {product.techSpecs.flatMap(category => category.specs).map((spec, specIndex) => (
                                                <tr key={specIndex} className="border-b border-gray-800 last-of-type:border-b-0">
                                                    <td className="px-6 py-4 text-medium-gray">{spec.name}</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-200 text-right">{spec.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Applications Section */}
                    <div className="md:col-span-2">
                        {product.applications && product.applications.length > 0 && (
                             <div className="bg-trust-navy h-fit rounded-xl p-8 sticky top-28">
                                <h2 className="text-2xl font-bold font-display text-gray-100 mb-6 reveal">Typical Applications</h2>
                                <ul className="space-y-4">
                                    {product.applications.map((app, index) => (
                                        <li key={index} className="flex items-start reveal" style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
                                            <CheckCircleIcon className="h-6 w-6 text-corporate-gold mr-3 mt-1 flex-shrink-0" />
                                            <span className="text-lg text-gray-200">{app}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ProductDetail;