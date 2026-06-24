import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoMark, ProfileIcon } from '../components/Icons';
import '../styles/globals.css';
import '../styles/home.css';
import logoLimao  from '../assets/logo-limao.png';
import amoreImg   from '../assets/amore.jpg';
import { maisPedidos } from '../services/api';

const HERO_IMG = amoreImg;

/* Imagem de fallback caso o produto não tenha imagem_url */
const FALLBACK_IMG = amoreImg;

/* Paleta de accent classes para variar visualmente os cards */
const ACCENT_CLASSES = ['accent-orange', 'accent-bold', 'accent-lime'];

export default function HomePage() {
  const navigate   = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [produtos,  setProdutos] = useState([]);
  const [loading,   setLoading]  = useState(true);

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const perfilPath = usuario.papel === 'admin' ? '/perfil/admin' : '/perfil';

  useEffect(() => {
    maisPedidos()
      .then(setProdutos)
      .catch(() => setProdutos([]))   // silencia erro: seção simplesmente fica vazia
      .finally(() => setLoading(false));
  }, []);

  const goToVitrine = () => navigate('/vitrine');
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div>
      {/* ══ NAVBAR ═══════════════════════════════════ */}
      <nav className="navbar">
        <a className="navbar-brand" href="#hero">
          <LogoMark size={34} />
          <span className="navbar-brand-name">La Dolce Vita</span>
        </a>

        <ul className="navbar-center">
          <li><a href="#favoritos">Sabores</a></li>
          <li><a href="#sobre">Sobre Nós</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>

        <div className="navbar-right">
          <Link to={perfilPath} className="navbar-profile-btn" title="Meu Perfil">
            <ProfileIcon size={18} />
          </Link>
          <button className="navbar-hamburger" onClick={() => setMenuOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--white)', borderBottom: '1px solid var(--border)',
          padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {['Sabores', 'Contato'].map(item => (
            <a key={item} href="#"
              style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--brown-mid)', padding: '4px 0' }}
              onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
          <Link to={perfilPath}
            style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--green)', padding: '4px 0' }}
            onClick={() => setMenuOpen(false)}>
            Meu Perfil
          </Link>
        </div>
      )}

      {/* ══ HERO ══════════════════════════════════════ */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              Um pedaço <span className="accent">Dolce</span><br />
              de <span className="accent">La Vita</span>.
            </h1>
            <p className="hero-description">
              As vezes tudo o que a gente precisa é de um cookie bem recheado e
              quentinho pra animar a gente, não acha?<br /><br />
              Se você precisa de um abraço doce, continua descendo!
            </p>
            <button className="hero-cta" onClick={goToVitrine}>
              Quero Provar Agora
            </button>
            <div className="hero-social-proof">
              <span className="stars">★★★★★</span>
              <span>Mais de 300 clientes felizes!</span>
            </div>
          </div>

          <div className="hero-image-area">
            <img src={HERO_IMG} alt="Cookie artesanal La Dolce Vita"
              className="hero-cookie-img" />
            <div className="hero-badge" onClick={goToVitrine} style={{ cursor: 'pointer' }}>Vem conferir!</div>
          </div>
        </div>
      </section>

      {/* ══ NOSSOS FAVORITOS ══════════════════════════ */}
      <section className="favorites-section" id="favoritos">
        <div className="section-header">
          <h2 className="section-title">Nossos Favoritos</h2>
          <p className="section-subtitle">
            Escolha o sabor que vai abraçar seu coração&nbsp;
            <span style={{ color: '#C0392B' }}>♡</span>
          </p>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', color: 'var(--gray-text)', padding: '2rem',
            fontFamily: 'var(--font-body)' }}>
            Carregando sabores...
          </p>
        )}

        {!loading && produtos.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--gray-text)', padding: '2rem',
            fontFamily: 'var(--font-body)' }}>
            Em breve novos sabores por aqui!
          </p>
        )}

        {!loading && produtos.length > 0 && (
          <div className="products-grid">
            {produtos.map((p, index) => (
              <div
                className="product-card"
                key={p.id}
                onClick={goToVitrine}
                style={{ cursor: 'pointer' }}
                title="Ver todos os sabores"
              >
                {index === 0 && produtos.length > 1 && (
                  <div className="product-badge">Mais vendido!</div>
                )}
                <div className="product-img-wrapper">
                  <img
                    src={p.imagem_url || FALLBACK_IMG}
                    alt={p.nome}
                    className="product-img"
                    onError={e => { e.target.src = FALLBACK_IMG }}
                  />
                </div>
                <div className="product-body">
                  <h3 className="product-name">
                    <span className={ACCENT_CLASSES[index % ACCENT_CLASSES.length]}>
                      {p.nome}
                    </span>
                  </h3>
                  <p className="product-desc">{p.descricao}</p>
                  <div className="product-footer">
                    <span className="product-price">
                      {Number(p.preco).toLocaleString('pt-BR', {
                        style: 'currency', currency: 'BRL'
                      })}
                    </span>
                    <button
                      className="add-btn"
                      onClick={e => { e.stopPropagation(); goToVitrine(); }}
                      title="Adicionar ao carrinho"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr className="section-divider" />
      </section>

      {/* ══ FOOTER ════════════════════════════════════ */}
      <footer className="footer" id="contato">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="footer-logo">
                <img src={logoLimao} alt="La Dolce Vita" style={{ width: 17, height: 17, borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <span className="footer-brand-name">La Dolce Vita</span>
            </div>
            <p className="footer-tagline">
              Adoçando os dias a cada mordida. Os melhores cookies artesanais de Osasco e região.
            </p>
            <div className="footer-social">
              <button className="footer-social-btn">Instagram</button>
              <button className="footer-social-btn">Whatsapp</button>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-nav">
              <li><a href="#">Início</a></li>
              <li><a href="#">Nossos Sabores</a></li>
              <li><a href="#contato">Sobre Nós</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Contato</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-dot green" />Entregas em São Paulo – SP
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-dot yellow" />Seg a Sáb: 10h às 19h
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📞</span>(11) 99999-9999
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉</span>oi@ladolcevita.com.br
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 La Dolce Vita Cookies. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
