import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const slidesData = [
    {
        link: "https://www.keenon.com/en/solution/catering/index.html",
        desktopImg: "https://static.keenon.com/uploads/2025/04/27/399b2df9da8e4ff1931ea03d7aa05212.jpg?x-oss-process=image/format,webp",
        mobileImg: "https://static.keenon.com/uploads/2025/04/27/7fcbda8219c548febe42b9ceea81881b.jpg?x-oss-process=image/format,webp",
        alt: "Robots serving in a restaurant, showcasing the catering solution."
    },
    {
        link: "https://www.keenon.com/en/solution/hotel/index.html",
        desktopImg: "https://static.keenon.com/uploads/2025/04/27/4e5c2059175b4da19d19dbdf8549b41b.jpg?x-oss-process=image/format,webp",
        mobileImg: "https://static.keenon.com/uploads/2025/04/27/b9f84a3d886a429f8a6e707a287b8670.jpg?x-oss-process=image/format,webp",
        alt: "A delivery robot in a hotel hallway, showcasing the hotel solution."
    }
];

const Solutions: React.FC = () => {
    return (
        <section id="solutions" className="bg-trust-navy">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
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
                className="w-full"
                a11y={{
                    prevSlideMessage: 'Previous slide',
                    nextSlideMessage: 'Next slide',
                }}
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <a className="block w-full h-full cursor-pointer" href={slide.link} target="_blank" rel="noopener noreferrer" aria-label={`Learn more about our ${slide.alt}`}>
                            <picture>
                                <source srcSet={slide.desktopImg} media="(min-width: 768px)" />
                                <source srcSet={slide.mobileImg} media="(max-width: 767px)" />
                                <img className="w-full object-cover" src={slide.mobileImg} alt={slide.alt} />
                            </picture>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Solutions;
