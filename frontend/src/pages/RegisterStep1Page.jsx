import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, MailIcon, PhoneIcon } from '../components/Icons';
import '../styles/globals.css';

const BAKING_IMG = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=900&q=80';

export default function RegisterStep1Page() {
  const navigate = useNavigate();
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="auth-split photo-left" style={{ minHeight: '100vh' }}>
      {/* Painel esquerdo — foto */}
      <div className="auth-photo-panel">
        <img src={BAKING_IMG} alt="Fazendo cookies artesanais"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="auth-photo-overlay">
          <h3>Taste the warmth of home in every bite.</h3>
          <p>Join our community of artisanal cookie lovers.</p>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="auth-form-panel" style={{ position: 'relative' }}>
        <button className="back-btn" onClick={() => navigate('/')}>← Voltar</button>

        <div className="animate-in" style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--green)',
            marginBottom: 6,
          }}>
            Crie sua conta!
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--gray-text)', marginBottom: 24 }}>
            Adicione os dados necessários.
          </p>

          <div className="progress-wrapper">
            <div className="progress-meta">
              <span>Passo 1</span>
              <span style={{ color: 'var(--gray-light)', fontWeight: 400 }}>de 2</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '50%' }} />
            </div>
          </div>

          <div className="form-group animate-in animate-in-delay-1">
            <label>Nome Completo</label>
            <div className="input-wrapper">
              <span className="input-icon"><UserIcon /></span>
              <input type="text" className="form-input" placeholder="Jane Doe"
                value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>

          <div className="form-group animate-in animate-in-delay-2">
            <label>E-mail</label>
            <div className="input-wrapper">
              <span className="input-icon"><MailIcon /></span>
              <input type="email" className="form-input" placeholder="jane@example.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="form-group animate-in animate-in-delay-3">
            <label>Número de Telefone</label>
            <div className="input-wrapper">
              <span className="input-icon"><PhoneIcon /></span>
              <input type="tel" className="form-input" placeholder="+55 (11) 90000-0000"
                value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>

          <button
            className="btn-primary animate-in animate-in-delay-4"
            style={{ marginBottom: 20 }}
            onClick={() => {
              if (name && email) {
                sessionStorage.setItem('cadastro_step1', JSON.stringify({ nome: name, email, contato: phone }));
                navigate('/cadastro/senha');
              }
            }}
          >
            Próximo Passo <span>→</span>
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.84rem', color: 'var(--gray-text)' }}>
            Já tem uma conta?{' '}
            <span className="link-green" onClick={() => navigate('/login')}>Faça o login!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
