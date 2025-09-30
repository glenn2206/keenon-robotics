import React from 'react';
import Section from './Section';
import { useContent } from '../context/LanguageContext';
import { 
    ProductivityIcon, 
    CustomerExperienceIcon, 
    CostEfficiencyIcon, 
    ScalabilityIcon 
} from './icons/AdvantageIcons';

// Map icon names from content to actual icon components
const iconMap: { [key: string]: React.FC<{className: string}> } = {
    ProductivityIcon,
    CustomerExperienceIcon,
    CostEfficiencyIcon,
    ScalabilityIcon,
};

const ValueProps: React.FC = () => {
    const { content } = useContent();
    const { section_title, benefits } = content.value_propositions;

    return (
        <Section id="about" className="bg-light-gray">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                
                {/* Image column */}
                <div className="reveal" style={{ '--delay': '400ms' } as React.CSSProperties}>
                    <div className="relative w-full h-[500px] rounded-2xl shadow-xl overflow-hidden">
                        <img 
                            src="https://cdn.pudutech.com/pic_pudu_14fb325fb6.webp" 
                            alt="PUDU robots in a modern environment showcasing the brand's technology" 
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                </div>

                {/* Benefits column */}
                <div className="reveal" style={{ '--delay': '200ms' } as React.CSSProperties}>
                     <div className="mb-10">
                        <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-100">{section_title}</h2>
                    </div>
                     <ul className="space-y-8">
                        {benefits.map((item, index) => {
                            const Icon = iconMap[item.icon];
                            return (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0 bg-trust-navy p-3 rounded-full mr-5 shadow-sm border border-gray-700/50">
                                      {Icon && <Icon className="h-7 w-7 text-corporate-gold" />}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold font-display text-gray-200">{item.title}</h4>
                                        <p className="text-medium-gray mt-2 leading-relaxed">{item.description}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

            </div>
        </Section>
    );
};

export default ValueProps;