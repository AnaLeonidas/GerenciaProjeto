import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import logoImg from '../../assets/logo.jpg'
import styles from './VitrineNavbar.module.css'

export default function VitrineNavbar({ isAdmin, onToggleAdmin }) {
  const navigate = useNavigate()
  const { setIsCartOpen, totalItems } = useCart()

  return (
    <nav className={styles.navbar}>
      {/* Brand */}
      <div className={styles.brand}>
        <img src={logoImg} alt="La Dolce Vita" className={styles.logo} />
        <span className={styles.brandName}>La Dolce Vita</span>
      </div>

      {/* Ações */}
      <div className={styles.actions}>
        {/* Voltar para home */}
        <button
          className={styles.backBtn}
          onClick={() => navigate('/home')}
          title="Voltar para o início"
        >
          ← Início
        </button>



        {/* Ícone de carrinho (cliente) ou pedidos (admin) */}
        {isAdmin ? (
          <button
            className={styles.iconBtn}
            onClick={() => navigate('/admin')}
            title="Gestão de pedidos"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="2" width="6" height="4" rx="1"/>
              <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-3"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
              <line x1="9" y1="16" x2="13" y2="16"/>
            </svg>
          </button>
        ) : (
          <button
            className={styles.cartBtn}
            onClick={() => setIsCartOpen(true)}
            title="Abrir carrinho"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </button>
        )}

        {/* Botão de perfil — admin vai para /perfil/admin, cliente para /perfil */}
        <button
          className={styles.iconBtn}
          onClick={() => navigate(isAdmin ? '/perfil/admin' : '/perfil')}
          title={isAdmin ? 'Perfil de Admin' : 'Meu Perfil'}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}
