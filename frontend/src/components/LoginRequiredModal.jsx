import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginRequiredModal.module.css'
import { LogoMark } from './Icons'

export default function LoginRequiredModal({ onClose }) {
  const navigate = useNavigate()

  const handleLogin = () => {
    onClose()
    navigate('/login')
  }

  const handleCadastro = () => {
    onClose()
    navigate('/cadastro')
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.logoArea}>
          <LogoMark size={42} />
        </div>

        <h2 className={styles.titulo}>Faça login para continuar</h2>
        <p className={styles.descricao}>
          Para adicionar produtos ao carrinho e fazer pedidos, você precisa ter uma conta.
        </p>

        <div className={styles.acoes}>
          <button className={styles.btnLogin} onClick={handleLogin}>
            Fazer login
          </button>
          <button className={styles.btnCadastro} onClick={handleCadastro}>
            Criar conta
          </button>
        </div>

        <button className={styles.btnFechar} onClick={onClose} aria-label="Fechar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

      </div>
    </div>
  )
}
