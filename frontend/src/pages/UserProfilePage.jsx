import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoMark } from '../components/Icons';
import '../styles/globals.css';
import '../styles/profile.css';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem('usuario') || '{}');
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const USER = {
    name: stored.nome || stored.name || 'Visitante',
    email: stored.email || '—',
    phone: stored.contato || '—',
    since: '—',
    orders: '—',
    total: '—',
  };
  const initials = USER.name.split(' ').slice(0, 2).map(n => n[0]).join('');

  return (
    <div className="profile-page">
      <nav className="profile-navbar">
        <div className="profile-navbar-brand" onClick={() => navigate('/home')}>
          <LogoMark size={32} />
          <span>La Dolce Vita</span>
        </div>
        <button className="profile-back-btn" onClick={() => navigate('/home')}>
          ← Voltar
        </button>
      </nav>

      <div className="profile-content">
        <div className="profile-card" style={{ marginBottom: 20 }}>
          <div className="profile-banner">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">{initials}</div>
            </div>
          </div>
          <div className="profile-card-body">
            <h2 className="profile-name">{USER.name}</h2>
            <p className="profile-role">Cliente</p>

            <div className="profile-info-list">
              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="profile-info-text"><strong>E-mail</strong>{USER.email}</div>
              </div>
              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1.13h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="profile-info-text"><strong>Telefone</strong>{USER.phone}</div>
              </div>
              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="profile-info-text"><strong>Membro desde</strong>{USER.since}</div>
              </div>
            </div>

            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-value">{USER.orders}</span>
                <span className="profile-stat-label">Pedidos</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">{USER.total}</span>
                <span className="profile-stat-label">Em compras</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          {/* Histórico — só para usuários logados */}
          {isLoggedIn && (
            <button className="profile-action-btn primary" onClick={() => navigate('/historico/usuario')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Ver Histórico de Pedidos
            </button>
          )}

          <button className="profile-action-btn secondary" onClick={() => navigate('/vitrine')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Ver Nossos Cookies
          </button>

          {/* Editar Perfil — só para usuários logados */}
          {isLoggedIn && (
            <button className="profile-action-btn secondary" onClick={() => navigate('/perfil/editar')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Editar Perfil
            </button>
          )}

          {isLoggedIn ? (
            <button className="profile-action-btn danger" onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('usuario');
              navigate('/');
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sair da Conta
            </button>
          ) : (
            <button className="profile-action-btn secondary" onClick={() => navigate('/')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Voltar ao Início
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
