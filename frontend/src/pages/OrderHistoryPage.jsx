import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LogoMark } from '../components/Icons';
import OrderHistoryCard from '../components/OrderHistoryCard';
import '../styles/globals.css';
import '../styles/profile.css';

/* Mock order data */
const PEDIDOS_MOCK = [
  {
    id: 1, numero: '0042', data: '17/05/2026 · 10:34',
    cliente: 'Ana Souza',
    itens: '3× Cioccolato, 2× Amore',
    total: '60,00', status: 'Entregue',
  },
  {
    id: 2, numero: '0038', data: '14/05/2026 · 14:12',
    cliente: 'Ana Souza',
    itens: '4× Amalfi',
    total: '48,00', status: 'Entregue',
  },
  {
    id: 3, numero: '0031', data: '09/05/2026 · 09:55',
    cliente: 'Ana Souza',
    itens: '2× Abbracio, 1× Cioccolato',
    total: '34,00', status: 'Entregue',
  },
  {
    id: 4, numero: '0029', data: '06/05/2026 · 11:40',
    cliente: 'Ana Souza',
    itens: '5× Amore',
    total: '60,00', status: 'Entregue',
  },
  {
    id: 5, numero: '0022', data: '01/05/2026 · 16:20',
    cliente: 'Ana Souza',
    itens: '2× Cioccolato, 2× Amalfi',
    total: '48,00', status: 'Entregue',
  },
  /* Pedidos extra para visualização do admin */
  {
    id: 6, numero: '0041', data: '17/05/2026 · 09:58',
    cliente: 'Carlos Lima',
    itens: '4× Amalfi',
    total: '48,00', status: 'Pronto para entrega',
  },
  {
    id: 7, numero: '0040', data: '17/05/2026 · 09:12',
    cliente: 'Fernanda Reis',
    itens: '6× Cioccolato, 1× Amore',
    total: '84,00', status: 'Em produção',
  },
  {
    id: 8, numero: '0039', data: '16/05/2026 · 18:45',
    cliente: 'João Mendes',
    itens: '2× Abbracio, 2× Cioccolato',
    total: '46,00', status: 'Entregue',
  },
];

const STATUS_FILTER = ['Todos', 'Em produção', 'Pronto para entrega', 'Entregue'];

export default function OrderHistoryPage() {
  const navigate      = useNavigate();
  const [params]      = useSearchParams();
  const isAdmin       = params.get('admin') === 'true';

  /* Usuário comum vê só os próprios pedidos */
  const basePedidos   = isAdmin ? PEDIDOS_MOCK : PEDIDOS_MOCK.filter(p => p.cliente === 'Ana Souza');

  const [busca,      setBusca]   = useState('');
  const [statusFilt, setStatus]  = useState('Todos');

  const filtered = basePedidos.filter(p => {
    const matchStatus = statusFilt === 'Todos' || p.status === statusFilt;
    const matchBusca  = busca.trim() === '' ||
      p.numero.includes(busca) ||
      p.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      p.itens.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  return (
    <div className="history-page">
      {/* Navbar */}
      <nav className="profile-navbar">
        <div className="profile-navbar-brand" onClick={() => navigate('/home')}>
          <LogoMark size={32} />
          <span>La Dolce Vita</span>
        </div>
        <button
          className="profile-back-btn"
          onClick={() => navigate(isAdmin ? '/perfil/admin' : '/perfil')}
        >
          ← Voltar ao Perfil
        </button>
      </nav>

      <div className="history-content">
        {/* Cabeçalho */}
        <div className="history-header">
          <h1 className="history-title">
            {isAdmin ? 'Histórico de Pedidos' : 'Meus Pedidos'}
          </h1>
          <p className="history-subtitle">
            {filtered.length} pedido{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filtros */}
        <div className="history-filters">
          <div className="history-search">
            <span className="history-search-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder={isAdmin ? 'Buscar por nº, cliente ou item…' : 'Buscar por nº ou item…'}
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>

          <select
            className="history-select"
            value={statusFilt}
            onChange={e => setStatus(e.target.value)}
          >
            {STATUS_FILTER.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Lista */}
        <div className="history-list">
          {filtered.length === 0 ? (
            <div className="history-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                stroke="var(--gray-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>Nenhum pedido encontrado.</p>
            </div>
          ) : (
            filtered.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <OrderHistoryCard pedido={p} isAdmin={isAdmin} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
