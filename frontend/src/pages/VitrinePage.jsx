import React, { useState, useEffect } from 'react'
import { listarProdutos } from '../services/api'
import ClientVitrine from './ClientVitrine'
import AdminVitrine  from './AdminVitrine'

export default function VitrinePage() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const [isAdmin, setIsAdmin] = useState(usuario.papel === 'admin')
  const [products, setProducts] = useState([])

  useEffect(() => {
  async function carregarProdutos() {
    try {
      const dados = await listarProdutos()

      const produtosFormatados = dados.map(p => ({
        id: p.id,
        name: p.nome,
        description: p.descricao,
        price: p.preco,
        image: p.imagem_url,
      }))

      setProducts(produtosFormatados)
    } catch (err) {
      console.error(err)
    }
  }

    carregarProdutos()
  }, [])

  const toggleAdmin = () => setIsAdmin(v => !v)

  return isAdmin ? (
    <AdminVitrine
      products={products}
      onProductsChange={setProducts}
      isAdmin={isAdmin}
      onToggleAdmin={toggleAdmin}
    />
  ) : (
    <ClientVitrine
      products={products}
      isAdmin={isAdmin}
      onToggleAdmin={toggleAdmin}
    />
  )
}
