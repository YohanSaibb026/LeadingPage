import React, { useState, useEffect } from 'react';
import { ChefHat, Smartphone, Zap, ShieldCheck, ArrowRight, Star, Send, Pause, MoreHorizontal, Heart, ChevronDown, Lock, Clock, Globe } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import heroDish from '../assets/hero-dish.png';
import heroApp from '../assets/hero-app-mockup.png';
import appShowroom from '../assets/app-showroom.png';
import meal1 from '../assets/meal-1.jpg';
import meal2 from '../assets/meal-2.jpg';
import meal3 from '../assets/meal-3.jpg';
import meal4 from '../assets/meal-4.jpg';
import meal5 from '../assets/meal-5.jpg';
import meal6 from '../assets/meal-6.jpg';
import transform1 from '../assets/transform-1.jpg';
import transform2 from '../assets/transform-2.jpg';
import transform3 from '../assets/transform-3.jpg';
import transform4 from '../assets/transform-4.jpg';
import transform5 from '../assets/transform-5.jpg';
import shakeStory from '../assets/shake-story.jpg';
import avatarThiago from '../assets/avatar-thiago.jpg';
import avatarDani from '../assets/avatar-dani.jpg';
import avatarNicolas from '../assets/avatar-nicolas.jpg';
import avatarLucia from '../assets/avatar-lucia.jpg';
import avatarPablo from '../assets/avatar-pablo.jpg';
import avatarCamilla from '../assets/avatar-camilla.jpg';
import avatarGina from '../assets/avatar-gina.jpg';
import mealGina from '../assets/meal-gina.jpg';
import cardVideo from '../assets/CARD.webm';

const BrandBadge = ({ children }: { children?: React.ReactNode }) => (
    <span className="brand-badge">
        <ChefHat size={20} className="badge-icon" />
        {children}
    </span>
);

const CountdownTimer = ({ urgencyText }: { urgencyText: string }) => {
    const [targetDate] = useState(() => {
        const STORAGE_KEY = 'sabores_promo_end_date_v4';
        const savedDate = localStorage.getItem(STORAGE_KEY);
        if (savedDate) {
            const date = new Date(savedDate);
            if (date > new Date()) return date;
        }
        const newTarget = new Date();
        newTarget.setDate(newTarget.getDate() + 4);
        localStorage.setItem(STORAGE_KEY, newTarget.toISOString());
        return newTarget;
    });

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = +targetDate - +now;
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    const Digit = ({ value, label }: { value: number | string, label: string }) => (
        <div className="timer-unit">
            <span key={value} className="timer-value animate-pop">{value}</span>
            <span className="timer-suffix">{label}</span>
        </div>
    );

    return (
        <div className="cta-timer-wrapper">
            <p className="timer-label">
                <Clock size={16} className="animate-pulse" />
                {urgencyText}
            </p>
            <div className="cta-timer">
                <Digit value={timeLeft.days} label="d" />
                <div className="timer-separator">:</div>
                <Digit value={timeLeft.hours.toString().padStart(2, '0')} label="h" />
                <div className="timer-separator">:</div>
                <Digit value={timeLeft.minutes.toString().padStart(2, '0')} label="m" />
                <div className="timer-separator">:</div>
                <Digit value={timeLeft.seconds.toString().padStart(2, '0')} label="s" />
            </div>
        </div>
    );
};

const BMRCalculator = () => {
    const { t } = useTranslation();
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState('1.2');
    const [results, setResults] = useState<{ bmr: number; tdee: number; bulk: number; breakfast: number } | null>(null);

    const calculate = () => {
        if (!age || !weight || !height) return;
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseInt(age);
        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        if (gender === 'male') bmr += 5; else bmr -= 161;
        const tdee = bmr * parseFloat(activity);
        const bulk = tdee + 300;
        const breakfast = bulk * 0.25;
        setResults({ bmr: Math.round(bmr), tdee: Math.round(tdee), bulk: Math.round(bulk), breakfast: Math.round(breakfast) });
    };

    return (
        <section className="bmr-calculator-section">
            <div className="calculator-container glass-morphism">
                <div className="calculator-header">
                    <h2>{t('features.calculator.title')}</h2>
                    <p>{t('features.calculator.subtitle')}</p>
                </div>
                <div className="calculator-grid">
                    <div className="input-group">
                        <label>{t('features.calculator.gender')}</label>
                        <div className="gender-toggle">
                            <button className={`gender-btn ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')}>{t('features.calculator.male')}</button>
                            <button className={`gender-btn ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')}>{t('features.calculator.female')}</button>
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group"><label>{t('features.calculator.age')}</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" /></div>
                        <div className="input-group"><label>{t('features.calculator.weight')}</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" /></div>
                        <div className="input-group"><label>{t('features.calculator.height')}</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" /></div>
                    </div>
                    <div className="input-group">
                        <label>{t('features.calculator.activity')}</label>
                        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                            <option value="1.2">{t('features.calculator.activity_levels.sedentary')}</option>
                            <option value="1.375">{t('features.calculator.activity_levels.light')}</option>
                            <option value="1.55">{t('features.calculator.activity_levels.moderate')}</option>
                            <option value="1.725">{t('features.calculator.activity_levels.active')}</option>
                            <option value="1.9">{t('features.calculator.activity_levels.extra')}</option>
                        </select>
                    </div>
                    <button className="btn-calculate" onClick={calculate}>{t('features.calculator.calculate')}<Zap size={18} /></button>
                </div>
                {results && (
                    <div className="results-card animate-fade-in">
                        <h3>{t('features.calculator.results.title')}</h3>
                        <div className="results-grid">
                            <div className="result-item"><span className="result-label">{t('features.calculator.results.bmr')}</span><span className="result-value">{results.bmr} <small>{t('features.calculator.results.unit')}</small></span></div>
                            <div className="result-item highlight"><span className="result-label">{t('features.calculator.results.tdee')}</span><span className="result-value">{results.tdee} <small>{t('features.calculator.results.unit')}</small></span></div>
                            <div className="result-item premium"><span className="result-label">{t('features.calculator.results.bulk')}</span><span className="result-value">{results.bulk} <small>{t('features.calculator.results.unit')}</small></span></div>
                        </div>
                        <div className="breakfast-recommendation"><ChefHat size={18} className="recommendation-icon" /><span>{t('features.calculator.results.breakfast_recommendation')} <strong>{results.breakfast} {t('features.calculator.results.unit')}</strong></span></div>
                        <p className="results-disclaimer">{t('features.calculator.results.disclaimer')}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default function Home() {
    const { t } = useTranslation();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeTransformIndex, setActiveTransformIndex] = useState(0);
    const stories = [
        { name: 'Nicolás N.', fullName: 'Nicolás Navas', avatar: avatarNicolas, content: meal2, testimonialKey: 'nicolas' },
        { name: 'Dani C.', fullName: 'Dani Castro', avatar: avatarDani, content: shakeStory, testimonialKey: 'dani' },
        { name: 'Thiago A.', fullName: 'Thiago Aguirre', avatar: avatarThiago, content: meal1, testimonialKey: 'thiago' },
        { name: 'Lucia S.', fullName: 'Lucia Sánchez', avatar: avatarLucia, content: meal3, testimonialKey: 'lucia' },
        { name: 'Pablo B.', fullName: 'Pablo Barrios', avatar: avatarPablo, content: meal4, testimonialKey: 'pablo' },
        { name: 'Camilla B.', fullName: 'Camilla Beltrán', avatar: avatarCamilla, content: meal5, testimonialKey: 'camilla' },
        { name: 'Gina F.', fullName: 'Gina Fonseca', avatar: avatarGina, content: mealGina, testimonialKey: 'gina' },
    ];
    const transformations = [
        { image: transform1, name: 'Sofia A.', stats: '51kg - 56kg', duration: '4 meses' },
        { image: transform2, name: 'Antonio S.', stats: '57kg - 73kg', duration: '1 ano' },
        { image: transform3, name: 'Miguel C.', stats: '60kg - 72kg', duration: '11 meses' },
        { image: transform4, name: 'Rosa L.', stats: '52kg - 59kg', duration: '7 meses' },
        { image: transform5, name: 'Juan R.', stats: '52kg - 74kg', duration: '1 ano 2 meses' },
    ];
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const heroCardRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.key === 's')) e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsHeroVisible(true); observer.disconnect(); } }, { threshold: 0.2 });
        if (heroCardRef.current) observer.observe(heroCardRef.current);
        return () => { document.removeEventListener('contextmenu', handleContextMenu); document.removeEventListener('keydown', handleKeyDown); observer.disconnect(); };
    }, []);

    const handleTransformScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollLeft = container.scrollLeft;
        const width = container.offsetWidth;
        const itemWidth = 280 + 20;
        const index = Math.round(scrollLeft / itemWidth);
        setActiveTransformIndex(index);
    };

    return (
        <div className="landing-container">
            <nav className="navbar glass-morphism">
                <div className="nav-content">
                    <div className="logo"><ChefHat className="logo-icon" /><span>Sabores Exclusivos</span></div>
                    <div className="nav-links"><a href="#features">{t('nav.features')}</a><a href="#pricing">{t('nav.pricing')}</a></div>
                </div>
            </nav>
            <header className="hero">
                <div className="hero-content">
                    <h1><Trans i18nKey="hero.title"><span className="text-gradient">8 em cada 10 pessoas desistem</span><span className="title-secondary">nos primeiros 2 meses ao tentar ganhar peso e construir músculos</span></Trans></h1>
                    <div className="hero-subtitle-container">
                        <div className="complaints-card">
                            <p className="subtitle-main">{t('hero.subtitle')}</p>
                            <ul className="complaints-list">{(t('hero.complaints', { returnObjects: true }) as string[]).map((item, index) => (<li key={index}><span className="bullet">.</span>{item}</li>))}</ul>
                        </div>
                    </div>
                </div>
            </header>
            <section className="punchline-divider">
                <div className="punchline-video-wrapper"><video src={cardVideo} autoPlay muted loop playsInline preload="auto" disablePictureInPicture onPause={(e) => e.currentTarget.play()} onPlay={(e) => { e.currentTarget.muted = true; e.currentTarget.play(); }} onEnded={(e) => e.currentTarget.play()} className="punchline-video" style={{ pointerEvents: 'none' }} /><div className="punchline-video-overlay"></div></div>
            </section>
            <section className="reviews-stories">
                <div className="stories-header"><h2>{t('reviews.title')}</h2></div>
                <div className="story-cards-grid">
                    {stories.map((story, index) => (
                        <div key={index} className="story-card-item">
                            <div className="story-card">
                                <div className="card-story-progress"><div className="progress-segment active"></div><div className="progress-segment"></div><div className="progress-segment"></div></div>
                                <div className="card-story-user"><img src={story.avatar} alt="" draggable="false" /><div className="user-details"><span className="user-name">{story.name}</span><span className="post-time">8h</span></div><div className="header-actions"><Pause size={16} color="white" fill="white" /><MoreHorizontal size={18} color="white" /></div></div>
                                <img src={story.content} alt={story.name} className="card-story-content" draggable="false" />
                                <div className="card-story-footer"><div className="footer-input"><span>Responder a {story.name}...</span></div><div className="footer-actions"><Heart size={20} color="white" /><Send size={20} color="white" /></div></div>
                            </div>
                            {story.testimonialKey && (
                                <div className="testimonial-container"><p className="story-testimonial-refined">{t(`reviews.items.${story.testimonialKey}`)}</p><span className="testimonial-author">{story.fullName}</span></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <section className="app-showroom">
                <div className="punchline-external-header"><div className="punchline-decorator"><ChefHat size={32} strokeWidth={1.5} /></div><h2 className="punchline-external-title">{t('hero.punchline_header')}</h2></div>
                <div className="showroom-card">
                    <div className="showroom-evaluation"><span className="eval-score">4.9/5</span><div className="eval-stars">{[1, 2, 3, 4, 5].map((star) => (<Star key={star} size={18} fill="#F59E0B" color="#F59E0B" />))}</div><p className="eval-text">{t('hero.social')}</p></div>
                    <div className="showroom-img-wrapper"><img src={appShowroom} alt="App Sabores Exclusivos Interface" className="showroom-img" draggable="false" /></div>
                </div>
                <div className="punchline-external-footer"><h2 className="punchline-external-footer-title">{t('hero.punchline_footer')}</h2></div>
            </section>
            <BMRCalculator />
            <section id="features" className="features">
                <h2 className="section-title">{t('features.title')}</h2>
                <div className="feature-grid">
                    <div className="feature-card glass-morphism"><div className="icon-wrapper"><Zap /></div><h3>{t('features.instant.title')}</h3><p>{t('features.instant.desc')}</p></div>
                    <div className="feature-card glass-morphism faq-card">
                        <div className="icon-wrapper"><Smartphone /></div><h3>{t('features.faq_section.title')}</h3>
                        <div className="faq-accordion">{[0, 1, 2].map((idx) => (<div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}><button className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}><span>{t(`features.faq_section.items.${idx}.q`)}</span><ChevronDown size={18} className="faq-chevron" /></button><div className="faq-answer"><p>{t(`features.faq_section.items.${idx}.a`)}</p></div></div>))}</div>
                    </div>
                    <div className="feature-card glass-morphism transformation-card">
                        <div className="icon-wrapper"><Star /></div><h3>{t('features.transformations.title')}</h3><p>{t('features.transformations.desc')}</p>
                        <div className="transformations-grid" onScroll={handleTransformScroll}>
                            {transformations.map((item, i) => (<div key={i} className="transform-item-wrapper"><div className="transform-item"><img src={item.image} alt={`Transformation ${i + 1}`} draggable="false" /></div><div className="transform-info"><span className="transform-name">{item.name}</span><span className="transform-stats">{item.stats}</span><span className="transform-duration">{item.duration}</span></div></div>))}
                        </div>
                        <div className="pagination-dots">{transformations.map((_, i) => (<div key={i} className={`dot ${activeTransformIndex === i ? 'active' : ''}`} />))}</div>
                    </div>
                </div>
            </section>
            <section className="pricing-comparison">
                <div className="price-container glass-morphism">
                    <div className="price-row old-price"><p className="price-label"><Trans i18nKey="features.pricing.consultation" components={{ 1: <u style={{ textDecorationThickness: '2px' }} /> }} /></p><p className="price-value strike">{t('features.pricing.consultation_price')}</p></div>
                    <div className="price-divider"><span>VS</span></div>
                    <div className="price-row new-price"><p className="price-label"><Trans i18nKey="features.pricing.app_access" components={{ 1: <BrandBadge /> }} /></p><p className="price-value strike">{t('features.pricing.app_price')}</p></div>
                </div>
                <div className="promotion-card glass-morphism">
                    <h3 className="promo-title">{t('features.pricing.promotion.title')}</h3><p className="promo-subtitle">{t('features.pricing.promotion.subtitle')}</p><div className="promo-divider"></div><p className="promo-label">{t('features.pricing.promotion.label')}</p>
                    <div className="promo-price-container"><span className="promo-from">{t('features.pricing.promotion.price_from')}</span><span className="promo-to">{t('features.pricing.promotion.price_to')}</span></div>
                </div>
            </section>
            <section className="cta-section">
                <div className="cta-card premium-gradient">
                    <Zap size={48} className="cta-icon" style={{ marginBottom: '2rem', opacity: 0.8 }} /><h2>{t('cta.title')}</h2><p>{t('cta.subtitle')}</p>
                    <CountdownTimer urgencyText={t('cta.urgency')} />
                    <a href="https://pay.hotmart.com/V104194764B" className="btn-cta-premium" onClick={() => { if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', 'InitiateCheckout'); }}>{t('cta.button')}<ArrowRight size={20} /></a>
                    <div className="cta-guarantees"><div className="cta-guarantee-item"><Lock size={16} /><span>{t('cta.guarantees.secure')}</span></div><div className="cta-guarantee-item"><Zap size={16} /><span>{t('cta.guarantees.access')}</span></div><div className="cta-guarantee-item"><ShieldCheck size={16} /><span>{t('cta.guarantees.warranty')}</span></div><div className="cta-guarantee-item tax-bubble"><Globe size={16} /><span>{t('cta.tax_disclaimer')}</span></div></div>
                </div>
            </section>
            <footer className="footer"><div className="footer-content"><div className="footer-logo"><ChefHat /><span>Sabores Exclusivos</span></div><p>{t('footer.rights')}</p></div></footer>
        </div>
    );
}
