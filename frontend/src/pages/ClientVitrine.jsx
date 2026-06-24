import React from 'react'
import ProductCard from '../components/vitrine/ProductCard'
import CartSidebar from '../components/vitrine/CartSidebar'
import VitrineNavbar from '../components/vitrine/VitrineNavbar'
import '../styles/vitrine.css'

export default function ClientVitrine({ products, isAdmin, onToggleAdmin }) {
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
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>

      <CartSidebar />
    </div>
  )
}
