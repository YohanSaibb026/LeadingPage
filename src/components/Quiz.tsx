import React, { useState, useEffect } from 'react';
import { ChefHat, ArrowRight, Zap, CheckCircle2, ChevronDown, User, Calendar, Smartphone, Globe, Clock, ShieldCheck, Play } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function Quiz() {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState('1.2');
    const [isCalculating, setIsCalculating] = useState(false);
    const [results, setResults] = useState<{ bmr: number; tdee: number; bulk: number; breakfast: number } | null>(null);

    const steps = [
        { title: t('features.calculator.title'), icon: <User size={24} /> },
        { title: t('features.calculator.activity'), icon: <Globe size={24} /> }
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            calculate();
        }
    };

    const calculate = () => {
        setIsCalculating(true);
        setTimeout(() => {
            const w = parseFloat(weight);
            const h = parseFloat(height);
            const a = parseInt(age);

            let bmr = (10 * w) + (6.25 * h) - (5 * a);
            if (gender === 'male') bmr += 5; else bmr -= 161;

            const tdee = bmr * parseFloat(activity);
            const bulk = tdee + 300;
            const breakfast = bulk * 0.25;

            setResults({
                bmr: Math.round(bmr),
                tdee: Math.round(tdee),
                bulk: Math.round(bulk),
                breakfast: Math.round(breakfast)
            });
            setIsCalculating(false);
            setStep(steps.length); // Results step
        }, 2500);
    };

    const progress = ((step) / (steps.length)) * 100;

    if (isCalculating) {
        return (
            <div className="quiz-container full-screen flex-center">
                <div className="calculating-overlay animate-fade-in">
                    <div className="spinner-wrapper">
                        <div className="premium-spinner"></div>
                        <Zap className="spinner-icon animate-pulse" size={32} />
                    </div>
                    <h2>{t('quiz.calculating_title')}</h2>
                    <p>{t('quiz.calculating_desc')}</p>
                </div>
            </div>
        );
    }

    if (results) {
        return (
            <div className="quiz-container animate-fade-in">
                <div className="results-hero glass-morphism">
                    <CheckCircle2 color="#10B981" size={48} />
                    <h1>{t('quiz.results_title')}</h1>
                    <p>{t('quiz.results_subtitle')}</p>

                    <div className="quiz-results-grid">
                        <div className="quiz-result-card">
                            <span>{t('quiz.bmr_label')}</span>
                            <h3>{results.bmr} <small>kcal</small></h3>
                        </div>
                        <div className="quiz-result-card highlight">
                            <span>{t('quiz.tdee_label')}</span>
                            <h3>{results.tdee} <small>kcal</small></h3>
                        </div>
                        <div className="quiz-result-card premium">
                            <span>{t('quiz.bulk_label')}</span>
                            <h3>{results.bulk} <small>kcal</small></h3>
                        </div>
                    </div>

                    <div className="breakfast-callout">
                        <ChefHat size={24} />
                        <p>
                            <Trans i18nKey="quiz.breakfast_recommendation" values={{ calories: results.breakfast }}>
                                Seu café da manhã ideal deve ter <strong>{results.breakfast} kcal</strong> para atingir essa meta.
                            </Trans>
                        </p>
                    </div>

                    <div className="final-cta-box">
                        <p>{t('quiz.cta_text')}</p>
                        <a href="https://pay.hotmart.com/V104194764B" className="btn-cta-premium" onClick={() => { if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', 'InitiateCheckout'); }}>
                            {t('quiz.cta_button')}
                            <ArrowRight size={20} />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <nav className="quiz-nav">
                <ChefHat size={32} />
                <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="step-indicator">{t('quiz.step_indicator', { current: step + 1, total: steps.length })}</span>
            </nav>

            <main className="quiz-content animate-slide-up">
                <div className="quiz-card glass-morphism">
                    <div className="quiz-header">
                        {steps[step].icon}
                        <h2>{steps[step].title}</h2>
                    </div>

                    <div className="quiz-body">
                        {step === 0 && (
                            <div className="quiz-step-physics">
                                <div className="input-group full-width">
                                    <label>{t('features.calculator.gender')}</label>
                                    <div className="gender-toggle-quiz">
                                        <button className={`gender-btn ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')}>{t('quiz.gender_male')}</button>
                                        <button className={`gender-btn ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')}>{t('quiz.gender_female')}</button>
                                    </div>
                                </div>
                                <div className="physics-grid">
                                    <div className="input-group">
                                        <label>{t('features.calculator.age')}</label>
                                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" />
                                    </div>
                                    <div className="input-group">
                                        <label>{t('features.calculator.weight')}</label>
                                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" />
                                    </div>
                                    <div className="input-group">
                                        <label>{t('features.calculator.height')}</label>
                                        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" />
                                    </div>
                                </div>
                                <button className="btn-quiz-next" disabled={!age || !weight || !height} onClick={nextStep}>
                                    {t('quiz.btn_continue')} <ArrowRight size={20} />
                                </button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="activity-list-step">
                                <div className="activity-options-list">
                                    {[
                                        { val: '1.2', label: t('features.calculator.activity_levels.sedentary') },
                                        { val: '1.375', label: t('features.calculator.activity_levels.light') },
                                        { val: '1.55', label: t('features.calculator.activity_levels.moderate') },
                                        { val: '1.725', label: t('features.calculator.activity_levels.active') },
                                        { val: '1.9', label: t('features.calculator.activity_levels.extra') }
                                    ].map((opt) => (
                                        <button
                                            key={opt.val}
                                            className={`activity-option-card ${activity === opt.val ? 'active' : ''}`}
                                            onClick={() => setActivity(opt.val)}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                                <button className="btn-quiz-next premium" onClick={nextStep}>
                                    {t('features.calculator.calculate')} <Zap size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
