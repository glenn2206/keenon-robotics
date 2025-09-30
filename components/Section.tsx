import React, { ReactNode, useRef, useEffect, useState } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    noXPadding?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id, noXPadding = false }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);


    return (
        <section ref={ref} id={id} data-visible={isVisible} className={`py-16 md:py-24 ${className}`}>
            <div className={`container mx-auto max-w-7xl ${noXPadding ? '' : 'px-6 lg:px-8'}`}>
                {children}
            </div>
        </section>
    );
};

export default Section;