import React, { useState, useRef, useEffect, useCallback } from 'react';
import Section from './Section';
import { useContent } from '../context/LanguageContext';
import { NewsArticle } from '../data/content';

const NewsAndInsights: React.FC = () => {
    const { content } = useContent();
    const { section_title } = content.news_and_insights;

    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInitialLoad = useRef(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const feedUrl = 'https://cms.xinyitradinggroup.com/?feed=rss2';
                // Using rss2json to convert RSS to JSON, which is more reliable than a generic CORS proxy
                const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data.status !== 'ok') {
                    throw new Error('Failed to fetch RSS feed.');
                }
                
                const tempDiv = document.createElement('div');
                
                const parsedArticles: NewsArticle[] = data.items.map((item: any) => {
                    // Using a temporary DOM element to decode HTML entities from RSS feed content.
                    tempDiv.innerHTML = item.content || '';
                    const description = (tempDiv.textContent || tempDiv.innerText || '').substring(0, 150) + '...';

                    tempDiv.innerHTML = item.title || '';
                    const title = tempDiv.textContent || tempDiv.innerText || 'No Title';

                    tempDiv.innerHTML = item.categories?.[0] || '';
                    const category = tempDiv.textContent || tempDiv.innerText || 'News';

                    return {
                        title: title,
                        link: item.link || '#',
                        description: description,
                        date: new Date(item.pubDate).toISOString().split('T')[0],
                        category: category,
                    };
                });
                
                setArticles(parsedArticles);
            } catch (e) {
                console.error("Failed to fetch or parse RSS feed:", e);
                setError('Could not load the latest news. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleSelectArticle = (index: number) => {
        setActiveIndex(index);
    };
    
    const scrollToCard = useCallback((index: number) => {
        if (scrollContainerRef.current) {
            const flexContainer = scrollContainerRef.current;
            const scrollContainer = flexContainer.parentElement as HTMLElement;
            const card = flexContainer.children[index] as HTMLElement;

            if (card && scrollContainer) {
                const containerWidth = scrollContainer.offsetWidth;
                const cardWidth = card.offsetWidth;
                // Calculate position to center the card
                const scrollLeft = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
                
                scrollContainer.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth',
                });
            }
        }
    }, []);

    useEffect(() => {
        // Prevent scrolling on initial data load.
        if (isInitialLoad.current) {
            if (articles.length > 0) {
                 isInitialLoad.current = false;
            }
            return;
        }
        
        if (articles.length > 0) {
            scrollToCard(activeIndex);
        }
    }, [activeIndex, scrollToCard, articles.length]);

    const activeArticle = articles.length > 0 ? articles[activeIndex] : null;

    return (
        <Section className="bg-trust-navy" id="news">
            <div className="bg-light-gray rounded-2xl shadow-xl p-8 md:p-12 reveal">
                <div className="mb-8 lg:mb-12">
                     <h2 className="text-3xl lg:text-42 font-bold font-display text-gray-100">
                        {section_title}
                    </h2>
                </div>
                
                {isLoading && <div className="text-center text-medium-gray">Loading latest news...</div>}
                {error && <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
                
                {!isLoading && !error && articles.length === 0 && (
                    <div className="text-center text-medium-gray">No news available at the moment.</div>
                )}
                
                {!isLoading && !error && activeArticle && (
                    <>
                        {/* Main Featured Article */}
                        <div key={activeIndex} className="bg-trust-navy shadow-lg rounded-xl mb-12 reveal pop-in animate-fade-in overflow-hidden">
                            <div className="p-6 md:p-8 flex flex-col justify-between">
                                <div>
                                    <div className="uppercase tracking-wide text-sm text-corporate-gold font-semibold">{activeArticle.category}</div>
                                    <a href={activeArticle.link} target="_blank" rel="noopener noreferrer" className="block mt-1 text-xl md:text-2xl leading-tight font-bold text-gray-100 hover:underline">{activeArticle.title}</a>
                                    <p className="mt-4 text-medium-gray line-clamp-4 text-sm md:text-base">{activeArticle.description}</p>
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                    <p className="text-sm text-medium-gray">{activeArticle.date}</p>
                                    <a href={activeArticle.link} target="_blank" rel="noopener noreferrer" className="text-corporate-gold font-semibold hover:text-corporate-gold/80 text-sm">Read More &rarr;</a>
                                </div>
                            </div>
                        </div>

                        {/* Article Selector Slider */}
                        <div className="relative reveal">
                             <div className="overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4">
                                <div ref={scrollContainerRef} className="flex w-max items-center space-x-4">
                                    {articles.map((article, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSelectArticle(index)}
                                            aria-label={`Select article: ${article.title}`}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSelectArticle(index)}
                                            className={`snap-center cursor-pointer flex-shrink-0 w-48 p-4 rounded-lg transition-all duration-300 transform flex items-center justify-center text-center min-h-24 ${
                                                activeIndex === index
                                                    ? 'bg-trust-navy shadow-xl scale-105 z-10'
                                                    : 'bg-trust-navy/70 scale-95 opacity-80 hover:opacity-100 hover:scale-100 hover:shadow-md'
                                            }`}
                                        >
                                            <h3 className="font-semibold text-sm text-gray-200 line-clamp-3">{article.title}</h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Section>
    );
};

export default NewsAndInsights;