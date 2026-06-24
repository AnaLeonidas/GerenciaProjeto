import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MailIcon, RefreshIcon } from '../components/Icons';
import '../styles/globals.css';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  return (
    <div className="centered-bg">
      <div className="auth-card animate-in" style={{ maxWidth: 460 }}>
        <div className="card-icon-circle yellow-light">
          <RefreshIcon />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.7rem',
          fontWeight: 800,
          color: 'var(--brown-dark)',
          marginBottom: 12,
        }}>
          Esqueceu sua senha?
        </h2>

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--gray-text)',
          lineHeight: 1.65,
          margin: '0 auto 28px',
          maxWidth: 320,
        }}>
          Não se preocupe! Insira seu e-mail abaixo e enviaremos as instruções para você criar uma nova senha.
        </p>

        <div className="form-group" style={{ textAlign: 'left' }}>
          <label>E-mail</label>
          <div className="input-wrapper">
            <span className="input-icon"><MailIcon /></span>
            <input
              type="email"
              className="form-input"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn-primary"
          style={{ marginBottom: 20 }}
          onClick={() => { if (email.trim()) navigate('/verificar-email'); }}
        >
          Enviar Link de Recuperação <span>→</span>
        </button>

        <button className="btn-ghost" onClick={() => navigate('/login')} style={{ margin: '0 auto' }}>
          ← Voltar para o login
        </button>
      </div>
    </div>
  );
}
