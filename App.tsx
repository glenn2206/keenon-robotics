

import React, { useEffect } from 'react';
import { ContentProvider, useContent } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Solutions from './components/Services'; // Repurposed Services.tsx as Solutions
import Partners from './components/Partners';
import CustomerStories from './components/News'; // Repurposed News.tsx as CustomerStories
import NewsAndInsights from './components/NewsAndInsights';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const AppCore: React.FC = () => {
    const { content } = useContent();
    
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    const productData = productId 
        ? content.products_showcase.products.find(p => p.id === productId) 
        : null;

    useEffect(() => {
        // On component mount or when product changes, scroll to top.
        // Overrides browser's scroll restoration for consistent user experience.
        window.scrollTo(0, 0);
    }, [productId]);

    useEffect(() => {
        if (productData) {
            document.title = `${productData.name} - ${content.company_name}`;
        } else {
            document.title = `${content.company_name} - ${content.tagline}`;
        }
    }, [productData, content.company_name, content.tagline]);
    
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80; // Height of the fixed header (h-20)
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const HomePageContent = () => (
         <>
            <div id="home"><Hero scrollToProducts={() => scrollToSection('products')} /></div>
            <div id="products"><Products /></div>
            <div id="solutions"><Solutions /></div>
            <Partners />
            <CustomerStories />
            <NewsAndInsights />
        </>
    );

    return (
        <div className="bg-trust-navy text-gray-200 font-sans">
            <Header isDetailPage={!!productData} />
            
            <main>
                {productData ? (
                    <ProductDetail product={productData} />
                ) : (
                    <HomePageContent />
                )}
                <div id="contact"><Contact /></div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

const App: React.FC = () => (
    <ContentProvider>
        <AppCore />
    </ContentProvider>
);

export default App;