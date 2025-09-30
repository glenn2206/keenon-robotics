import React from 'react';

const WhatsAppCTA: React.FC = () => {
    const whatsappNumber = "6282315156088";
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Us on WhatsApp"
            className="fixed bottom-8 right-8 z-40 flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:rounded-lg opacity-0 animate-fade-in-up"
        >
            {/* Image container with blue outline */}
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-1 shadow-lg border-2 border-blue-600 animate-gentle-bounce">
                <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                        src="https://images2.imgbox.com/a3/12/AnPR5cbG_o.png" 
                        alt="C40 Cleaning Robot" 
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* "Contact Us" Button */}
            <div className="bg-blue-600 text-white font-bold text-base px-6 py-2 rounded-full shadow-lg transform -translate-y-6">
                Contact Us
            </div>
        </a>
    );
};

export default WhatsAppCTA;