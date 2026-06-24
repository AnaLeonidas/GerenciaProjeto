import React, { useState } from 'react'
import AdminProductCard from '../components/vitrine/AdminProductCard'
import AddProductCard   from '../components/vitrine/AddProductCard'
import EditProductModal from '../components/vitrine/EditProductModal'
import VitrineNavbar    from '../components/vitrine/VitrineNavbar'
import '../styles/vitrine.css'
import { criarProduto, atualizarProduto, desativarProduto } from '../services/api'

export default function AdminVitrine({ products, onProductsChange, isAdmin, onToggleAdmin }) {
  const [editingProduct, setEditingProduct] = useState(null)
  const [isAddingNew, setIsAddingNew]       = useState(false)

  const handleEdit    = (product) => { setEditingProduct(product); setIsAddingNew(false) }
  const handleAddNew  = ()        => { setEditingProduct(null);    setIsAddingNew(true)  }

  const handleSave = async (updated) => {
    try {
      if (isAddingNew) {
        const payload = {
          nome: updated.name,
          descricao: updated.description,
          preco: updated.price,
          imagem_url: updated.image || null,
          disponivel: true,
        }
        const novo = await criarProduto(payload)
        onProductsChange([...products, {
          id: novo.id, name: novo.nome, description: novo.descricao,
          price: novo.preco, image: novo.imagem_url,
        }])
      } else {
        const payload = {
          nome: updated.name,
          descricao: updated.description,
          preco: updated.price,
          imagem_url: updated.image || null,
        }
        const atualizado = await atualizarProduto(updated.id, payload)
        onProductsChange(products.map(p => p.id === updated.id ? {
          id: atualizado.id, name: atualizado.nome, description: atualizado.descricao,
          price: atualizado.preco, image: atualizado.imagem_url,
        } : p))
      }
    } catch (err) {
      alert('Erro ao salvar produto: ' + err.message)
    }
    setEditingProduct(null)
    setIsAddingNew(false)
  }

  const handleDelete = async (product) => {
    if (!window.confirm(`Desativar "${product.name}"?`)) return
    try {
      await desativarProduto(product.id)
      onProductsChange(products.filter(p => p.id !== product.id))
    } catch (err) {
      alert('Erro ao desativar produto: ' + err.message)
    }
  }

  const handleClose = () => { setEditingProduct(null); setIsAddingNew(false) }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <VitrineNavbar isAdmin={isAdmin} onToggleAdmin={onToggleAdmin} />

      <main className="vitrine-main">
        <h1 className="vitrine-page-title">Vitrine</h1>
        <div className="vitrine-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 0.08}s`, width: '100%' }}
            >
              <AdminProductCard product={product} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          ))}
          <div style={{ animationDelay: `${products.length * 0.08}s`, width: '100%' }}>
            <AddProductCard onClick={handleAddNew} />
          </div>
        </div>
      </main>

      {(editingProduct || isAddingNew) && (
        <EditProductModal
          product={editingProduct}
          isNew={isAddingNew}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
