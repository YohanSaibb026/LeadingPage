import React, { useState, useEffect } from 'react';
import {
    ChefHat,
    ArrowRight,
    Zap,
    Smartphone,
    Star,
    CheckCircle2,
    BarChart3,
    Flame,
    Utensils
} from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import './AppMockup.css';

// Asset placeholders - User will import these
import appShowroom from './assets/app-showroom.png';
import meal1 from './assets/meal-1.jpg';
// Placeholder for the new mockup image the user will import
// import heroMockup from './assets/hero-mockup.png'; 

const BMRCalculator = () => {
    const { t } = useTranslation();
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        if (!weight || !height || !age) return;
        // Simplified Mifflin-St Jeor for mockup demonstration
        const bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseInt(age) + 5;
        setResult(Math.round(bmr));
    };

    return (
        <div className="calculator-card glass-morphism reveal">
            <div className="calculator-header">
                <h2>{t('features.calculator.title', 'Calculador de TMB Especializado')}</h2>
                <p>{t('features.calculator.subtitle', 'Descubra exatamente quanto seu corpo precisa para ganhar massa.')}</p>
            </div>
            <div className="calculator-grid">
                <div className="input-group">
                    <label>Peso (kg)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Ex: 70" />
                </div>
                <div className="input-group">
                    <label>Altura (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Ex: 175" />
                </div>
                <div className="input-group">
                    <label>Idade (anos)</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Ex: 25" />
                </div>
                <div className="input-group">
                    <label>Nível de Atividade</label>
                    <select>
                        <option>Sedentário</option>
                        <option>Moderado</option>
                        <option>Ativo</option>
                    </select>
                </div>
                <div className="results-area">
                    <button className="btn-premium" onClick={calculate} style={{ marginBottom: result ? '2rem' : '0' }}>
                        Calcular Agora <BarChart3 size={20} />
                    </button>
                    {result && (
                        <div className="animate-pop">
                            <span className="bmr-value">{result}</span>
                            <span style={{ marginLeft: '0.5rem', color: 'var(--text-muted)' }}>kcal/dia</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

function AppMockup() {
    const { t } = useTranslation();

    return (
        <div className="landing-container">
            <nav className="navbar glass-morphism">
                <div className="nav-content">
                    <div className="logo">
                        <ChefHat />
                        <span>SABORES EXCLUSIVOS</span>
                    </div>
                    <div className="nav-links">
                        <a href="#features">Recursos</a>
                        <a href="#results">Resultados</a>
                        <a href="#pricing">Preços</a>
                    </div>
                    <button className="btn-premium" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                        Começar
                    </button>
                </div>
            </nav>

            <header className="hero">
                <div className="hero-grid">
                    <div className="hero-text reveal">
                        <div className="badge-premium" style={{
                            display: 'inline-flex',
                            padding: '0.5rem 1rem',
                            background: 'hsla(14, 96%, 60%, 0.1)',
                            borderRadius: '99px',
                            color: 'var(--primary)',
                            fontWeight: '700',
                            fontSize: '0.8rem',
                            marginBottom: '1.5rem',
                            border: '1px solid hsla(14, 96%, 60%, 0.2)'
                        }}>
                            NOVA VERSÃO 2.0 DISPONÍVEL
                        </div>
                        <h1>
                            Ganhe Massa <br />
                            <span className="text-gradient">Comendo o Que Ama</span>
                        </h1>
                        <p className="hero-subtitle">
                            O método exclusivo para pessoas magras que desejam transformar o corpo com batidos e refeições de alta densidade calórica.
                        </p>
                        <div className="hero-cta">
                            <button className="btn-premium">
                                Quero Transformar Meu Corpo <ArrowRight size={20} />
                            </button>
                            <div className="social-proof-compact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div className="stars-compact" style={{ color: '#F59E0B', display: 'flex' }}>
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                                </div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+2.500 Alunos Felizes</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image-container reveal">
                        {/* 
                            USER: Replace the src below with the new mockup image you import.
                            Example: src={heroMockup} 
                        */}
                        <img
                            src={appShowroom}
                            alt="Novo Mockup"
                            className="mockup-main"
                        />
                        <div className="floating-card glass-morphism" style={{
                            position: 'absolute',
                            bottom: '10%',
                            right: '-5%',
                            padding: '1rem',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '10px' }}>
                                <Flame size={20} color="white" />
                            </div>
                            <div>
                                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>+12kg em 3 meses</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resultado de Aluno</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="bmr-section">
                <BMRCalculator />
            </section>

            <section id="features" style={{ padding: '100px 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Por que o <span className="text-gradient">Sabores</span> é diferente?</h2>
                <div className="hero-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                    {[
                        { icon: <Smartphone />, title: 'App Nativo', desc: 'Acesso instantâneo de qualquer lugar.' },
                        { icon: <Utensils />, title: 'Receitas Rápidas', desc: 'Prepare batidos calóricos em menos de 5 min.' },
                        { icon: <CheckCircle2 />, title: 'Lista de Compras', desc: 'Automatize sua ida ao mercado.' }
                    ].map((f, i) => (
                        <div key={i} className="feature-card-premium glass-morphism reveal" style={{ padding: '2.5rem', borderRadius: '32px' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{f.icon}</div>
                            <h3 style={{ marginBottom: '1rem' }}>{f.title}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border-glass)', textAlign: 'center' }}>
                <div style={{ opacity: 0.5, fontSize: '0.8rem' }}>
                    © 2026 Sabores Exclusivos. Todos os direitos reservados.
                </div>
            </footer>
        </div >
    );
}

export default AppMockup;
