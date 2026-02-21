import React, { useState } from 'react';
import { ChefHat, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import './QuizFunnel.css';

const QuizFunnel = () => {
    const [step, setStep] = useState(0);

    const questions = [
        {
            id: 1,
            question: "¿Cuál es tu principal objetivo actual?",
            options: [
                { text: "Ganar masa muscular", icon: <Zap size={20} /> },
                { text: "Aumentar peso saludablemente", icon: <ChefHat size={20} /> },
                { text: "Mejorar mi rendimiento físico", icon: <Zap size={20} /> }
            ]
        },
        {
            id: 2,
            question: "¿Cuánto tiempo llevas intentando ver resultados?",
            options: [
                { text: "Menos de 3 meses", icon: null },
                { text: "De 3 a 6 meses", icon: null },
                { text: "Más de 1 año", icon: null }
            ]
        }
    ];

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Placeholder for transformation/offer bridge
            alert("¡Quiz completado! Redirigiendo a tu plan personalizado...");
            window.location.href = "/";
        }
    };

    const progress = ((step + 1) / (questions.length + 1)) * 100;

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
                <div className="quiz-card animate-fade-in">
                    <span className="step-indicator">PASO {step + 1} DE {questions.length}</span>
                    <h2 className="quiz-question">{questions[step].question}</h2>

                    <div className="quiz-options">
                        {questions[step].options.map((option, idx) => (
                            <button key={idx} className="quiz-option-btn" onClick={handleNext}>
                                <div className="option-content">
                                    {option.icon && <span className="option-icon">{option.icon}</span>}
                                    <span className="option-text">{option.text}</span>
                                </div>
                                <div className="option-check">
                                    <CheckCircle2 size={18} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="quiz-footer">
                <p>Tu información está segura y es 100% privada</p>
            </footer>
        </div>
    );
};

export default QuizFunnel;
