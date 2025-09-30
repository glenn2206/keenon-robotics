import React from 'react';

const partnerLogos = [
    'https://static.keenon.com/uploads/2024/12/30/936e00de2b5a44708fd0af378e8fdcb2.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/a182882c18c74868ba8b8fd332a20557.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/245f31b7a97d4cd68ef6f4b97e81bdcc.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/2bcf616b698b4fdfb9581bc118658ca1.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/73109ca376f44d7fbedda46e761c3ed8.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/87d15881e2914a96b451dc6eca029d3f.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/10b9cf3900074417b250e492459c8006.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/0230030f9106439a95102363d5c2bdb8.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/54618ae886cd40cf81223f28d0eac947.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/e86ce8aedfd84db1a689f013d21796f9.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/412f910b367f47dfbee2131547124bf5.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/6f8da5275ec8461cb8ab47251657407b.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/e8bf122bfdd449279ee1ea8772850cd7.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/71d3dbd7c42d40799ed5efebcc25ad9c.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/4f72ec37a7f049998b5d80a2061a544c.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/a7bc720d5fc34187842dea1acf256cf1.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/9bd1083972644d52a7554218e05fb3fd.jpg?x-oss-process=image/format,webp',
    'https://static.keenon.com/uploads/2024/12/30/e9a6af202c7247e4bed7b925d4b1d95c.jpg?x-oss-process=image/format,webp'
];

const Partners: React.FC = () => {
    // Duplicate logos for a seamless animation loop
    const extendedLogos = [...partnerLogos];

    return (
        <section className="bg-white py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-800">Our Partners & Clients</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                        We are proud to collaborate with leading companies and institutions worldwide.
                    </p>
                </div>
            </div>
            <div className="mt-16 w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
                <ul className="flex items-center justify-center animate-infinite-scroll">
                    {extendedLogos.map((logo, index) => (
                        <li key={`logo-${index}`} className="flex-shrink-0 mx-12 md:mx-16">
                            <img className="h-24 md:h-28 object-contain w-auto" src={logo} alt={`Partner logo ${index + 1}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Partners;