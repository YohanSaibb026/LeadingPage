import React, { useState, useEffect } from 'react';
import { ChefHat, Smartphone, Zap, ShieldCheck, ArrowRight, Star, X, Send } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import heroDish from './assets/hero-dish.png';
import './App.css';

function App() {
    const { t } = useTranslation();
    const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);

    const stories = [
        { name: 'Sarah L.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', content: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1422&fit=crop' },
        { name: 'Mike D.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', content: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1422&fit=crop' },
        { name: 'Anya B.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', content: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1422&fit=crop' },
        { name: 'João P.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', content: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1422&fit=crop' },
        { name: 'Maria K.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', content: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1422&fit=crop' },
        { name: 'Lucas R.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', content: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1422&fit=crop' },
    ];

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (activeStoryIndex !== null) {
            setProgress(0);
            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        handleNextStory();
                        return 0;
                    }
                    return prev + 1;
                });
            }, 50);
        }
        return () => clearInterval(timer);
    }, [activeStoryIndex]);

    const handleNextStory = () => {
        if (activeStoryIndex !== null) {
            if (activeStoryIndex < stories.length - 1) {
                setActiveStoryIndex(activeStoryIndex + 1);
            } else {
                setActiveStoryIndex(null);
            }
        }
    };

    const handlePrevStory = () => {
        if (activeStoryIndex !== null) {
            if (activeStoryIndex > 0) {
                setActiveStoryIndex(activeStoryIndex - 1);
            } else {
                setProgress(0);
            }
        }
    };

    return (
        <div className="landing-container">
            {/* Navigation */}
            <nav className="navbar glass-morphism">
                <div className="nav-content">
                    <div className="logo">
                        <ChefHat className="logo-icon" />
                        <span>NutriTrack AI</span>
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
                    <div className="hero-btns">
                        <button className="btn-primary">{t('hero.continue')} <ArrowRight size={18} /></button>
                        <button className="btn-secondary">{t('hero.demo')}</button>
                    </div>
                    <div className="social-proof">
                        <div className="stars">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <span>{t('hero.social')}</span>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="image-container">
                        <img src={heroDish} alt="Gourmet healthy dish" />
                    </div>
                </div>
            </header>

            {/* Stories Section */}
            <section className="reviews-stories">
                <h2>{t('reviews.title')}</h2>
                <div className="stories-wrapper">
                    {stories.map((story, index) => (
                        <div key={index} className="story-item" onClick={() => setActiveStoryIndex(index)}>
                            <div className="story-ring">
                                <img src={story.avatar} alt={story.name} className="story-avatar" />
                            </div>
                            <span className="story-name">{story.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Story Viewer Overlay */}
            {activeStoryIndex !== null && (
                <div className="story-overlay">
                    <div className="story-container">
                        {/* Progress Bars */}
                        <div className="story-progress-container">
                            {stories.map((_, idx) => (
                                <div key={idx} className="story-progress-bg">
                                    <div
                                        className="story-progress-fill"
                                        style={{
                                            width: idx < activeStoryIndex ? '100%' : idx === activeStoryIndex ? `${progress}%` : '0%'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Header */}
                        <div className="story-header">
                            <div className="story-user">
                                <img src={stories[activeStoryIndex].avatar} alt="" />
                                <span>{stories[activeStoryIndex].name}</span>
                                <span className="story-time">8h</span>
                            </div>
                            <button className="story-close" onClick={() => setActiveStoryIndex(null)}>
                                <X size={24} color="white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="story-content-wrapper" onClick={(e) => {
                            const x = e.clientX / window.innerWidth;
                            if (x < 0.3) handlePrevStory();
                            else handleNextStory();
                        }}>
                            <img src={stories[activeStoryIndex].content} alt="Story content" className="story-image-full" />
                        </div>

                        {/* Footer */}
                        <div className="story-footer">
                            <div className="story-input">
                                <span>Enviar mensagem...</span>
                            </div>
                            <Send size={20} color="white" />
                        </div>
                    </div>
                </div>
            )}

            {/* Features Section */}
            <section id="features" className="features">
                <h2 className="section-title">{t('features.title')}</h2>
                <div className="feature-grid">
                    <div className="feature-card glass-morphism">
                        <div className="icon-wrapper"><Zap /></div>
                        <h3>{t('features.instant.title')}</h3>
                        <p>{t('features.instant.desc')}</p>
                    </div>
                    <div className="feature-card glass-morphism">
                        <div className="icon-wrapper"><Smartphone /></div>
                        <h3>{t('features.always.title')}</h3>
                        <p>{t('features.always.desc')}</p>
                    </div>
                    <div className="feature-card glass-morphism">
                        <div className="icon-wrapper"><ShieldCheck /></div>
                        <h3>{t('features.data.title')}</h3>
                        <p>{t('features.data.desc')}</p>
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
                        <span>NutriTrack AI</span>
                    </div>
                    <p>{t('footer.rights')}</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
