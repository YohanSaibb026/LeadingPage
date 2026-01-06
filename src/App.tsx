import React from 'react';
import { ChefHat, Smartphone, Zap, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import heroDish from './assets/hero-dish.png';
import './App.css';

function App() {
    const { t } = useTranslation();

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
                            <span className="text-gradient">8 em cada 10 pessoas</span> desistem nos primeiros 2 meses quando tentam ganhar peso e construir músculos
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
