import React, { useState, useEffect } from 'react'
import styles from './EditProductModal.module.css'

export default function EditProductModal({ product, onSave, onClose, isNew }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    imagePreview: null,
  })

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        image: product.image || null,
        imagePreview: product.image || null,
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setForm((prev) => ({
        ...prev,
        image: ev.target.result,
        imagePreview: ev.target.result,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...product,
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image: form.image,
    })
    onClose()
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isNew ? 'Novo Produto' : 'Editar Produto'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Image upload */}
          <label className={styles.imageLabel}>
            <div className={styles.imageUpload}>
              {form.imagePreview ? (
                <img src={form.imagePreview} alt="Preview" className={styles.imagePreview} />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span>Clique para adicionar foto</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.hiddenInput}
            />
          </label>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Nome</label>
            <input
              className={styles.input}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ex: Cioccolato"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Descrição</label>
            <textarea
              className={styles.textarea}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ex: Cookie tradicional recheado com chocolate Alpino 100g"
              rows={3}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Preço (R$)</label>
            <input
              className={styles.input}
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="12.00"
              required
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveBtn}>
              {isNew ? 'Adicionar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
