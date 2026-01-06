import React from 'react';
import { ChefHat, Smartphone, Zap, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import heroDish from './assets/hero-dish.png';
import './App.css';

function App() {
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
                        <a href="#features">Recursos</a>
                        <a href="#pricing">Preços</a>
                        <button className="btn-primary-small">Baixar App</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <div className="badge">Novidade: NutriTrack 2.0</div>
                    <h1>Aprenda a comer com <span className="text-gradient">Inteligência</span></h1>
                    <p>A psicologia é a chave para uma mudança duradoura na sua alimentação.</p>
                    <div className="hero-btns">
                        <button className="btn-primary">Continuar <ArrowRight size={18} /></button>
                        <button className="btn-secondary">Ver Demonstração</button>
                    </div>
                    <div className="social-proof">
                        <div className="stars">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <span>Usado por mais de 500+ chefs em casa</span>
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
                <h2 className="section-title">Por que o NutriTrack AI?</h2>
                <div className="feature-grid">
                    <div className="feature-card glass-morphism">
                        <div className="icon-wrapper"><Zap /></div>
                        <h3>Geração Instantânea</h3>
                        <p>Crie receitas personalizadas em segundos com nossa IA avançada.</p>
                    </div>
                    <div className="feature-card glass-morphism">
                        <div className="icon-wrapper"><Smartphone /></div>
                        <h3>Sempre com Você</h3>
                        <p>Acesse suas receitas favoritas de qualquer lugar, online ou offline.</p>
                    </div>
                    <div className="feature-card glass-morphism">
                        <div className="icon-wrapper"><ShieldCheck /></div>
                        <h3>Dados Precisos</h3>
                        <p>Cálculo de valores nutricionais exatos para cada porção.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card premium-gradient">
                    <h2>Pronto para elevar sua culinária?</h2>
                    <p>Junte-se a centenas de usuários que já estão otimizando sua rotina alimentar.</p>
                    <button className="btn-white">Adquirir Acesso Vitalício</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <ChefHat />
                        <span>NutriTrack AI</span>
                    </div>
                    <p>&copy; 2026 Sabores Exclusivos. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
