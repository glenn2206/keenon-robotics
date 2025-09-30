import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Section from './Section';


const storiesData = [
    {
        link: "https://www.keenon.com/en/stories/catering/index.html",
        image: "https://images2.imgbox.com/70/de/pfaTT16n_o.jpg",
        category: "Catering",
        title: "Redefining the Dining Experience",
        description: "KEENON Robotics enhances restaurant efficiency and customer engagement with intelligent, autonomous solutions for food delivery and service.",
        alt: "KEENON delivery robot serving food in a bustling, modern restaurant.",
        location: "Washington DC, USA",
        client: "Hilton Washington Dulles Airport · Internationally acclaimed 5-star hotel",
        product: "T5 x 1"
    },
    {
        link: "https://www.keenon.com/en/stories/hotel/index.html",
        image: "https://images2.imgbox.com/db/cd/3JIWtIyz_o.jpg",
        category: "Hotel",
        title: "Elevating Guest Service with Smart Automation",
        description: "From room service to luggage delivery, KEENON robots provide secure, contactless, and efficient service, allowing hotel staff to focus on personalized guest care.",
        alt: "A KEENON robot delivering items in a luxury hotel corridor.",
        location: "Tokyo, Japan",
        client: "Sheraton Grande Tokyo Bay Hotel · Internationally acclaimed 5-star hotel",
        product: "W3 x 1"
    },
    {
        link: "https://www.keenon.com/en/stories/retail/index.html",
        image: "https://images2.imgbox.com/c2/b6/C6yfUDtJ_o.jpg",
        category: "Supermarket",
        title: "Enhancing the Shopping Experience",
        description: "KEENON's smart robots assist shoppers, guide customers, and manage inventory, creating a more efficient and enjoyable retail environment.",
        alt: "A KEENON robot guiding a customer in a bright, modern supermarket aisle.",
        location: "Ljubljana, Slovenia",
        client: "E.Leclerc · Renowned Supermarket Chain",
        product: "T10 x 1"
    },
    {
        link: "https://www.keenon.com/en/stories/cleaning/index.html",
        image: "https://images2.imgbox.com/1e/cc/iHtTQ1tn_o.png",
        category: "Cleaning",
        title: "A New Standard for Commercial Cleaning",
        description: "KEENON's cleaning robots provide intelligent, systematic, and efficient floor maintenance for large commercial spaces, ensuring a consistently clean and safe environment.",
        alt: "A KEENON cleaning robot autonomously scrubbing the floor of a large exhibition hall.",
        location: "Thailand",
        client: "Smart Hotel Solutions · Furama Chiang Mai",
        product: "T10x1 C30x1 W3x1 S100x1"
    }
];

const CustomerStories: React.FC = () => {
    return (
        <Section className="bg-trust-navy">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-100 reveal">Customer Stories</h2>
                <p className="mt-4 text-lg text-medium-gray max-w-3xl mx-auto reveal" style={{ '--delay': '200ms' } as React.CSSProperties}>See how businesses across industries are thriving with our robotic solutions.</p>
            </div>
            <div className="reveal">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    className="w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-lg"
                    a11y={{
                        prevSlideMessage: 'Previous story',
                        nextSlideMessage: 'Next story',
                    }}
                >
                    {storiesData.map((story, index) => (
                        <SwiperSlide key={index} className="relative bg-light-gray">
                            <a href={story.link} target="_blank" rel="noopener noreferrer" aria-label={`Read more about the ${story.category} story`}>
                                <div className="absolute inset-0">
                                    <img className="w-full h-full object-cover" src={story.image} alt={story.alt} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                </div>
                                <div className="relative h-full flex flex-col justify-end text-white p-6 md:p-12">
                                   <div className="max-w-3xl">
                                        <span className="text-sm font-bold text-corporate-gold uppercase tracking-wider">{story.category}</span>
                                        <h3 className="mt-2 text-3xl md:text-4xl font-bold font-display leading-tight">{story.title}</h3>
                                        <div className="mt-4 text-base text-gray-200 max-w-2xl">
                                            <p className="font-semibold">{story.location} | {story.client}</p>
                                            <p className="mt-2 text-sm text-gray-400">Product: <span className="font-medium text-gray-300">{story.product}</span></p>
                                        </div>
                                   </div>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Section>
    );
};

export default CustomerStories;