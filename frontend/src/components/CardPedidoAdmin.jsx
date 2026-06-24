import React from 'react';
import '../styles/admin.css';

const STATUS_CONFIG = {
  pendente:  { label: 'Pendente',   badgeClass: 'badge-pendente',  cardClass: 'status-pendente',  btnLabel: 'Iniciar preparo' },
  preparo:   { label: 'Em preparo', badgeClass: 'badge-preparo',   cardClass: 'status-preparo',   btnLabel: 'Marcar enviado' },
  enviado:   { label: 'Enviado',    badgeClass: 'badge-enviado',   cardClass: 'status-enviado',   btnLabel: 'Confirmar entrega' },
  entregue:  { label: 'Entregue',   badgeClass: 'badge-entregue',  cardClass: 'status-entregue',  btnLabel: 'Concluído' },
  cancelado: { label: 'Cancelado',  badgeClass: 'badge-cancelado', cardClass: 'status-cancelado', btnLabel: 'Reabrir' },
};

export default function CardPedidoAdmin({ pedido, onStatusChange }) {
  const { id, numero, data, cliente, itens, total, status } = pedido;
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pendente;

  /* Iniciais do cliente para o avatar */
  const initials = cliente.nome
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const handleAvancar = () => {
    const ordem = ['pendente', 'preparo', 'enviado', 'entregue'];
    const idx = ordem.indexOf(status);
    if (idx >= 0 && idx < ordem.length - 1) {
      onStatusChange?.(id, ordem[idx + 1]);
    }
  };

  const handleCancelar = () => onStatusChange?.(id, 'cancelado');
  const handleReabrir = () => onStatusChange?.(id, 'pendente');

  return (
    <div className={`card-pedido ${cfg.cardClass}`}>

      {/* Cabeçalho: número + status */}
      <div className="card-pedido-header">
        <div>
          <div className="pedido-numero">Pedido #{numero}</div>
          <div className="pedido-data">{data}</div>
        </div>
        <span className={`status-badge ${cfg.badgeClass}`}>{cfg.label}</span>
      </div>

      {/* Cliente */}
      <div className="pedido-cliente">
        <div className="cliente-avatar">{initials}</div>
        <div>
          <div className="cliente-nome">{cliente.nome}</div>
          <div className="cliente-contato">{cliente.telefone}</div>
        </div>
      </div>

      {/* Itens */}
      <div className="pedido-itens">
        {itens.map((item, i) => (
          <div className="pedido-item" key={i}>
            <span className="item-nome">{item.nome}</span>
            <span className="item-qtd">x{item.quantidade}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="pedido-total">
        <span className="total-label">Total do pedido</span>
        <span className="total-valor">R$ {total.toFixed(2).replace('.', ',')}</span>
      </div>

      {/* Ações */}
      {status !== 'entregue' && status !== 'cancelado' && (
        <div className="pedido-acoes">
          <button className="btn-acao primary" onClick={handleAvancar}>
            {cfg.btnLabel}
          </button>
          <button className="btn-acao secondary" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      )}
      {status === 'cancelado' && (
        <div className="pedido-acoes">
          <button
            className="btn-acao secondary"
            style={{ flex: 'none', width: '100%' }}
            onClick={handleReabrir}
          >
            Reabrir pedido
          </button>
        </div>
      )}
    </div>
  );
}
