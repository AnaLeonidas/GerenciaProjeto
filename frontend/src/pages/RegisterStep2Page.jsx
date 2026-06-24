import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockIcon, EyeIcon } from '../components/Icons';
import '../styles/globals.css';
import { cadastro } from '../services/api';

const COOKIE_IMG2 = 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=900&q=80';

export default function RegisterStep2Page() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleFinalizar = async () => {
    if (!password || password !== confirm) { alert('As senhas não coincidem.'); return; }
    if (!agreed) { alert('Aceite os termos para continuar.'); return; }
    const step1 = JSON.parse(sessionStorage.getItem('cadastro_step1') || '{}');
    if (!step1.email) { alert('Dados incompletos. Volte ao passo 1.'); navigate('/cadastro'); return; }
    setLoading(true);
    try {
      await cadastro({ nome: step1.nome, email: step1.email, contato: step1.contato || null, senha: password });
      sessionStorage.removeItem('cadastro_step1');
      alert('Conta criada com sucesso! Faça o login para continuar.');
      navigate('/login');
    } catch (err) {
      alert('Erro ao criar conta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split photo-right" style={{ minHeight: '100vh' }}>
      {/* Painel esquerdo — formulário */}
      <div className="auth-form-panel" style={{ position: 'relative' }}>
        <button className="back-btn" onClick={() => navigate('/cadastro')}>← Voltar</button>

        <div className="animate-in" style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--brown-dark)',
            marginBottom: 6,
          }}>
            Crie sua senha
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--gray-text)', marginBottom: 28 }}>
            Quase lá! Só mais um passo para seus cookies favoritos.
          </p>

          <div className="progress-wrapper">
            <div className="progress-meta">
              <span>Passo 2</span>
              <span style={{ color: 'var(--gray-light)', fontWeight: 400 }}>de 2</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%' }} />
            </div>
          </div>

          <div className="form-group animate-in animate-in-delay-1">
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
          </div>

          <div className="form-group animate-in animate-in-delay-2">
            <label>Confirmar Senha</label>
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

          <div className="checkbox-wrapper animate-in animate-in-delay-3">
            <input type="checkbox" id="terms" checked={agreed}
              onChange={e => setAgreed(e.target.checked)} />
            <label htmlFor="terms">
              Eu concordo com os{' '}
              <span className="link-green">Termos e Condições</span>
              {' '}de uso.
            </label>
          </div>

          <button
            className="btn-primary animate-in animate-in-delay-4"
            onClick={handleFinalizar}
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Finalizar Cadastro'}
          </button>
        </div>
      </div>

      {/* Painel direito — foto */}
      <div className="auth-photo-panel">
        <img src={COOKIE_IMG2} alt="Cookies artesanais"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );
}
