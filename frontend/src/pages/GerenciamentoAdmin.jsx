import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark, ProfileIcon } from '../components/Icons';
import CardPedidoAdmin from '../components/CardPedidoAdmin';
import '../styles/globals.css';
import '../styles/admin.css';
import { todosPedidos, atualizarStatusPedido } from '../services/api';

/* Mapeamento entre status do backend e do CardPedidoAdmin */
const BACKEND_TO_CARD = {
  'PEDIDO RECEBIDO':     'pendente',
  'EM PRODUCAO':         'preparo',
  'PRONTO PARA ENTREGA': 'enviado',
  'EM TRANSPORTE':       'enviado',
  'ENTREGUE':            'entregue',
  'CANCELADO':           'cancelado',
};
const CARD_TO_BACKEND = {
  'pendente':  'PEDIDO RECEBIDO',
  'preparo':   'EM PRODUCAO',
  'enviado':   'PRONTO PARA ENTREGA',
  'entregue':  'ENTREGUE',
  'cancelado': 'CANCELADO',
};

const FILTROS = [
  { key: 'todos',    label: 'Todos' },
  { key: 'pendente', label: 'Pendentes' },
  { key: 'preparo',  label: 'Em preparo' },
  { key: 'enviado',  label: 'Enviados' },
  { key: 'entregue', label: 'Entregues' },
  { key: 'cancelado',label: 'Cancelados' },
];

function apiPedidoToCard(p) {
  return {
    id: p.id,
    numero: p.id.slice(0, 8).toUpperCase(),
    data: new Date(p.data_hora).toLocaleString('pt-BR'),
    status: BACKEND_TO_CARD[p.status] || 'pendente',
    cliente: {
      nome: p.usuario?.nome || '—',
      telefone: p.usuario?.contato || '—',
    },
    itens: (p.item_pedido || []).map(i => ({
      nome: i.produto?.nome || 'Produto',
      quantidade: i.quantidade,
    })),
    total: Number(p.total) || 0,
  };
}

export default function GerenciamentoAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro]   = useState('todos');
  const [busca, setBusca]     = useState('');

  useEffect(() => {
    todosPedidos()
      .then(data => setPedidos(data.map(apiPedidoToCard)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, novoStatusCard) => {
    const novoStatusBackend = CARD_TO_BACKEND[novoStatusCard];
    if (!novoStatusBackend) return;
    try {
      await atualizarStatusPedido(id, novoStatusBackend);
      setPedidos(prev => prev.map(p => p.id === id ? { ...p, status: novoStatusCard } : p));
    } catch (err) {
      alert('Erro ao atualizar status: ' + err.message);
    }
  };

  const pedidosFiltrados = pedidos.filter(p => {
    const matchFiltro = filtro === 'todos' || p.status === filtro;
    const matchBusca  = busca.trim() === '' ||
      p.numero.includes(busca.toUpperCase()) ||
      p.cliente.nome.toLowerCase().includes(busca.toLowerCase());
    return matchFiltro && matchBusca;
  });

  return (
    <div className="admin-page">

      <nav className="admin-navbar">
        <div className="admin-brand">
          <LogoMark size={34} />
          <span className="admin-brand-name">La Dolce Vita</span>
          <span className="admin-nav-tag">Admin</span>
        </div>
        <div className="admin-navbar-right">
          <Link to="/home" className="admin-profile-btn" title="Ver site">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </Link>
          <Link to="/perfil/admin" className="admin-profile-btn" title="Meu perfil">
            <ProfileIcon size={17} />
          </Link>
        </div>
      </nav>

      <main className="admin-main">

        <div className="admin-header">
          <h1 className="admin-title">Gerenciamento de Pedidos</h1>
          <p className="admin-subtitle">
            {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}
            &nbsp;·&nbsp; {pedidos.filter(p => p.status === 'pendente').length} pendente{pedidos.filter(p => p.status === 'pendente').length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="admin-filters">
          {FILTROS.map(f => (
            <button
              key={f.key}
              className={`filter-btn${filtro === f.key ? ' active' : ''}`}
              onClick={() => setFiltro(f.key)}
            >
              {f.label}
              {f.key !== 'todos' && (
                <span style={{ marginLeft: 5, opacity: 0.75 }}>
                  ({pedidos.filter(p => p.status === f.key).length})
                </span>
              )}
            </button>
          ))}
          <div className="filter-search">
            <span className="filter-search-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar por nº ou cliente…"
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="pedidos-grid">
          {loading ? (
            <p style={{ color: '#888', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>
              Carregando pedidos...
            </p>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="admin-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                stroke="var(--gray-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>Nenhum pedido encontrado</p>
            </div>
          ) : (
            pedidosFiltrados.map(p => (
              <CardPedidoAdmin
                key={p.id}
                pedido={p}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </main>

      <footer className="admin-footer">
        © 2025 La Dolce Vita Cookies · Painel Administrativo
      </footer>
    </div>
  );
}
