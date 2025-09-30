

import React, { useState, useEffect } from 'react';
import { useContent } from '../context/LanguageContext';
import { MenuIcon, XIcon } from './icons/MenuIcons';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface HeaderProps {
    isDetailPage: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDetailPage }) => {
    const { content } = useContent();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navLinks = [
        { key: 'home', id: 'home' },
        { key: 'products', id: 'products' },
        { key: 'solutions', id: 'solutions' },
        { key: 'contact', id: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            const sections = navLinks.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navLinks[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navLinks]);
    
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80; // h-20 = 5rem = 80px
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isDetailPage ? 'bg-trust-navy/90 shadow-lg backdrop-blur-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                <div className="flex justify-between items-center h-20">
                    
                    {isDetailPage ? (
                        <a href="/" className="flex items-center text-gray-200 hover:text-corporate-gold transition-colors">
                            <ArrowLeftIcon className="h-5 w-5 mr-2" />
                            <span className="font-medium">{content.nav.back}</span>
                        </a>
                    ) : (
                        <>
                            <a href="https://www.xinyitradinggroup.com/" className="flex items-center gap-3">
                                <img src="https://iili.io/FQiLFzQ.png" alt="Xinyi Trading Group Logo" className="h-12 w-auto" />
                                <span className="text-xl font-bold font-display text-gray-100 hidden sm:inline">Xinyi Trading</span>
                            </a>
                            <nav className="hidden lg:flex items-center space-x-8">
                                {navLinks.map(link => (
                                    <a 
                                        key={link.key} 
                                        href={`#${link.id}`} 
                                        onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                                        className={`nav-link-underline text-sm font-medium text-gray-300 hover:text-corporate-gold transition-colors ${activeSection === link.id ? 'active text-corporate-gold' : ''}`}
                                    >
                                        {content.nav[link.key as keyof typeof content.nav]}
                                    </a>
                                ))}
                            </nav>
                            <div className="hidden lg:flex items-center">
                                <button onClick={() => scrollToSection('contact')} className="px-5 py-2 bg-corporate-gold text-white font-bold rounded-full shadow-sm hover:bg-corporate-gold/80 transition-all duration-300 transform hover:scale-105">
                                    {content.header_cta.text}
                                </button>
                            </div>
                        </>
                    )}
                    
                    <div className="lg:hidden flex items-center">
                       {!isDetailPage && (
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-200 z-10 p-2">
                                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            </button>
                       )}
                    </div>
                </div>
            </div>
            {isOpen && !isDetailPage && (
                <div className="lg:hidden bg-trust-navy shadow-lg absolute top-0 left-0 w-full pt-20 animate-fade-in">
                    <div className="px-6 pt-2 pb-4 space-y-2">
                         {navLinks.map(link => (
                            <a key={link.key} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(link.id);}} className="block py-3 text-base font-medium text-gray-200 hover:text-corporate-gold hover:bg-light-gray rounded-md text-center">
                                {content.nav[link.key as keyof typeof content.nav]}
                            </a>
                        ))}
                        <div className="border-t border-gray-700 my-2 pt-4">
                             <button onClick={() => scrollToSection('contact')} className="w-full px-5 py-3 bg-corporate-gold text-white font-bold rounded-lg shadow-sm hover:bg-corporate-gold/80 transition-colors">
                                {content.header_cta.text}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;