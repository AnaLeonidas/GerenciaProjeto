import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockIcon, EyeIcon } from '../components/Icons';
import '../styles/globals.css';

function PasswordReqs({ password }) {
  const checks = [
    { label: 'Mínimo de 8 caracteres',  met: password.length >= 8 },
    { label: 'Uma letra maiúscula',      met: /[A-Z]/.test(password) },
    { label: 'Um número',               met: /[0-9]/.test(password) },
    { label: 'Um caractere especial',    met: /[^a-zA-Z0-9]/.test(password) },
  ];
  return (
    <div className="requirements-box">
      {checks.map((c, i) => (
        <div key={i} className={`requirement-item${c.met ? ' met' : ''}`}>
          <span className="req-icon">{c.met ? '✓' : ''}</span>
          {c.label}
        </div>
      ))}
    </div>
  );
}

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);

  return (
    <div className="centered-bg">
      <div className="animate-in" style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--green)',
          marginBottom: 10,
        }}>
          Criar nova senha
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--gray-text)', lineHeight: 1.6 }}>
          Sua nova senha deve ser diferente das senhas usadas anteriormente.
        </p>
      </div>

      <div className="auth-card animate-in animate-in-delay-1" style={{ maxWidth: 440 }}>
        <div style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label>Nova senha</label>
            <div className="input-wrapper">
              <span className="input-icon"><LockIcon /></span>
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input has-right-icon"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button className="input-icon-right" onClick={() => setShowPass(v => !v)}>
                <EyeIcon open={showPass} />
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirmar nova senha</label>
            <div className="input-wrapper">
              <span className="input-icon"><LockIcon /></span>
              <input
                type={showConf ? 'text' : 'password'}
                className="form-input has-right-icon"
                placeholder="••••••••"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
              <button className="input-icon-right" onClick={() => setShowConf(v => !v)}>
                <EyeIcon open={showConf} />
              </button>
            </div>
          </div>

          {password.length > 0 && <PasswordReqs password={password} />}

          <button
            className="btn-primary"
            style={{ marginBottom: 18 }}
            onClick={() => { if (password && password === confirm) navigate('/senha-atualizada'); }}
          >
            Redefinir Senha
          </button>

          <div style={{ textAlign: 'center' }}>
            <button className="btn-ghost" onClick={() => navigate('/login')} style={{ margin: '0 auto' }}>
              ← Voltar para o login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
