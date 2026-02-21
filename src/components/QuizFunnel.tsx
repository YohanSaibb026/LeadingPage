import React, { useState } from 'react';
import {
    ChefHat,
    ArrowRight,
    Zap,
    CheckCircle2,
    User,
    Calendar,
    Scale,
    Ruler,
    Activity,
    ChevronRight,
    Lock,
    Frown,
    Clock,
    HelpCircle,
    TrendingDown,
    AlertCircle
} from 'lucide-react';
import './QuizFunnel.css';

const QuizFunnel = () => {
    const [step, setStep] = useState(1);
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState('1.2');
    const [experience, setExperience] = useState<string | null>(null);
    const [failureReason, setFailureReason] = useState<string | null>(null);
    const [results, setResults] = useState<{ bmr: number; tdee: number } | null>(null);

    const calculateBMR = () => {
        if (!age || !weight || !height) return;
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseInt(age);

        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        if (gender === 'male') bmr += 5;
        else bmr -= 161;

        const tdee = bmr * parseFloat(activity);
        setResults({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
        setStep(7); // Results are now at step 7
    };

    const nextStep = () => {
        if (step === 1 && age && weight && height) setStep(2);
        else if (step === 2) setStep(3);
        else if (step === 3 && experience) {
            if (experience === 'first_time') setStep(5); // Skip step 4
            else setStep(4);
        }
        else if (step === 4 && failureReason) setStep(5);
        else if (step === 5) setStep(6);
    };

    const handleExperienceSelection = (choice: string) => {
        setExperience(choice);
        if (choice === 'first_time') setStep(5);
        else setStep(4);
    };

    const handleFailureSelection = (choice: string) => {
        setFailureReason(choice);
        setStep(5);
    };

    const progress = (step / 7) * 100;

    return (
        <div className="quiz-funnel-container">
            <header className="quiz-header">
                <div className="quiz-progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="quiz-logo">
                    <ChefHat size={24} />
                    <span>Sabores Exclusivos</span>
                </div>
            </header>

            <main className="quiz-main">
                <div className="quiz-card-container animate-fade-in">

                    {step === 1 && (
                        <div className="bmr-form-card glass-morphism">
                            <div className="card-header">
                                <h2>Descubre tu meta para crecer</h2>
                                <p>Calcula tu Tasa Metabólica Basal y mira cuánto necesitas consumir para ganar músculos</p>
                            </div>

                            <div className="form-group">
                                <label>Género</label>
                                <div className="gender-selector">
                                    <button
                                        className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
                                        onClick={() => setGender('male')}
                                    >
                                        <User size={18} />
                                        Masculino
                                    </button>
                                    <button
                                        className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
                                        onClick={() => setGender('female')}
                                    >
                                        <User size={18} className="female-icon" />
                                        Femenino
                                    </button>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Edad</label>
                                    <div className="input-with-icon">
                                        <Calendar size={18} className="field-icon" />
                                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Peso (kg)</label>
                                    <div className="input-with-icon">
                                        <Scale size={18} className="field-icon" />
                                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Altura (cm)</label>
                                    <div className="input-with-icon">
                                        <Ruler size={18} className="field-icon" />
                                        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" />
                                    </div>
                                </div>
                            </div>

                            <button className="btn-main-action" onClick={nextStep} disabled={!age || !weight || !height}>
                                CALCULAR META <Zap size={20} fill="currentColor" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="activity-selection animate-fade-in">
                            <span className="step-tag">PASO 2 DE 7</span>
                            <h2 className="quiz-question">¿Cuál é o seu nível de atividade física?</h2>
                            <div className="quiz-options">
                                {[
                                    { val: "1.2", label: "Sedentario (poco o nada de exercício)", desc: "Trabalho em escritório, pouca movimentação" },
                                    { val: "1.375", label: "Leve (1-3 días a la semana)", desc: "Caminhadas leves, yoga ou esportes ocasionais" },
                                    { val: "1.55", label: "Moderado (3-5 días a la semana)", desc: "Musculação ou cardio regular" },
                                    { val: "1.725", label: "Activo (6-7 días a la semana)", desc: "Treinos intensos diários" },
                                    { val: "1.9", label: "Muy activo (atleta/trabajo físico)", desc: "Treinos pesados 2x ao dia ou trabalho pesado" }
                                ].map((opt) => (
                                    <button
                                        key={opt.val}
                                        className={`quiz-option-btn ${activity === opt.val ? 'selected' : ''}`}
                                        onClick={() => { setActivity(opt.val); setTimeout(nextStep, 300); }}
                                    >
                                        <div className="option-content">
                                            <div className="option-main">
                                                <span className="option-text">{opt.label}</span>
                                                <span className="option-desc">{opt.desc}</span>
                                            </div>
                                        </div>
                                        <div className="option-check">
                                            <CheckCircle2 size={20} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="experience-step animate-fade-in">
                            <span className="step-tag">PASO 3 DE 7</span>
                            <h2 className="quiz-question">¿Você já tentou ganhar peso e desenvolver músculos antes?</h2>
                            <div className="quiz-options">
                                <button className="quiz-option-btn" onClick={() => handleExperienceSelection('first_time')}>
                                    <div className="option-content">
                                        <span className="option-text">Não, é minha primeira vez</span>
                                    </div>
                                    <CheckCircle2 size={20} className="option-check" />
                                </button>
                                <button className="quiz-option-btn" onClick={() => handleExperienceSelection('tried_before')}>
                                    <div className="option-content">
                                        <span className="option-text">Já tentei, mas não consegui</span>
                                    </div>
                                    <CheckCircle2 size={20} className="option-check" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="failure-step animate-fade-in">
                            <span className="step-tag">PASO 4 DE 7</span>
                            <h2 className="quiz-question">¿Qué crees que falló anteriormente?</h2>
                            <div className="quiz-options">
                                <button className="quiz-option-btn" onClick={() => handleFailureSelection('malestar')}>
                                    <div className="option-content" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <Frown color="#22c55e" size={24} />
                                        <span className="option-text">A alimentação me causou mal estar</span>
                                    </div>
                                    <CheckCircle2 size={20} className="option-check" />
                                </button>
                                <button className="quiz-option-btn" onClick={() => handleFailureSelection('abandono')}>
                                    <div className="option-content" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <Clock color="#f97316" size={24} />
                                        <span className="option-text">Abandonei o processo no meio do caminho</span>
                                    </div>
                                    <CheckCircle2 size={20} className="option-check" />
                                </button>
                                <button className="quiz-option-btn" onClick={() => handleFailureSelection('desonrientacion')}>
                                    <div className="option-content" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <HelpCircle color="#ef4444" size={24} />
                                        <span className="option-text">Não sabia o que nem quanto comer</span>
                                    </div>
                                    <CheckCircle2 size={20} className="option-check" />
                                </button>
                                <button className="quiz-option-btn" onClick={() => handleFailureSelection('motivacion')}>
                                    <div className="option-content" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <TrendingDown color="#eab308" size={24} />
                                        <span className="option-text">Não via resultados e perdi a motivação</span>
                                    </div>
                                    <CheckCircle2 size={20} className="option-check" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="advice-step animate-fade-in">
                            <div className="advice-card glass-morphism">
                                <div className="advice-badge">
                                    {experience === 'first_time' ? 'EXCELENTE DECISÃO' : 'TEMOS A SOLUÇÃO'}
                                </div>
                                <h2 className="quiz-question" style={{ marginTop: '1rem' }}>
                                    {experience === 'first_time'
                                        ? 'Sua jornada começa com a estratégia correta!'
                                        : 'Vamos superar esses obstáculos juntos!'}
                                </h2>

                                <div className="advice-content">
                                    <p>
                                        A melhor estratégia é ter um superávit calórico inteligente, usando carboidratos como base e gorduras como complemento. Priorize as primeiras comidas do dia, especialmente desayuno e almoço.
                                    </p>
                                </div>

                                <button className="btn-main-action" onClick={nextStep}>
                                    CONTINUAR <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="loading-step-bridge animate-fade-in">
                            <h2 className="quiz-question">Estamos preparando seu plano personalizado...</h2>
                            <p style={{ textAlign: 'center', opacity: 0.7 }}>Aguarde um momento enquanto calculamos os melhores resultados para você.</p>
                            <div className="pulsing-loader" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                <Zap size={48} className="animate-pulse" color="#f97316" />
                            </div>
                            <button className="btn-main-action" style={{ marginTop: '3rem' }} onClick={calculateBMR}>
                                VER RESULTADOS <ChevronRight size={20} />
                            </button>
                        </div>
                    )}

                    {step === 7 && results && (
                        <div className="results-bridge animate-fade-in">
                            <div className="outcome-card glass-morphism">
                                <div className="outcome-icon animate-bounce">
                                    <CheckCircle2 size={48} color="#22c55e" />
                                </div>
                                <h2>¡Análisis completado con éxito!</h2>
                                <p>Hemos calculado tu perfil nutricional basado en tus datos.</p>

                                <div className="outcome-stats">
                                    <div className="stat-box">
                                        <span className="stat-label">Tu Metabolismo (BMR)</span>
                                        <span className="stat-value">{results.bmr} <small>kcal</small></span>
                                    </div>
                                    <div className="stat-box highlight">
                                        <span className="stat-label">Gasto Diario (TDEE)</span>
                                        <span className="stat-value">{results.tdee} <small>kcal</small></span>
                                    </div>
                                </div>

                                <div className="outcome-message">
                                    <p>Para ganar masa muscular, necesitas consumir aproximadamente <strong>{results.tdee + 400} kcal</strong> al día.</p>
                                </div>

                                <button className="btn-final-bridge" onClick={() => window.location.href = "/"}>
                                    VER MI PLAN PERSONALIZADO
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="quiz-footer">
                <div className="footer-security">
                    <Lock size={14} />
                    <span>Tus datos están seguros y son 100% privados</span>
                </div>
            </footer>
        </div>
    );
};

export default QuizFunnel;
