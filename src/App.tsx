import React, { useState, useEffect } from 'react';
// Build trigger: Reversion to 25/01 stable version
import {
    ChefHat,
    Smartphone,
    Zap,
    ShieldCheck,
    ArrowRight,
    Star,
    Send,
    Pause,
    MoreHorizontal,
    Heart,
    ChevronDown,
    Lock,
    Clock,
    Globe,
    User,
    Calendar,
    Scale,
    Ruler,
    Activity
} from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
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
import shakeStory from './assets/shake-story.jpg';
import avatarThiago from './assets/avatar-thiago.jpg';
import avatarDani from './assets/avatar-dani.jpg';
import avatarNicolas from './assets/avatar-nicolas.jpg';
import avatarLucia from './assets/avatar-lucia.jpg';
import avatarPablo from './assets/avatar-pablo.jpg';
import avatarCamilla from './assets/avatar-camilla.jpg';
import avatarGina from './assets/avatar-gina.jpg';
import mealGina from './assets/meal-gina.jpg';
import videoCard from './assets/CARD.webm';
import './App.css';

const VideoPlayer = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(console.error);
        }
    };

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force playback on mount and visibility change
        const checkPlayback = () => {
            if (document.visibilityState === 'visible' && video.paused) {
                video.play().catch(console.error);
            }
        };

        document.addEventListener('visibilitychange', checkPlayback);
        window.addEventListener('focus', checkPlayback);

        // Initial play attempt
        video.play().catch(console.error);

        return () => {
            document.removeEventListener('visibilitychange', checkPlayback);
            window.removeEventListener('focus', checkPlayback);
        };
    }, []);

    return (
        <section className="video-section">
            <div className="video-wrapper">
                <video
                    ref={videoRef}
                    src={videoCard}
                    loop
                    muted
                    autoPlay
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    onPause={handlePlay}
                    onContextMenu={(e) => e.preventDefault()}
                    className="video-element"
                />
            </div>
        </section>
    );
};

const BrandBadge = ({ children }: { children?: React.ReactNode }) => (
    <span className="brand-badge">
        <ChefHat size={20} className="badge-icon" />
        {children}
    </span>
);

const CountdownTimer = ({ urgencyText }: { urgencyText: string }) => {
    // Persistent target date logic
    const [targetDate] = useState(() => {
        const STORAGE_KEY = 'sabores_promo_end_date';
        const savedDate = localStorage.getItem(STORAGE_KEY);

        if (savedDate) {
            const date = new Date(savedDate);
            // If the saved date is in the past, reset it for the new visit (or handle as expired)
            if (date > new Date()) {
                return date;
            }
        }

        // Calculate new target: 2 days and 6 hours from now
        const newTarget = new Date();
        newTarget.setDate(newTarget.getDate() + 2);
        newTarget.setHours(newTarget.getHours() + 6);
        newTarget.setMinutes(newTarget.getMinutes() + 0);
        newTarget.setSeconds(newTarget.getSeconds() + 0);

        localStorage.setItem(STORAGE_KEY, newTarget.toISOString());
        return newTarget;
    });

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = +targetDate - +now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const next = calculateTimeLeft();
            setTimeLeft(next);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Simple digit display with animation key
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

        // Mifflin-St Jeor Formula
        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        const tdee = bmr * parseFloat(activity);
        const bulk = tdee + 300;
        const breakfast = bulk * 0.25;

        setResults({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            bulk: Math.round(bulk),
            breakfast: Math.round(breakfast)
        });
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
                        <div className="gender-toggle-premium">
                            <button
                                className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
                                onClick={() => setGender('male')}
                            >
                                <User size={16} />
                                {t('features.calculator.male')}
                            </button>
                            <button
                                className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
                                onClick={() => setGender('female')}
                            >
                                <User size={16} className="female-icon" />
                                {t('features.calculator.female')}
                            </button>
                        </div>
                    </div>

                    <div className="input-row-compact">
                        <div className="input-group">
                            <label>{t('features.calculator.age')}</label>
                            <div className="input-wrapper-icon">
                                <Calendar size={16} className="input-icon" />
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="25"
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>{t('features.calculator.weight')}</label>
                            <div className="input-wrapper-icon">
                                <Scale size={16} className="input-icon" />
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="70"
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>{t('features.calculator.height')}</label>
                            <div className="input-wrapper-icon">
                                <Ruler size={16} className="input-icon" />
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="175"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>{t('features.calculator.activity')}</label>
                        <div className="input-wrapper-icon">
                            <Activity size={16} className="input-icon" />
                            <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                                <option value="1.2">{t('features.calculator.activity_levels.sedentary')}</option>
                                <option value="1.375">{t('features.calculator.activity_levels.light')}</option>
                                <option value="1.55">{t('features.calculator.activity_levels.moderate')}</option>
                                <option value="1.725">{t('features.calculator.activity_levels.active')}</option>
                                <option value="1.9">{t('features.calculator.activity_levels.extra')}</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn-calculate-premium" onClick={calculate}>
                        <span>{t('features.calculator.calculate')}</span>
                        <Zap size={18} fill="currentColor" />
                    </button>
                </div>

                {results && (
                    <div className="results-card animate-fade-in">
                        <h3>{t('features.calculator.results.title')}</h3>
                        <div className="results-grid">
                            <div className="result-item">
                                <span className="result-label">{t('features.calculator.results.bmr')}</span>
                                <span className="result-value">{results.bmr} <small>{t('features.calculator.results.unit')}</small></span>
                            </div>
                            <div className="result-item highlight">
                                <span className="result-label">{t('features.calculator.results.tdee')}</span>
                                <span className="result-value">{results.tdee} <small>{t('features.calculator.results.unit')}</small></span>
                            </div>
                            <div className="result-item premium">
                                <span className="result-label">{t('features.calculator.results.bulk')}</span>
                                <span className="result-value">{results.bulk} <small>{t('features.calculator.results.unit')}</small></span>
                            </div>
                        </div>
                        <div className="breakfast-recommendation">
                            <ChefHat size={18} className="recommendation-icon" />
                            <span>{t('features.calculator.results.breakfast_recommendation')} <strong>{results.breakfast} {t('features.calculator.results.unit')}</strong></span>
                        </div>
                        <p className="results-disclaimer">{t('features.calculator.results.disclaimer')}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

function App() {
    const { t } = useTranslation();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeTransform, setActiveTransform] = useState(0);
    const [activeStory, setActiveStory] = useState(0);

    const stories = [
        { name: 'Nicolás N.', fullName: 'Nicolás Navas', avatar: avatarNicolas, content: meal2, quote: t('reviews.stories.nicolas') },
        { name: 'Dani C.', fullName: 'Dani Castro', avatar: avatarDani, content: shakeStory, quote: t('reviews.stories.dani') },
        { name: 'Thiago A.', fullName: 'Thiago Aguirre', avatar: avatarThiago, content: meal1, quote: t('reviews.stories.thiago') },
        { name: 'Lucia S.', fullName: 'Lucia Sánchez', avatar: avatarLucia, content: meal3, quote: t('reviews.stories.lucia') },
        { name: 'Pablo B.', fullName: 'Pablo Barrios', avatar: avatarPablo, content: meal4, quote: t('reviews.stories.pablo') },
        { name: 'Camilla B.', fullName: 'Camilla Beltrán', avatar: avatarCamilla, content: meal5, quote: t('reviews.stories.camilla') },
        { name: 'Gina F.', fullName: 'Gina Fonseca', avatar: avatarGina, content: mealGina, quote: t('reviews.stories.gina') },
    ];

    const transformations = [
        { image: transform1, name: 'Sofia A.', stats: '51kg - 56kg', duration: '4 meses' },
        { image: transform2, name: 'Antonio S.', stats: '57kg - 73kg', duration: '1 ano' },
        { image: transform3, name: 'Miguel C.', stats: '60kg - 72kg', duration: '11 meses' },
        { image: transform4, name: 'Rosa L.', stats: '52kg - 59kg', duration: '7 meses' },
        { image: transform5, name: 'Juan R.', stats: '52kg - 74kg', duration: '1 ano 2 meses' },
    ];
    React.useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // Disable specific shortcuts (F12, Ctrl+U, Ctrl+Shift+I, etc.)
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.key === 's')
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        // Security Console Message
        console.log(
            "%c🛑 PARE!",
            "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;"
        );
        console.log(
            "%cEste é um recurso do navegador voltado para desenvolvedores. Se alguém pediu para você copiar e colar algo aqui para 'ganhar algo' ou 'hackear' o site, é um golpe!",
            "font-family: sans-serif; font-size: 1.5em; font-weight: bold;"
        );
        console.log(
            "%cCopyright © 2026 Sabores Exclusivos. Todos os direitos reservados.",
            "font-family: sans-serif; font-size: 1em; color: gray;"
        );

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
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
                    <h1 className="reveal">
                        <Trans i18nKey="hero.title">
                            <span className="text-gradient">8 em cada 10 pessoas desistem</span>
                            <span className="title-secondary">nos primeiros 2 meses ao tentar ganhar peso e construir músculos</span>
                        </Trans>
                    </h1>
                    <div className="hero-subtitle-container reveal reveal-delay-1">
                        <div className="complaints-card">
                            <p className="subtitle-main">{t('hero.subtitle')}</p>
                            <ul className="complaints-list">
                                {(t('hero.complaints', { returnObjects: true }) as string[]).map((item, index) => (
                                    <li key={index}>
                                        <Zap size={14} className="bullet-icon" fill="currentColor" />
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

            <VideoPlayer />

            <section className="video-caption-section reveal reveal-delay-2">
                <div className="caption-content">
                    <div className="caption-decorator">
                        <ChefHat size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="caption-title">{t('features.video_caption.title')}</h3>
                    <p className="caption-subtitle">{t('features.video_caption.subtitle')}</p>
                </div>
            </section>

            {/* Stories Section */}
            <section className="reviews-stories reveal">
                <div className="stories-header">
                    <h2>{t('reviews.title')}</h2>
                </div>
                <div
                    className="story-cards-grid"
                    onScroll={(e) => {
                        const container = e.currentTarget;
                        const { scrollLeft, scrollWidth, clientWidth } = container;

                        // Calculate progress percentage
                        const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
                        const index = Math.round(scrollPercentage * (stories.length - 1));

                        // Safety check for empty or single item
                        if (!isNaN(index)) {
                            setActiveStory(index);
                        }
                    }}
                >
                    {stories.map((story, index) => (
                        <div key={index} className="story-item">
                            <div className="story-card">
                                {/* Instagram-style Bars */}
                                <div className="card-story-progress">
                                    <div className="progress-segment active"></div>
                                    <div className="progress-segment"></div>
                                    <div className="progress-segment"></div>
                                </div>

                                {/* Story User Info */}
                                <div className="card-story-user">
                                    <img src={story.avatar} alt={`Avatar de ${story.name} `} draggable="false" />
                                    <div className="user-details">
                                        <span className="user-name">{story.name}</span>
                                        <span className="post-time">8h</span>
                                    </div>
                                    <div className="header-actions">
                                        <Pause size={16} color="white" fill="white" />
                                        <MoreHorizontal size={18} color="white" />
                                    </div>
                                </div>

                                <img src={story.content} alt={`Depoimento de ${story.name} `} className="card-story-content" draggable="false" />

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

                            <div className="story-text-content reveal reveal-delay-2">
                                <p className="story-quote">"{story.quote}"</p>
                                <span className="story-author">{story.fullName}</span>

                                {/* Story Pagination Dots */}
                                <div className="story-pagination">
                                    {stories.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`story-dot ${activeStory === i ? 'active' : ''}`}
                                        />
                                    ))}
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
                        <img src={appShowroom} alt="App Sabores Exclusivos Interface" className="showroom-img" draggable="false" />
                    </div>
                </div>

                <div className="reveal reveal-delay-1">
                    <h2 className="showroom-caption-main">Cafés da manhã e Smoothies</h2>
                    <p className="showroom-caption-detail">deliciosos para ganhar massa muscular — simples, práticos e com ingredientes do dia a dia</p>
                </div>
            </section>

            <BMRCalculator />

            {/* Features Section */}
            <section id="features" className="features">
                <h2 className="section-title">
                    <Trans i18nKey="features.title" components={{ 1: <span className="brand-highlight" /> }} />
                </h2>
                <div className="feature-grid">
                    <div className="feature-card glass-morphism intro-feature-card">
                        <div className="icon-wrapper"><Zap /></div>
                        <h3>{t('features.instant.title')}</h3>
                        <p>{t('features.instant.desc')}</p>
                    </div>
                    <div className="feature-card glass-morphism faq-card faq-premium">
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
                        <div
                            className="transformations-grid"
                            onScroll={(e) => {
                                const container = e.currentTarget;
                                const { scrollLeft, scrollWidth, clientWidth } = container;

                                // Calculate progress percentage
                                const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
                                const index = Math.round(scrollPercentage * (transformations.length - 1));

                                if (!isNaN(index)) {
                                    setActiveTransform(index);
                                }
                            }}
                        >
                            {transformations.map((item, i) => (
                                <div key={i} className="transform-item-wrapper">
                                    <div className="transform-item">
                                        <img src={item.image} alt={`Resultado de transformação: ${item.name} `} draggable="false" />
                                    </div>
                                    <div className="transform-info">
                                        <span className="transform-name">{item.name}</span>
                                        <span className="transform-stats">{item.stats}</span>
                                        <span className="transform-duration">{item.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="transform-pagination">
                            {transformations.map((_, i) => (
                                <div
                                    key={i}
                                    className={`pagination-dot ${activeTransform === i ? 'active' : ''}`}
                                />
                            ))}
                        </div>
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
                    <Zap size={48} className="cta-icon" style={{ marginBottom: '2rem', opacity: 0.8 }} />
                    <h2>{t('cta.title')}</h2>
                    <p>{t('cta.subtitle')}</p>

                    <CountdownTimer urgencyText={t('cta.urgency')} />

                    <a
                        href="https://pay.hotmart.com/V104194764B"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cta-premium"
                        style={{ textDecoration: 'none' }}
                    >
                        {t('cta.button')}
                        <ArrowRight size={20} />
                    </a>

                    <div className="cta-guarantees">
                        <div className="cta-guarantee-item highlight">
                            <Globe size={14} />
                            <span>{t('cta.guarantees.taxes')}</span>
                        </div>
                        <div className="cta-guarantee-item">
                            <Lock size={14} />
                            <span>{t('cta.guarantees.secure')}</span>
                        </div>
                        <div className="cta-guarantee-item">
                            <Zap size={14} />
                            <span>{t('cta.guarantees.access')}</span>
                        </div>
                        <div className="cta-guarantee-item">
                            <ShieldCheck size={14} />
                            <span>{t('cta.guarantees.warranty')}</span>
                        </div>
                    </div>
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

