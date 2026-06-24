import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyIcon, InboxIcon } from '../components/Icons';
import '../styles/globals.css';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  return (
    <div className="centered-bg">
      <div className="auth-card animate-in" style={{ maxWidth: 460 }}>
        <div style={{
          width: 64, height: 64,
          background: 'var(--green-pale)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'var(--green)',
        }}>
          <InboxIcon />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.7rem',
          fontWeight: 800,
          color: 'var(--brown-dark)',
          marginBottom: 12,
        }}>
          Verifique seu e-mail
        </h2>

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--gray-text)',
          lineHeight: 1.65,
          margin: '0 auto 28px',
          maxWidth: 340,
        }}>
          Insira o código de 6 dígitos que enviamos para o seu e-mail ou cole o link de recuperação abaixo.
        </p>

        <div className="form-group" style={{ textAlign: 'left' }}>
          <label>Código de Verificação ou Link</label>
          <div className="input-wrapper">
            <span className="input-icon"><KeyIcon /></span>
            <input
              type="text"
              className="form-input"
              placeholder="000000"
              value={code}
              onChange={e => setCode(e.target.value)}
              maxLength={6}
              style={{
                letterSpacing: code.length > 0 ? '0.3em' : 'normal',
                fontSize: '1rem',
              }}
            />
          </div>
        </div>

        <button
          className="btn-primary"
          style={{ marginBottom: 16 }}
          onClick={() => { if (code.trim()) navigate('/nova-senha'); }}
        >
          Verificar
        </button>

        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: '0.84rem', color: 'var(--gray-text)', marginBottom: 4 }}>
            Não recebeu o código?
          </p>
          <span className="link-green" style={{ fontSize: '0.84rem', cursor: 'pointer' }}>
            Reenviar
          </span>
        </div>

        <button className="btn-ghost" onClick={() => navigate('/login')} style={{ margin: '0 auto' }}>
          ← Voltar para o login
        </button>
      </div>
    </div>
  );
}
