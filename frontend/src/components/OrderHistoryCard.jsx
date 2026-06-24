import React, { useState } from 'react';
import styles from './OrderHistoryCard.module.css';

const STATUS_OPTS = ['Em produção', 'Pronto para entrega', 'Entregue'];

export default function OrderHistoryCard({ pedido, isAdmin = false }) {
  const [status, setStatus] = useState(pedido.status);

  const statusClass = {
    'Em produção':       styles.statusProducao,
    'Pronto para entrega': styles.statusPronto,
    'Entregue':          styles.statusEntregue,
  }[status] || '';

  return (
    <div className={styles.card}>

      {/* Coluna: ID + data */}
      <div className={styles.colId}>
        <p className={styles.idText}>#{pedido.numero}</p>
        <p className={styles.dateText}>{pedido.data}</p>
      </div>

      {/* Coluna: cliente + itens */}
      <div className={styles.colCliente}>
        <p className={styles.clienteName}>{pedido.cliente}</p>
        <p className={styles.itemsSummary}>{pedido.itens}</p>
      </div>

      {/* Coluna: total */}
      <div className={styles.colTotal}>
        <p className={styles.totalLabel}>Total</p>
        <p className={styles.totalValue}>R$ {pedido.total}</p>
      </div>

      {/* Coluna: status + ações */}
      <div className={styles.colAcoes}>
        {isAdmin ? (
          /* Admin: pode alterar o status */
          <select
            className={`${styles.statusSelect} ${statusClass}`}
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        ) : (
          /* Usuário: só visualiza o status */
          <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>
        )}

        <button className={styles.iconBtn} title="Ver detalhes">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
        {isAdmin && (
          <button className={styles.iconBtn} title="Imprimir">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
          </button>
        )}
      </div>

    </div>
  );
}
