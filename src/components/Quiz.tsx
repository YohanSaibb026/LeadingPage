import React, { useState, useEffect } from 'react';
import { ChefHat, ArrowRight, Zap, CheckCircle2, ChevronDown, User, Calendar, Smartphone, Globe, Clock, ShieldCheck, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
        { title: t('features.calculator.gender'), icon: <User size={24} /> },
        { title: t('features.calculator.age'), icon: <Calendar size={24} /> },
        { title: t('features.calculator.weight'), icon: <Zap size={24} /> },
        { title: t('features.calculator.height'), icon: <ShieldCheck size={24} /> },
        { title: t('features.calculator.activity'), icon: <Globe size={24} /> }
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            calculate();
        }
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
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
                    <h2>Analisando seus dados...</h2>
                    <p>Montando seu plano personalizado com base no seu metabolismo.</p>
                </div>
            </div>
        );
    }

    if (results) {
        return (
            <div className="quiz-container animate-fade-in">
                <div className="results-hero glass-morphism">
                    <CheckCircle2 color="#10B981" size={48} />
                    <h1>Plano Calculado com Sucesso!</h1>
                    <p>Com base nos seus dados, aqui está o que seu corpo precisa:</p>

                    <div className="quiz-results-grid">
                        <div className="quiz-result-card">
                            <span>Metabolismo Basal</span>
                            <h3>{results.bmr} <small>kcal</small></h3>
                        </div>
                        <div className="quiz-result-card highlight">
                            <span>Gasto Diário (TDEE)</span>
                            <h3>{results.tdee} <small>kcal</small></h3>
                        </div>
                        <div className="quiz-result-card premium">
                            <span>Meta para Ganho</span>
                            <h3>{results.bulk} <small>kcal</small></h3>
                        </div>
                    </div>

                    <div className="breakfast-callout">
                        <ChefHat size={24} />
                        <p>Seu café da manhã ideal deve ter <strong>{results.breakfast} kcal</strong> para atingir essa meta.</p>
                    </div>

                    <div className="final-cta-box">
                        <p>Quer as receitas exatas e o passo a passo para chegar nesse resultado sem erro?</p>
                        <a href="https://clubsaboresexclusivos.com" className="btn-cta-premium">
                            Acessar Clube Sabores Exclusivos
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
                <span className="step-indicator">Passo {step + 1} de {steps.length}</span>
            </nav>

            <main className="quiz-content animate-slide-up">
                <div className="quiz-card glass-morphism">
                    <div className="quiz-header">
                        {steps[step].icon}
                        <h2>{steps[step].title}</h2>
                    </div>

                    <div className="quiz-body">
                        {step === 0 && (
                            <div className="gender-options">
                                <button className={`option-btn ${gender === 'male' ? 'active' : ''}`} onClick={() => { setGender('male'); nextStep(); }}>
                                    Masculino
                                </button>
                                <button className={`option-btn ${gender === 'female' ? 'active' : ''}`} onClick={() => { setGender('female'); nextStep(); }}>
                                    Feminino
                                </button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="input-step">
                                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Ex: 25" autoFocus onKeyDown={(e) => e.key === 'Enter' && age && nextStep()} />
                                <button className="btn-quiz-next" disabled={!age} onClick={nextStep}>Continuar <ChevronDown size={20} style={{ transform: 'rotate(-90deg)' }} /></button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="input-step">
                                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Ex: 70 (kg)" autoFocus onKeyDown={(e) => e.key === 'Enter' && weight && nextStep()} />
                                <button className="btn-quiz-next" disabled={!weight} onClick={nextStep}>Continuar <ChevronDown size={20} style={{ transform: 'rotate(-90deg)' }} /></button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="input-step">
                                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Ex: 175 (cm)" autoFocus onKeyDown={(e) => e.key === 'Enter' && height && nextStep()} />
                                <button className="btn-quiz-next" disabled={!height} onClick={nextStep}>Continuar <ChevronDown size={20} style={{ transform: 'rotate(-90deg)' }} /></button>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="select-step">
                                <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                                    <option value="1.2">{t('features.calculator.activity_levels.sedentary')}</option>
                                    <option value="1.375">{t('features.calculator.activity_levels.light')}</option>
                                    <option value="1.55">{t('features.calculator.activity_levels.moderate')}</option>
                                    <option value="1.725">{t('features.calculator.activity_levels.active')}</option>
                                    <option value="1.9">{t('features.calculator.activity_levels.extra')}</option>
                                </select>
                                <button className="btn-quiz-next" onClick={nextStep}>Ver Resultado <Play size={20} /></button>
                            </div>
                        )}
                    </div>

                    {step > 0 && (
                        <button className="btn-quiz-back" onClick={prevStep}>Voltar</button>
                    )}
                </div>
            </main>
        </div>
    );
}
