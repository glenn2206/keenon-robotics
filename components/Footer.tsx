

import React from 'react';
import { useContent } from '../context/LanguageContext';

const Footer: React.FC = () => {
    const { content } = useContent();
    return (
        <footer className="bg-trust-navy text-gray-300">
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-16">
                <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} {content.footer.company_info.name}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;