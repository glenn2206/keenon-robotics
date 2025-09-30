

import React from 'react';
import Section from './Section';
import { useContent } from '../context/LanguageContext';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface CTAProps {
    scrollToContact: () => void;
    productBrochureUrl?: string;
}

const CTA: React.FC<CTAProps> = ({ scrollToContact, productBrochureUrl }) => {
    const { content } = useContent();

    // Use product-specific brochure if available, otherwise fall back to a general one.
    const generalBrochureUrl = "https://www.pudurobotics.com/uploads/files/202310/1697615965902193.pdf";
    const brochureUrl = productBrochureUrl || generalBrochureUrl;

    return (
        <Section className="bg-trust-navy text-white">
             <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-display reveal text-gray-100">{content.cta_section.headline}</h2>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto reveal" style={{ '--delay': '200ms' } as React.CSSProperties}>{content.cta_section.subheadline}</p>
                 <div 
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 reveal"
                    style={{ '--delay': '400ms' } as React.CSSProperties}
                >
                    <a 
                        href={brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-gray-600 hover:border-corporate-gold hover:text-corporate-gold transition-all duration-300"
                    >
                        {content.cta_section.secondary_cta}
                    </a>
                </div>
            </div>
        </Section>
    );
};

export default CTA;