import React from 'react';
import Section from './Section';
import { useContent } from '../context/LanguageContext';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const Quality: React.FC = () => {
    const { content } = useContent();

    return (
        <Section className="bg-gray-50">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="reveal" style={{ '--delay': '200ms' } as React.CSSProperties}>
                     <div className="mb-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-800">{content.value_propositions.section_title}</h2>
                    </div>
                     <ul className="space-y-6">
                        {content.value_propositions.benefits.map((item, index) => (
                             <li key={index} className="flex">
                                <CheckCircleIcon className="flex-shrink-0 h-8 w-8 text-yellow-500 mr-4" />
                                <div>
                                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                                    <p className="text-slate-600 mt-1">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="hidden md:block h-[600px] reveal" style={{ '--delay': '400ms' } as React.CSSProperties}>
                    <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1613626013098-90cf3141f62c?q=80&w=1974&auto=format&fit=crop" 
                            alt="Warehouse manager overseeing logistics for quality assurance at PT Xinyi Trading Group's supply chain operations." 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Quality;
