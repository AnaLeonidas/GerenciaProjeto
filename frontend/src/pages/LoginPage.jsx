import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoMark, MailIcon, LockIcon, EyeIcon } from '../components/Icons';
import '../styles/globals.css';
import { login } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const dados = await login(email, password);

      localStorage.setItem('token', dados.access_token);
      localStorage.setItem('usuario', JSON.stringify(dados.user));

      navigate('/home');
    } catch (err) {
      alert('Email ou senha inválidos');
    }
  };

  return (
    <div className="centered-bg">
      <div className="auth-card animate-in" style={{ maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <LogoMark size={44} />
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 800,
          color: 'var(--brown-dark)',
          marginBottom: 4,
        }}>
          La Dolce Vita
        </h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--gray-text)' }}>
          Acesse sua conta para continuar
        </p>

        {/* Linha verde accent */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, var(--green) 0%, var(--green-light) 100%)',
          borderRadius: 3,
          margin: '18px 0 24px',
          width: '100%',
        }} />

        <div style={{ textAlign: 'left' }}>
          <div className="form-group animate-in animate-in-delay-1">
            <label>E-mail</label>
            <div className="input-wrapper">
              <span className="input-icon"><MailIcon /></span>
              <input type="email" className="form-input" placeholder="seu@email.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="form-group animate-in animate-in-delay-2">
            <label>Senha</label>
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
            <div style={{ textAlign: 'right', marginTop: 6 }}>
              <span className="link-green" style={{ fontSize: '0.82rem' }}
                onClick={() => navigate('/recuperar-senha')}>
                Esqueci minha senha
              </span>
            </div>
          </div>

          <button className="btn-primary animate-in animate-in-delay-3"
            style={{ marginBottom: 16 }}
            onClick={handleLogin}>
            Entrar
          </button>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--gray-text)', marginTop: 18 }}>
          Não tem uma conta?{' '}
          <span className="link-green" onClick={() => navigate('/cadastro')}>Cadastre-se</span>
        </p>
      </div>
    </div>
  );
}
