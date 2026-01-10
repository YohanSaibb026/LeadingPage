import React, { useState } from 'react';
import { ChefHat, Smartphone, Zap, ShieldCheck, ArrowRight, Star, Send, Pause, MoreHorizontal, Heart, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import heroDish from './assets/hero-dish.png';
import heroApp from './assets/hero-app-mockup.png';
import appShowroom from './assets/app-showroom.png';
import meal1 from './assets/meal-1.jpg';
import meal2 from './assets/meal-2.jpg';
import meal3 from './assets/meal-3.jpg';
import meal4 from './assets/meal-4.jpg';
import meal5 from './assets/meal-5.jpg';
import meal6 from './assets/meal-6.jpg';
import transform1 from './assets/transform-1.jpg';
import transform2 from './assets/transform-2.jpg';
import transform3 from './assets/transform-3.jpg';
import transform4 from './assets/transform-4.jpg';
import transform5 from './assets/transform-5.jpg';
import './App.css';

const BrandBadge = ({ children }: { children?: React.ReactNode }) => (
    <span className="brand-badge">
        <ChefHat size={20} className="badge-icon" />
        {children}
    </span>
);

function App() {
    const { t } = useTranslation();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const stories = [
        { name: 'Sarah L.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', content: meal1 },
        { name: 'Mike D.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', content: meal2 },
        { name: 'Anya B.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', content: meal3 },
        { name: 'João P.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', content: meal4 },
        { name: 'Ricardo M.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', content: meal5 },
        { name: 'Carla S.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', content: meal6 },
    ];

    const transformations = [transform1, transform2, transform3, transform4, transform5];

    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const heroCardRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsHeroVisible(true);
                    observer.disconnect(); // Animate once
                }
            },
            { threshold: 0.2 } // Trigger when 20% visible
        );

        if (heroCardRef.current) {
            observer.observe(heroCardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-container">
            {/* Navigation */}
            <nav className="navbar glass-morphism">
                <div className="nav-content">
                    <div className="logo">
                        <ChefHat className="logo-icon" />
                        <span>Sabores Exclusivos</span>
                    </div>
                    <div className="nav-links">
                        <a href="#features">{t('nav.features')}</a>
                        <a href="#pricing">{t('nav.pricing')}</a>
                        <button className="btn-primary-small">{t('nav.download')}</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <div className="badge">{t('hero.badge')}</div>
                    <h1>
                        <Trans i18nKey="hero.title">
                            <span className="text-gradient">8 em cada 10 pessoas desistem</span>
                            <span className="title-secondary">nos primeiros 2 meses ao tentar ganhar peso e construir músculos</span>
                        </Trans>
                    </h1>
                    <div className="hero-subtitle-container">
                        <div className="complaints-card">
                            <p className="subtitle-main">{t('hero.subtitle')}</p>
                            <ul className="complaints-list">
                                {(t('hero.complaints', { returnObjects: true }) as string[]).map((item, index) => (
                                    <li key={index}>
                                        <span className="bullet">.</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Hero buttons removed to streamline flow to reviews */}

                </div>
                <div className="hero-image-wrapper">
                    {/* Mockup area removed - starting fresh */}
                </div>
            </header>

            {/* Stories Section */}
            <section className="reviews-stories">
                <div className="stories-header">
                    <h2>{t('reviews.title')}</h2>
                </div>
                <div className="story-cards-grid">
                    {stories.map((story, index) => (
                        <div key={index} className="story-card">
                            {/* Instagram-style Bars */}
                            <div className="card-story-progress">
                                <div className="progress-segment active"></div>
                                <div className="progress-segment"></div>
                                <div className="progress-segment"></div>
                            </div>

                            {/* Story User Info */}
                            <div className="card-story-user">
                                <img src={story.avatar} alt="" />
                                <div className="user-details">
                                    <span className="user-name">{story.name}</span>
                                    <span className="post-time">8h</span>
                                </div>
                                <div className="header-actions">
                                    <Pause size={16} color="white" fill="white" />
                                    <MoreHorizontal size={18} color="white" />
                                </div>
                            </div>

                            <img src={story.content} alt={story.name} className="card-story-content" />

                            {/* Story Footer */}
                            <div className="card-story-footer">
                                <div className="footer-input">
                                    <span>Responder a {story.name}...</span>
                                </div>
                                <div className="footer-actions">
                                    <Heart size={20} color="white" />
                                    <Send size={20} color="white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* App Interface Showroom */}
            <section className="app-showroom">
                <div className="showroom-card">
                    <div className="showroom-evaluation">
                        <span className="eval-score">4.9/5</span>
                        <div className="eval-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={18} fill="#F59E0B" color="#F59E0B" />
                            ))}
                        </div>
                        <p className="eval-text">{t('hero.social')}</p>
                    </div>
                    <div className="showroom-img-wrapper">
                        <img src={appShowroom} alt="App Sabores Exclusivos Interface" className="showroom-img" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <h2 className="section-title">{t('features.title')}</h2>
                <div className="feature-grid">
                    <div className="feature-card glass-morphism">
                        <div className="icon-wrapper"><Zap /></div>
                        <h3>{t('features.instant.title')}</h3>
                        <p>{t('features.instant.desc')}</p>
                    </div>
                    <div className="feature-card glass-morphism faq-card">
                        <div className="icon-wrapper"><Smartphone /></div>
                        <h3>{t('features.faq_section.title')}</h3>
                        <div className="faq-accordion">
                            {[0, 1, 2].map((idx) => (
                                <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                                    <button
                                        className="faq-question"
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    >
                                        <span>{t(`features.faq_section.items.${idx}.q`)}</span>
                                        <ChevronDown size={18} className="faq-chevron" />
                                    </button>
                                    <div className="faq-answer">
                                        <p>{t(`features.faq_section.items.${idx}.a`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="feature-card glass-morphism transformation-card">
                        <div className="icon-wrapper"><Star /></div>
                        <h3>{t('features.transformations.title')}</h3>
                        <p>{t('features.transformations.desc')}</p>
                        <div className="transformations-grid">
                            {transformations.map((img, i) => (
                                <div key={i} className="transform-item">
                                    <img src={img} alt={`Transformation ${i + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className="target-audience">
                <div className="audience-content">
                    <h2 className="section-title">{t('features.target_audience.title')}</h2>
                    <div className="audience-list">
                        {[0, 1, 2].map((idx) => (
                            <div key={idx} className="audience-item">
                                <CheckCircle2 className="check-icon" size={24} />
                                <p>{t(`features.target_audience.items.${idx}`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Price Comparison Section */}
            <section className="pricing-comparison">
                <div className="price-container glass-morphism">
                    <div className="price-row old-price">
                        <p className="price-label">
                            <Trans i18nKey="features.pricing.consultation" components={{ 1: <u style={{ textDecorationThickness: '2px' }} /> }} />
                        </p>
                        <p className="price-value strike">{t('features.pricing.consultation_price')}</p>
                    </div>

                    <div className="price-divider">
                        <span>VS</span>
                    </div>

                    <div className="price-row new-price">
                        <p className="price-label">
                            <Trans
                                i18nKey="features.pricing.app_access"
                                components={{
                                    1: <BrandBadge />
                                }}
                            />
                        </p>
                        <p className="price-value strike">{t('features.pricing.app_price')}</p>
                    </div>
                </div>

                {/* Promotion Card */}
                <div className="promotion-card glass-morphism">
                    <h3 className="promo-title">{t('features.pricing.promotion.title')}</h3>
                    <p className="promo-subtitle">{t('features.pricing.promotion.subtitle')}</p>
                    <div className="promo-divider"></div>
                    <p className="promo-label">{t('features.pricing.promotion.label')}</p>
                    <div className="promo-price-container">
                        <span className="promo-from">{t('features.pricing.promotion.price_from')}</span>
                        <span className="promo-to">{t('features.pricing.promotion.price_to')}</span>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card premium-gradient">
                    <h2>{t('cta.title')}</h2>
                    <p>{t('cta.subtitle')}</p>
                    <button className="btn-white">{t('cta.button')}</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <ChefHat />
                        <span>Sabores Exclusivos</span>
                    </div>
                    <p>{t('footer.rights')}</p>
                </div>
            </footer>
        </div>
    );
}

export default App;

