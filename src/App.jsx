import React, { Suspense, useEffect } from 'react';
const Controls = React.lazy(() => import('mfe_controls/Controls'));
const Cards = React.lazy(() => import('mfe_cards/Cards'));


export default function App(){
    useEffect(() => {
        const handler = (e) => {
            document.documentElement.setAttribute('main-theme', e.detail.theme);
        };
        window.addEventListener('mfe:theme:changed', handler);
        return () => window.removeEventListener('mfe:theme:changed', handler);
    }, []);


    return (
        <div className="app-container">
            <h1 className="main-title">
                Тестовое задание – Витрина карточек
            </h1>
            <Suspense fallback={<div>Loading controls...</div>}>
                <Controls />
            </Suspense>
            
            <Suspense fallback={<div>Loading cards...</div>}>
                <Cards />
            </Suspense>
        </div>
    );
}