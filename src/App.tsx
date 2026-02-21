import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LandingPage from './components/LandingPage';
import QuizFunnel from './components/QuizFunnel';
import './App.css';

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        if (i18n.language) {
            document.documentElement.lang = i18n.language.split('-')[0];
        }
    }, [i18n.language]);

    useEffect(() => {
        // Security logic remains in App for global protection
        /*
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

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
        */
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/quiz" element={<QuizFunnel />} />
            </Routes>
        </Router>
    );
}

export default App;
