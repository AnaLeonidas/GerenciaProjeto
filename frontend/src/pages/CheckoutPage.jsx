import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import HistoricoHeader from '../components/HistoricoHeader'
import HistoricoFooter from '../components/HistoricoFooter'
import styles from './CheckoutPage.module.css'
import { criarPedido } from '../services/api'

/* ── Ícones inline ───────────────────────────── */
const IconCheck = () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>

const FRETE = 8.00

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()
  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  /* ── form state ─────────────────────────────── */
  const [concluido,  setConcluido] = useState(false)
  const [loading, setLoading] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '',
    cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '',
  })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const freteGratis = totalPrice >= 80
  const totalFinal  = totalPrice + (freteGratis ? 0 : FRETE)

  const handleConfirmar = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const enderecoTxt = `${form.rua}, ${form.numero}${form.complemento ? ' ' + form.complemento : ''} — ${form.bairro}, ${form.cidade} (CEP ${form.cep})`
      const payload = {
        itens: cartItems.map(i => ({
          produto_id: i.id,
          quantidade: i.quantity,
          preco_unitario: i.price,
        })),
        endereco_entrega: enderecoTxt,
        forma_pagamento: 'a_combinar',
      }
      const resultado = await criarPedido(payload)
      setWhatsappUrl(resultado.whatsapp_url)
      clearCart()
      setConcluido(true)
    } catch (err) {
      alert('Erro ao confirmar pedido: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ── Tela de sucesso ─────────────────────────── */
  if (concluido) {
    return (
      <div className={styles.pagina}>
        <HistoricoHeader isAdmin={false} />
        <main className={styles.mainSucesso}>
          <div className={styles.cardSucesso}>
            <div className={styles.checkIcon}><IconCheck /></div>
            <h2 className={styles.sucessoTitulo}>Pedido confirmado! 🍪</h2>
            <p className={styles.sucessoTexto}>
              Seu pedido foi registrado com sucesso.<br />
              Clique abaixo para falar com a gente no WhatsApp
              e combinar o pagamento.
            </p>
            <div className={styles.sucessoAcoes}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.btnWhatsapp}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                Falar no WhatsApp para pagar
              </a>
              <button className={styles.btnSecundario} onClick={() => navigate('/historico/usuario')}>
                Ver meus pedidos
              </button>
            </div>
          </div>
        </main>
        <HistoricoFooter />
      </div>
    )
  }

  /* ── Carrinho vazio ──────────────────────────── */
  if (cartItems.length === 0) {
    return (
      <div className={styles.pagina}>
        <HistoricoHeader isAdmin={false} />
        <main className={styles.mainSucesso}>
          <div className={styles.cardSucesso}>
            <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛒</p>
            <h2 className={styles.sucessoTitulo}>Seu carrinho está vazio</h2>
            <p className={styles.sucessoTexto}>Adicione produtos antes de finalizar.</p>
            <div className={styles.sucessoAcoes}>
              <button className={styles.btnPrimario} onClick={() => navigate('/vitrine')}>
                Ver nossos cookies
              </button>
            </div>
          </div>
        </main>
        <HistoricoFooter />
      </div>
    )
  }

  return (
    <div className={styles.pagina}>
      <HistoricoHeader isAdmin={false} />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.titulo}>Finalizar Pedido</h1>

          <form className={styles.grid} onSubmit={handleConfirmar}>
            {/* ── COLUNA ESQUERDA ─────────────────── */}
            <div className={styles.colEsq}>

              {/* Dados pessoais */}
              <div className={styles.secao}>
                <h2 className={styles.secaoTitulo}>Dados de contato</h2>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Nome completo</label>
                    <input value={form.nome}     onChange={set('nome')}     placeholder="Ana Souza" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>E-mail</label>
                    <input type="email" value={form.email}    onChange={set('email')}    placeholder="ana@email.com" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Telefone</label>
                  <input value={form.telefone} onChange={set('telefone')} placeholder="(11) 90000-0000" />
                </div>
              </div>

              {/* Endereço */}
              <div className={styles.secao}>
                <h2 className={styles.secaoTitulo}>Endereço de entrega</h2>
                <div className={styles.formRow}>
                  <div className={styles.formGroup} style={{ flex: '0 0 140px' }}>
                    <label>CEP</label>
                    <input value={form.cep}     onChange={set('cep')}     placeholder="00000-000" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Rua / Avenida</label>
                    <input value={form.rua}     onChange={set('rua')}     placeholder="Rua das Flores" required />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup} style={{ flex: '0 0 100px' }}>
                    <label>Número</label>
                    <input value={form.numero}  onChange={set('numero')}  placeholder="123" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Complemento <span className={styles.opcional}>(opcional)</span></label>
                    <input value={form.complemento} onChange={set('complemento')} placeholder="Apto 4B" />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Bairro</label>
                    <input value={form.bairro}  onChange={set('bairro')}  placeholder="Centro" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Cidade</label>
                    <input value={form.cidade}  onChange={set('cidade')}  placeholder="São Paulo" required />
                  </div>
                </div>
              </div>
            </div>

            {/* ── COLUNA DIREITA — resumo ──────────── */}
            <div className={styles.colDir}>
              <div className={styles.resumoCard}>
                <h2 className={styles.secaoTitulo}>Resumo do pedido</h2>

                <ul className={styles.resumoItens}>
                  {cartItems.map(item => (
                    <li key={item.id} className={styles.resumoItem}>
                      <div className={styles.resumoItemInfo}>
                        <span className={styles.resumoItemNome}>{item.name}</span>
                        <span className={styles.resumoItemQty}>×{item.quantity}</span>
                      </div>
                      <span className={styles.resumoItemPreco}>{fmt(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.resumoDivider} />

                <div className={styles.resumoLinha}>
                  <span>Subtotal</span>
                  <span>{fmt(totalPrice)}</span>
                </div>
                <div className={styles.resumoLinha}>
                  <span>Entrega</span>
                  <span className={freteGratis ? styles.gratis : ''}>
                    {freteGratis ? 'Grátis 🎉' : fmt(FRETE)}
                  </span>
                </div>
                {!freteGratis && (
                  <p className={styles.freteAviso}>
                    Faltam {fmt(80 - totalPrice)} para frete grátis
                  </p>
                )}

                <div className={styles.resumoDivider} />

                <div className={styles.totalFinal}>
                  <span>Total</span>
                  <span>{fmt(totalFinal)}</span>
                </div>

                <button type="submit" className={styles.btnConfirmar} disabled={loading}>
                  {loading ? 'Processando...' : 'Confirmar pedido'}
                </button>

                <button
                  type="button"
                  className={styles.btnVoltar}
                  onClick={() => navigate('/vitrine')}
                >
                  ← Voltar à vitrine
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <HistoricoFooter />
    </div>
  )
}
