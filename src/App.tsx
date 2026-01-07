import React from 'react';
import { ChefHat, Smartphone, Zap, ShieldCheck, ArrowRight, Star, Send, Pause, MoreHorizontal, Heart } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import heroDish from './assets/hero-dish.png';
import './App.css';

function App() {
    const { t } = useTranslation();

    const stories = [
        { name: 'Sarah L.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', content: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1422&fit=crop' },
        { name: 'Mike D.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', content: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1422&fit=crop' },
        { name: 'Anya B.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', content: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1422&fit=crop' },
    ];

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
                        <span>Sabores Exclusivos</span>
                    </div>
                    <p>{t('footer.rights')}</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
