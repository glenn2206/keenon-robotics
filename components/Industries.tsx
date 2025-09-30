import React from 'react';
import Section from './Section';
import { useContent } from '../context/LanguageContext';
import { IndustryIcon } from './icons/IndustryIcon';

const Industries: React.FC = () => {
    const { content } = useContent();

    return (
        <Section className="bg-white">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-800 reveal">{content.solutions_by_industry.section_title}</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto font-light reveal" style={{ '--delay': '200ms' } as React.CSSProperties}>{content.solutions_by_industry.section_subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {content.solutions_by_industry.industries.map((industry, index) => (
                    <div 
                        key={index} 
                        className="bg-gray-50 p-6 rounded-lg flex items-center border border-transparent hover:border-yellow-400 hover:bg-white transition-all duration-300 reveal"
                        style={{ '--delay': `${200 + index * 50}ms` } as React.CSSProperties}
                    >
                        <IndustryIcon className="h-8 w-8 text-yellow-500 mr-4 flex-shrink-0"/>
                        <span className="font-medium text-slate-700">{industry.name}</span>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Industries;
