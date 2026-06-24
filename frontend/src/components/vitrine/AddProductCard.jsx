import React from 'react'
import styles from './AddProductCard.module.css'

export default function AddProductCard({ onClick }) {
  return (
    <button
      className={styles.card}
      onClick={onClick}
      aria-label="Adicionar novo produto"
    >
      <div className={styles.inner}>
        <div className={styles.iconCircle}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
        <span className={styles.label}>Novo Produto</span>
      </div>
    </button>
  )
}
