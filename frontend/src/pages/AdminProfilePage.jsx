import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoMark } from '../components/Icons';
import { meuPerfil, todosPedidos } from '../services/api';
import '../styles/globals.css';
import '../styles/profile.css';

export default function AdminProfilePage() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem('usuario') || '{}');

  /* Mostra os dados em cache imediatamente (evita tela vazia),
     mas eles são substituídos pelos dados reais vindos da API logo abaixo. */
  const [admin, setAdmin] = useState({
    name:  stored.nome || stored.name || 'Administrador(a)',
    email: stored.email || '—',
    phone: stored.contato || '—',
  });
  const [stats, setStats] = useState({ ordersManaged: '—', revenue: '—' });

  useEffect(() => {
    // Busca o perfil direto do banco — sempre reflete o papel/dados atuais,
    // mesmo que tenham sido alterados manualmente no Supabase.
    meuPerfil()
      .then(perfil => {
        if (perfil.papel !== 'admin') {
          // Conta não é (ou não é mais) admin: não deixa renderizar essa tela.
          navigate('/perfil', { replace: true });
          return;
        }
        setAdmin({
          name:  perfil.nome,
          email: perfil.email,
          phone: perfil.contato || '—',
        });
        // Mantém o localStorage sincronizado com o banco
        localStorage.setItem('usuario', JSON.stringify({ ...stored, ...perfil }));
      })
      .catch(() => {
        // Sem conexão com a API: mantém os dados do cache (localStorage) já exibidos.
      });

    // Estatísticas reais, calculadas a partir dos pedidos existentes
    todosPedidos()
      .then(pedidos => {
        const entregues = pedidos.filter(p => p.status === 'ENTREGUE');
        const faturamento = entregues.reduce((soma, p) => soma + (Number(p.total) || 0), 0);
        setStats({
          ordersManaged: pedidos.length,
          revenue: faturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        });
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initials = (admin.name || 'A')
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('');

  return (
    <div className="profile-page">
      {/* Navbar */}
      <nav className="profile-navbar">
        <div className="profile-navbar-brand" onClick={() => navigate('/home')}>
          <LogoMark size={32} />
          <span>La Dolce Vita</span>
        </div>
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
      </nav>

      <div className="profile-content">

        {/* Card de perfil */}
        <div className="profile-card" style={{ marginBottom: 20 }}>
          {/* Banner */}
          <div className="profile-banner" style={{
            background: 'linear-gradient(135deg, #2A1A0E 0%, #4A3728 100%)',
          }}>
            <div className="profile-avatar-wrap">
              <div className="profile-avatar" style={{ background: 'var(--yellow)' }}>
                {initials}
              </div>
            </div>
            <div className="profile-admin-badge">Administradora</div>
          </div>

          {/* Corpo */}
          <div className="profile-card-body">
            <h2 className="profile-name">{admin.name}</h2>
            <p className="profile-role" style={{ color: 'var(--brown-light)' }}>
              Admin · La Dolce Vita
            </p>

            <div className="profile-info-list">
              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div className="profile-info-text">
                  <strong>E-mail</strong>
                  {admin.email}
                </div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1.13h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="profile-info-text">
                  <strong>Telefone</strong>
                  {admin.phone}
                </div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="profile-info-text">
                  <strong>Admin desde</strong>
                  —
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-value">{stats.ordersManaged}</span>
                <span className="profile-stat-label">Pedidos gerenciados</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">{stats.revenue}</span>
                <span className="profile-stat-label">Faturamento</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="profile-actions">
          <button
            className="profile-action-btn primary"
            onClick={() => navigate('/admin')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Gerenciar Pedidos
          </button>

          <button
            className="profile-action-btn secondary"
            onClick={() => navigate('/vitrine')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Gerenciar Vitrine
          </button>

          <button
            className="profile-action-btn secondary"
            onClick={() => navigate('/perfil/editar')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Editar Perfil
          </button>

          <button
            className="profile-action-btn danger"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('usuario');
              navigate('/');
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sair da Conta
          </button>
        </div>

      </div>
    </div>
  );
}
