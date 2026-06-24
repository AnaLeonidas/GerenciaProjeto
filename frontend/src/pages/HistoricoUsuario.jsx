import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoricoHeader from '../components/HistoricoHeader';
import HistoricoFooter from '../components/HistoricoFooter';
import styles from './HistoricoUsuario.module.css';
import { meusPedidos } from '../services/api';

/* ── Badge de status ─────────────────────────── */
function StatusBadge({ status }) {
  const cfg = {
    'ENTREGUE':              { cls: styles.badgeEntregue,   icon: '✓',  label: 'ENTREGUE'        },
    'EM TRANSPORTE':         { cls: styles.badgeTransporte,  icon: '🚚', label: 'EM TRANSPORTE'   },
    'PEDIDO RECEBIDO':       { cls: styles.badgeRecebido,    icon: '📦', label: 'PEDIDO RECEBIDO' },
    'EM PRODUCAO':           { cls: styles.badgeProducao,    icon: '⏳', label: 'EM PRODUÇÃO'     },
    'PRONTO PARA ENTREGA':   { cls: styles.badgeProducao,    icon: '✅', label: 'PRONTO PARA ENTREGA' },
    'CANCELADO':             { cls: styles.badgeEntregue,    icon: '✗',  label: 'CANCELADO'       },
  }[status] || { cls: '', icon: '', label: status };

  return (
    <span className={`${styles.badge} ${cfg.cls}`}>
      <span className={styles.badgeIcon}>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

/* ── Card individual ─────────────────────────── */
function CardPedido({ pedido }) {
  const numero = pedido.id.slice(0, 8).toUpperCase();
  const data = new Date(pedido.data_hora).toLocaleString('pt-BR');
  const itens = (pedido.item_pedido || []).map(i => {
    const nome = i.produto?.nome || 'Produto';
    return `${i.quantidade}x ${nome}`;
  });
  const podeMostrarAcompanhar = pedido.status === 'EM TRANSPORTE';
  const podeMostrarRepetir    = pedido.status === 'ENTREGUE';
  const total = pedido.total
    ? Number(pedido.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : '—';

  return (
    <div className={styles.card}>
      <div className={styles.cardTopo}>
        <div className={styles.cardTopoEsq}>
          <h3 className={styles.numeroPedido}>Pedido #{numero}</h3>
          <StatusBadge status={pedido.status} />
        </div>
        <span className={styles.preco}>{total}</span>
      </div>

      <p className={styles.data}>Realizado em {data}</p>

      <p className={styles.labelItens}>ITENS DO PEDIDO</p>
      <ul className={styles.listaItens}>
        {itens.length > 0
          ? itens.map((item, i) => <li key={i}>{item}</li>)
          : <li>—</li>}
      </ul>

      <div className={styles.acoes}>
        {podeMostrarAcompanhar && (
          <button className={styles.btnPrimario}>Acompanhar entrega</button>
        )}
        {podeMostrarRepetir && (
          <button className={styles.btnPrimario}>Repetir pedido</button>
        )}
      </div>
    </div>
  );
}

/* ── Página ──────────────────────────────────── */
export default function HistoricoUsuario() {
  const navigate = useNavigate();
  const [busca, setBusca]       = useState('');
  const [pedidos, setPedidos]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [erro, setErro]         = useState('');

  useEffect(() => {
    meusPedidos()
      .then(setPedidos)
      .catch(() => setErro('Não foi possível carregar seus pedidos.'))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = pedidos.filter(p => {
    if (!busca) return true;
    const num = p.id.slice(0, 8).toUpperCase();
    const itens = (p.item_pedido || []).map(i => i.produto?.nome || '').join(' ');
    return num.includes(busca.toUpperCase()) || itens.toLowerCase().includes(busca.toLowerCase());
  });

  return (
    <div className={styles.pagina}>
      <HistoricoHeader isAdmin={false} />

      <main className={styles.main}>
        <div className={styles.container}>

          <div className={styles.cabecalho}>
            <div>
              <h1 className={styles.titulo}>Meus Pedidos</h1>
              <p className={styles.subtitulo}>
                {filtrados.length} pedido{filtrados.length !== 1 ? 's' : ''} encontrado{filtrados.length !== 1 ? 's' : ''}
              </p>
            </div>
            <input
              className={styles.buscaInput}
              type="text"
              placeholder="🔍 Buscar pedido ou item..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>

          {loading && <p className={styles.vazio}>Carregando...</p>}
          {erro    && <p className={styles.vazio}>{erro}</p>}
          {!loading && !erro && filtrados.length === 0 && (
            <p className={styles.vazio}>Nenhum pedido encontrado.</p>
          )}
          {filtrados.map(p => <CardPedido key={p.id} pedido={p} />)}

        </div>
      </main>

      <HistoricoFooter />
    </div>
  );
}
