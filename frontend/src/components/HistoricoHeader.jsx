import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoMark } from './Icons';
import styles from './HistoricoHeader.module.css';

export default function HistoricoHeader({ isAdmin = false }) {
  const navigate = useNavigate();

  return (
    <header className={styles.cabecalho}>
      <div className={styles.logoArea} onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
        <LogoMark size={40} />
        <span className={styles.nomeMarca}>La Dolce Vita</span>
      </div>

      <nav className={styles.navMenu}>
        <button className={styles.navLink} onClick={() => navigate('/home')}>
          Início
        </button>
        <button className={styles.navLink} onClick={() => navigate('/vitrine')}>
          Sabores
        </button>
        <button className={styles.navLink} onClick={() => navigate(isAdmin ? '/perfil/admin' : '/perfil')}>
          Perfil
        </button>
        {isAdmin && (
          <button className={styles.navLink} onClick={() => navigate('/admin')}>
            Pedidos
          </button>
        )}
      </nav>
    </header>
  );
}
