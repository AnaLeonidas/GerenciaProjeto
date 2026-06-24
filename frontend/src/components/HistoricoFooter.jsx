import React from 'react';
import styles from './HistoricoFooter.module.css';
import logoImg from '../assets/logo-limao.png';

export default function HistoricoFooter() {
  return (
    <footer className={styles.rodapeArea}>
      <div className={styles.containerColunas}>

        {/* Coluna 1: Marca e Redes */}
        <div className={styles.colunaMarca}>
          <div className={styles.logoArea}>
            <img src={logoImg} alt="La Dolce Vita" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <span className={styles.nomeMarca}>La Dolce Vita</span>
          </div>
          <p className={styles.textoDescricao}>
            Adoçando os dias a cada mordida. Os melhores cookies artesanais de Osasco e região.
          </p>
          <div className={styles.botoesSociais}>
            <button className={styles.btnSocial}>Instagram</button>
            <button className={styles.btnSocial}>Whatsapp</button>
          </div>
        </div>

        {/* Coluna 2: Navegação */}
        <div className={styles.colunaMenu}>
          <h3 className={styles.tituloColuna}>Navegação</h3>
          <ul className={styles.listaLinks}>
            <li><a href="#">Início</a></li>
            <li><a href="#">Nossos Sabores</a></li>
            <li><a href="#">Kits de Presente</a></li>
            <li><a href="#">Sobre a Marca</a></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div className={styles.colunaContato}>
          <h3 className={styles.tituloColuna}>Contato</h3>
          <ul className={styles.listaLinks}>
            <li>📍 Entregas em São Paulo - SP</li>
            <li>⏰ Seg a Sáb: 10h às 19h</li>
            <li>📞 (11) 99999-9999</li>
            <li>✉️ oi@ladolcevita.com.br</li>
          </ul>
        </div>
      </div>

      <div className={styles.areaDireitos}>
        <p>© 2026 La Dolce Vita Cookies. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
