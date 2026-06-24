import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoMark } from '../components/Icons';
import '../styles/globals.css';

export default function PasswordUpdatedPage() {
  const navigate = useNavigate();

  return (
    <div className="centered-bg">
      <div className="auth-card animate-in" style={{ maxWidth: 420 }}>
        {/* Ícone de sucesso */}
        <div style={{
          width: 72, height: 72,
          background: 'var(--success-pale)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
          animation: 'fadeIn 0.5s ease both',
        }}>
          <div style={{
            width: 52, height: 52,
            background: 'var(--success)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white',
            fontSize: 24,
            fontWeight: 700,
          }}>
            ✓
          </div>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.9rem',
          fontWeight: 900,
          color: 'var(--brown-dark)',
          marginBottom: 14,
        }}>
          Senha Alterada!
        </h2>

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--gray-text)',
          lineHeight: 1.65,
          margin: '0 auto 32px',
          maxWidth: 280,
        }}>
          Sua senha foi redefinida com sucesso. Agora você já pode acessar sua conta novamente.
        </p>

        <button
          className="btn-primary"
          style={{ marginBottom: 32 }}
          onClick={() => navigate('/login')}
        >
          Ir para o Login
        </button>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <LogoMark size={24} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--brown-dark)',
            }}>
              La Dolce Vita
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
