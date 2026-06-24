import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoMark } from '../components/Icons';
import '../styles/globals.css';

const COOKIE_IMG = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900&q=80';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="auth-split photo-right" style={{ minHeight: '100vh' }}>
      {/* Painel esquerdo — formulário */}
      <div className="auth-form-panel" style={{ justifyContent: 'center' }}>
        <div className="animate-in" style={{ width: '100%', maxWidth: 340, textAlign: 'center' }}>

          {/* Logo */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <LogoMark size={52} />
            </div>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 900,
            color: 'var(--brown-dark)',
            lineHeight: 1.15,
            marginBottom: 10,
          }}>
            Bem-vindo à<br />La Dolce Vita
          </h1>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--gray-text)',
            marginBottom: 40,
            lineHeight: 1.55,
          }}>
            Artesanal, premium, feito com amor.
          </p>

          <button
            className="btn-primary animate-in animate-in-delay-1"
            onClick={() => navigate('/login')}
            style={{ marginBottom: 14 }}
          >
            Entrar na minha conta
            <span>→</span>
          </button>

          <div className="divider-or animate-in animate-in-delay-2">ou</div>

          <button
            className="btn-outline animate-in animate-in-delay-3"
            onClick={() => navigate('/cadastro')}
            style={{ marginBottom: 20 }}
          >
            Criar nova conta
          </button>

          <button
            className="animate-in animate-in-delay-4"
            onClick={() => navigate('/home')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--green)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Continuar como visitante
          </button>
        </div>
      </div>

      {/* Painel direito — foto */}
      <div className="auth-photo-panel">
        <img
          src={COOKIE_IMG}
          alt="Cookies artesanais La Dolce Vita"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
